export const ErrorFallback = ({
  message,
}: {
  message: string;
}) => {
  return (
    <div role="alert" className="p-4 bg-red-100 text-red-700 rounded">
      <p className="font-bold">Something went wrong:</p>
      <pre className="whitespace-pre-wrap">{message}</pre>
    </div>
  );
}
    