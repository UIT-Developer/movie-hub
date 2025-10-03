'use client';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { BlurCircle } from '../../../../../components/blur-circle';
interface DateSelectProps {
  dateTime: { [dateKey: string]: unknown };
  id: string;
}
type SelectedDateKey = string | null;
export const DateSelect = ({ dateTime, id }: DateSelectProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState<SelectedDateKey>(null);

  const onBookHandler = useCallback(() => {
    if (!selected) {
      return toast.error('Please select a date');
    }
    router.push(`${id}/${selected}`);
    scrollTo(0, 0);
  }, [router, id, selected]);
  return (
    <div id="dateSelect" className="pt-30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-rose-500/10  border border-rose-500/20 rounded-lg">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />
        <div>
          <p className="text-lg font-semibold text-white">Chọn ngày</p>
          <div className="flex items-center gap-6 text-sm mt-5">
            <ChevronLeftIcon width={28} color="white" />
            <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
              {Object.keys(dateTime).map((date) => (
                <button
                  onClick={() => {
                    setSelected(date);
                  }}
                  key={date}
                  className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded-lg cursor-pointer ${
                    selected === date
                      ? 'bg-rose-500 text-white'
                      : 'border border-rose-500/70'
                  }`}
                >
                  <span className="font-bold text-white">
                    {new Date(date).getDate()}
                  </span>
                  <span className="font-semibold text-neutral-400">
                    {new Date(date).toLocaleDateString('en-US', {
                      month: 'short',
                    })}
                  </span>
                </button>
              ))}
            </span>
            <ChevronRightIcon width={28} color="white" />
          </div>
        </div>
        <button
          onClick={onBookHandler}
          className="bg-rose-500 text-white px-8 py-2 mt-6 rounded hover:bg-rose-500/90 transition-all cursor-pointer"
        >
          Đặt ngay
        </button>
      </div>
    </div>
  );
};
