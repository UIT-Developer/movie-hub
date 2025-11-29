'use client';



import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@movie-hub/shacdn-ui/select';
import { useGetConcessions } from 'apps/web/src/hooks/concession-hooks';
import {
  ConcessionCategory,
  ConcessionDto,
} from 'apps/web/src/libs/types/concession.type';
import { Loader } from 'apps/web/src/components/loader';
import { toast } from 'sonner';
import { useFindPromotionByTypes } from 'apps/web/src/hooks/promotion-hook';
import { PromotionType } from 'apps/web/src/libs/types/promotion.type';
import { useState } from 'react';
import { PromotionCard } from './_components/promotion-card';

export const PromotionList = () => {


   const [type, setType] = useState<PromotionType>(PromotionType.FIXED_AMOUNT);

  const { data, isLoading } = useFindPromotionByTypes(
    type
  )

  const promotions = data || [];


  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-white tracking-tight text-center">
        Khuyến mãi
      </h1>

      {/* Select category */}
      <Select
        value={type}
        onValueChange={(val) => setType(val as PromotionType)}
      >
        <SelectTrigger className="w-[220px] bg-zinc-900 text-white border-zinc-700">
          <SelectValue placeholder="Chọn loại" />
        </SelectTrigger>

        <SelectContent className="bg-zinc-900 text-white border-zinc-700">
          <SelectItem value={PromotionType.FIXED_AMOUNT}>
            💵 Lượng tiền
          </SelectItem>
          <SelectItem value={PromotionType.FREE_ITEM}>
            🆓 Miễn phí sản phẩm
          </SelectItem>
          <SelectItem value={PromotionType.PERCENTAGE}>💰 Tỉ lệ</SelectItem>
          <SelectItem value={PromotionType.POINTS}>🌟 Điểm thưởng</SelectItem>
        </SelectContent>
      </Select>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <PromotionCard.Skeleton key={idx} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && promotions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
          <div className="text-6xl mb-4">🧐</div>
          <p className="text-lg">Hiện tại không có khuyến mãi nào.</p>
        </div>
      )}

      {/* Food grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {!isLoading &&
          promotions.length > 0 &&
          promotions.map((promotion) => (
            <PromotionCard key={promotion.id} data={promotion} />
          ))}
      </div>
    </div>
  );
};
