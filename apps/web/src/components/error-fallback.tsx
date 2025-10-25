export const ErrorFallback = ({
  message,
}: {
  message: string;
}) => {
  return (
    <div role="alert" className="p-4 bg-red-100 text-red-700 rounded-lg flex flex-col items-center justify-center w-full gap-2 ">
      <p className="font-bold">Đã có lỗi xảy ra</p>
      <pre className="whitespace-pre-wrap">{message}</pre>
    </div>
  );
}
    