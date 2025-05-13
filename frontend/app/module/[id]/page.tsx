import { Module } from "./module";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <Module moduleId={id} userSubscription={{ isActive: false }} />;
}
