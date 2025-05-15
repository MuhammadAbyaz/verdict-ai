"use client";

import { use, useEffect, useState, useTransition } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useAudio, useWindowSize, useMount } from "react-use";
import { toast } from "sonner";

import { MAX_HEARTS } from "@/constants";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";

import { Challenge } from "./challenge";
import { Header } from "./header";
import { Footer } from "./footer";
import { QuestionBubble } from "./question-bubble";
import { ResultCard } from "./result-card";
import { useModule } from "@/hooks/use-module";
import { useUpdateProgress } from "@/hooks/use-update-progress";
import { useUpdateTestProgress } from "@/hooks/use-update-test-progress";
import { useQueryClient } from "@tanstack/react-query";
import { useProgress } from "@/hooks/use-progress";
import { useHearts } from "@/hooks/use-hearts";
import { usePoints } from "@/hooks/use-points";
import { Loader } from "lucide-react";

// Define interfaces for Lesson and Quiz based on usage
interface Lesson {
  id: string;
  order: number;
  title: string;
  content: string;
}

interface QuizQuestionOption {
  id: string;
  text: string;
  // Add other option properties if necessary
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizQuestionOption[];
  correctOption: QuizQuestionOption;
  order: number;
  // Add other question properties if necessary
}

interface Quiz {
  id: string;
  order: number;
  title: string;
  questions: QuizQuestion[];
}

type ModuleProps = {
  moduleId: string;
  userSubscription?: { isActive: boolean };
};

// Helper type for the items we'll display
type ModuleItem = {
  id: string;
  type: "lesson" | "quiz";
  order: number;
  title: string;
  content?: string;
  options?: QuizQuestionOption[];
  correctOption?: QuizQuestionOption;
};

type ModuleState = {
  activeIndex: number;
  items: ModuleItem[];
};

export const Module = ({ moduleId, userSubscription }: ModuleProps) => {
  // Fetch module content
  const { data: module } = useModule(moduleId);
  const { data: userProgressData, isLoading } = useProgress(module?.course?.id);
  const [hasCompleted, setHasCompleted] = useState(null);
  const upsertUserProgress = useUpdateProgress();
  const upsertTestProgress = useUpdateTestProgress();
  const queryClient = useQueryClient();
  const updateHearts = useHearts();
  console.log("has completed", hasCompleted);

  // Audio controls
  const [correctAudioElement, , correctAudioControls] = useAudio({
    src: "/correct.wav",
    autoPlay: false,
  });
  const [incorrectAudioElement, , incorrectAudioControls] = useAudio({
    src: "/incorrect.wav",
    autoPlay: false,
  });
  const [finishAudioElement, , finishAudioControls] = useAudio({
    src: "/finish.mp3",
    autoPlay: false,
  });
  const { width, height } = useWindowSize();

  // Function to play audio
  const playCorrectSound = () => {
    correctAudioControls.seek(0);
    correctAudioControls.play();
  };

  const playIncorrectSound = () => {
    incorrectAudioControls.seek(0);
    incorrectAudioControls.play();
  };

  const playFinishSound = () => {
    finishAudioControls.play();
  };

  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();

  useMount(() => {
    if (percentage === 100) openPracticeModal();
  });

  const { data: pointsData } = usePoints();
  const [hearts, setHearts] = useState(10);

  useEffect(() => {
    if (pointsData?.hearts !== undefined) {
      setHearts(pointsData.hearts);
    }
  }, [pointsData?.hearts]);
  const [percentage, setPercentage] = useState(0);

  const [moduleState, setModuleState] = useState<ModuleState>({
    activeIndex: 0,
    items: [],
  });

  useEffect(() => {
    if (hasCompleted && !isLoading) {
      openPracticeModal();
    }
  }, [hasCompleted, isLoading, openPracticeModal]);
  console.log("module", module);
  // Update moduleState when module data is loaded
  useEffect(() => {
    if (!module || percentage === 100) return;

    const items: ModuleItem[] = [];

    if (module.lessons && module.lessons.length > 0) {
      module.lessons.forEach((lesson: Lesson) => {
        items.push({
          id: lesson.id,
          type: "lesson",
          order: lesson.order,
          title: lesson.title,
          content: lesson.content,
        });
      });
    }

    if (module.quizes && module.quizes.length > 0) {
      module.quizes.forEach((quiz: Quiz) => {
        quiz.questions.forEach((question: QuizQuestion) => {
          items.push({
            id: question.id,
            type: "quiz",
            order: question.order,
            title: question.question,
            options: question.options,
            correctOption: question.correctOption,
          });
        });
      });
    }

    items.sort((a, b) => a.order - b.order);

    setHasCompleted((prev) => {
      console.log(
        "setting hasCompleted",
        userProgressData?.userProgress.moduleProgress,
        module.order
      );
      return userProgressData?.userProgress.moduleProgress >= module.order;
    });

    setModuleState({
      activeIndex: 0,
      items,
    });
  }, [module, userProgressData]);

  const currentItem = moduleState.items[moduleState.activeIndex];

  const [selectedOption, setSelectedOption] = useState<string>();
  const [status, setStatus] = useState<
    "none" | "wrong" | "correct" | "completed" | "lesson"
  >("none");

  const onSelect = (optionId: string) => {
    if (pending) return;

    setSelectedOption(optionId);
    setStatus("none");
  };

  const onContinue = () => {
    if (pending) return;

    if (currentItem.type === "quiz") {
      if (selectedOption === currentItem.correctOption?.id) {
        setStatus("correct");
        playCorrectSound();
        setPercentage((prev) =>
          Math.min(prev + 100 / moduleState.items.length, 100)
        );
      } else {
        if (status === "wrong") {
          setStatus("none");
          setSelectedOption(undefined);
        } else {
          setStatus("wrong");
          playIncorrectSound();

          // Only reduce hearts if this is the first attempt (not in practice mode)
          if (!hasCompleted) {
            const newHearts = Math.max(hearts - 1, 0);
            setHearts(newHearts);
            updateHearts.mutate(newHearts);

            // Show hearts modal when hearts reach zero (first time only)
            if (newHearts === 0) {
              openHeartsModal();
            }
          }
        }
      }
    }
  };

  const onNext = () => {
    if (pending) return;

    if (currentItem.type === "quiz") {
      if (selectedOption === currentItem.correctOption?.id) {
        setModuleState((prev) => ({
          ...prev,
          activeIndex: prev.activeIndex + 1,
        }));
        setSelectedOption(undefined);
        setStatus("none");
      } else {
        toast.error("Please select the correct answer.");
      }
    } else {
      setModuleState((prev) => ({
        ...prev,
        activeIndex: prev.activeIndex + 1,
      }));
    }

    if (moduleState.activeIndex === moduleState.items.length - 1) {
      setTimeout(() => {
        playFinishSound();
        updateUserProgress();
        console.log("updating user progress");
      }, 0);
    }
  };

  const updateUserProgress = async () => {
    toast.success("Congratulations for completing this module.");

    if (module.order) {
      await upsertUserProgress.mutateAsync({
        courseId: module.course.id,
        moduleOrder: module.order,
        hearts: hearts,
      });
      // router.push(`/learn/${module.course.id}`);
    } else {
      await upsertTestProgress.mutateAsync({
        courseId: module.course.id,
        hearts: hearts,
      });
      // router.push(`/learn/${module.course.id}`);
    }
    queryClient.invalidateQueries({
      queryKey: ["userPoints"],
    });
  };

  if (!module || moduleState.items.length === 0) {
    return (
      <>
        {correctAudioElement}
        {incorrectAudioElement}
        {finishAudioElement}
        <div className="flex justify-center items-center h-40">
          <Loader className="h-8 w-8 animate-spin text-neutral-500" />
        </div>
      </>
    );
  }

  if (moduleState.activeIndex === moduleState.items.length) {
    return (
      <>
        {correctAudioElement}
        {incorrectAudioElement}
        {finishAudioElement}
        <Confetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10_000}
          width={width}
          height={height}
        />
        <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-4 text-center lg:gap-y-8">
          <Image
            src="/finish.svg"
            alt="Finish"
            className="hidden lg:block"
            height={100}
            width={100}
          />

          <Image
            src="/finish.svg"
            alt="Finish"
            className="block lg:hidden"
            height={100}
            width={100}
          />

          <h1 className="text-lg font-bold text-neutral-700 lg:text-3xl">
            Great job! <br /> You&apos;ve completed the module.
          </h1>

          <div className="flex w-full items-center gap-x-4">
            <ResultCard variant="points" value={module?.xp || 100} />
            <ResultCard
              variant="hearts"
              value={userSubscription?.isActive ? Infinity : hearts}
            />
          </div>
        </div>

        <Footer status="completed" onCheck={router.back} />
      </>
    );
  }

  if (currentItem.type === "lesson") {
    return (
      <>
        {correctAudioElement}
        {incorrectAudioElement}
        {finishAudioElement}

        <Header
          hearts={hearts}
          percentage={percentage}
          hasActiveSubscription={!!userSubscription?.isActive}
        />

        <div className="flex-1">
          <div className="flex h-full items-center justify-center">
            <div className="flex w-full flex-col gap-y-12 px-6 lg:min-h-[350px] lg:w-[600px] lg:px-0">
              <h1 className="text-center text-lg font-bold text-neutral-700 lg:text-start lg:text-3xl">
                {currentItem.title}
              </h1>

              <div className="bg-white p-6 rounded-xl shadow-sm border-2">
                <p className="text-neutral-700">{currentItem.content}</p>
              </div>
            </div>
          </div>
        </div>

        <Footer
          disabled={false}
          status="lesson"
          onCheck={() => {
            setModuleState((prev) => ({
              ...prev,
              activeIndex: prev.activeIndex + 1,
            }));
            setPercentage((prev) =>
              Math.min(prev + 100 / moduleState.items.length, 100)
            );

            if (moduleState.activeIndex === moduleState.items.length - 1) {
              setTimeout(() => {
                playFinishSound();
                updateUserProgress();
                console.log("updating user progress");
              }, 0);
            }
          }}
        />
      </>
    );
  }

  const title = currentItem.title || "";
  const quizOptions = currentItem.options || [];

  return (
    <>
      {correctAudioElement}
      {incorrectAudioElement}
      {finishAudioElement}

      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />

      <div className="flex-1">
        <div className="flex h-full items-center justify-center">
          <div className="flex w-full flex-col gap-y-12 px-6 lg:min-h-[350px] lg:w-[600px] lg:px-0">
            <h1 className="text-center text-lg font-bold text-neutral-700 lg:text-start lg:text-3xl">
              {title}
            </h1>

            <div>
              <div className="grid gap-2 grid-cols-1">
                {quizOptions.map((option, i) => (
                  <div
                    key={option.id}
                    onClick={() => onSelect(option.id)}
                    className={`
                      h-full cursor-pointer rounded-xl border-2 border-b-4 p-4 hover:bg-black/5 active:border-b-2 lg:p-6
                      ${
                        selectedOption === option.id
                          ? "border-sky-300 bg-sky-100 hover:bg-sky-100"
                          : ""
                      }
                      ${
                        selectedOption === option.id && status === "correct"
                          ? "border-green-300 bg-green-100 hover:bg-green-100"
                          : ""
                      }
                      ${
                        selectedOption === option.id && status === "wrong"
                          ? "border-rose-300 bg-rose-100 hover:bg-rose-100"
                          : ""
                      }
                      ${pending ? "pointer-events-none hover:bg-white" : ""}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <p
                        className={`
                        text-sm text-neutral-600 lg:text-base
                        ${selectedOption === option.id ? "text-sky-500" : ""}
                        ${
                          selectedOption === option.id && status === "correct"
                            ? "text-green-500"
                            : ""
                        }
                        ${
                          selectedOption === option.id && status === "wrong"
                            ? "text-rose-500"
                            : ""
                        }
                      `}
                      >
                        {option.text}
                      </p>
                      <div
                        className={`
                        flex h-[20px] w-[20px] items-center justify-center rounded-lg border-2 text-xs font-semibold text-neutral-400 lg:h-[30px] lg:w-[30px] lg:text-[15px]
                        ${
                          selectedOption === option.id
                            ? "border-sky-300 text-sky-500"
                            : ""
                        }
                        ${
                          selectedOption === option.id && status === "correct"
                            ? "border-green-500 text-green-500"
                            : ""
                        }
                        ${
                          selectedOption === option.id && status === "wrong"
                            ? "border-rose-500 text-rose-500"
                            : ""
                        }
                      `}
                      >
                        {i + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
        onNext={onNext}
      />
    </>
  );
};
