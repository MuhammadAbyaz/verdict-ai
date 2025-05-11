import { Module } from "./module";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Module
      moduleId={id}
      initialPercentage={0}
      initialHearts={10}
      initialLessonId={0}
      userSubscription={{ isActive: false }}
    />
  );
}
