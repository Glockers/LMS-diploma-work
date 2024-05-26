export default function TestPage({
  params: { courseId }
}: {
  params: {
    courseId: string;
  };
}) {
  return <>{courseId}</>;
}
