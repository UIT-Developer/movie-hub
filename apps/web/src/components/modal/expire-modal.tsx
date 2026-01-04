import { Button } from "@movie-hub/shacdn-ui/button";

export function ExpiredModal({ onConfirm }: { onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
      <div className="bg-rose-700  text-white p-6 rounded-xl w-[90%] max-w-sm text-center">
        <h2 className="text-xl font-bold mb-3 text-white">
          Hết thời gian giữ ghế
        </h2>
        <p className="text-neutral-300 mb-6">
          Vui lòng chọn lại suất chiếu để tiếp tục.
        </p>
        <Button
        variant='secondary'
          onClick={onConfirm}
          className="w-full"
        >
          Trở về
        </Button>
      </div>
    </div>
  );
}
