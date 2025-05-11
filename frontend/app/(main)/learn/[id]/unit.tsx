import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";

type Props = {
  order: number;
  title: string;
  description: string;
  modules: Module[];
  activeModule: number;
};

export const Unit = ({
  order,
  title,
  description,
  modules,
  activeModule,
}: Props) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative">
        {modules.map((module, index) => {
          console.log("active module", activeModule, "index", index);
          const isCurrent = activeModule === index;
          const isLocked = index > activeModule;

          return (
            <LessonButton
              key={module.id}
              id={module.id}
              index={index}
              totalCount={modules.length - 1}
              current={isCurrent}
              locked={isLocked}
            />
          );
        })}
      </div>
    </>
  );
};
