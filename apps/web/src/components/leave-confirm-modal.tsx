'use client';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@movie-hub/shacdn-ui/dialog';
import { Button } from '@movie-hub/shacdn-ui/button';

export function LeaveConfirmDialog({
  open,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="bg-[#111] border border-rose-500/40">
        <DialogHeader>
          <DialogTitle className="text-white">
            Rời khỏi trang đặt vé?
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            Nếu bạn rời trang, ghế đang giữ và giỏ hàng sẽ bị đặt lại.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>
            Ở lại
          </Button>
          <Button className="bg-rose-600 text-white" onClick={onConfirm}>
            Thoát trang
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
