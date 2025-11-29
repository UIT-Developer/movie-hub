import { Badge } from "@movie-hub/shacdn-ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@movie-hub/shacdn-ui/card";
import { Skeleton } from "@movie-hub/shacdn-ui/skeleton";
import { PromotionDto } from "apps/web/src/libs/types/promotion.type";

import { CalendarDays, TicketPercent } from "lucide-react";

export const PromotionCard = ({data}: {
  data: PromotionDto
}) => {
  return (
    <Card className="w-full max-w-md rounded-2xl shadow-lg p-4 bg-rose-500/20 border border-rose-500">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2 text-rose-400">
          <TicketPercent className="w-5 h-5" /> {data.name}
        </CardTitle>
        <p className="text-sm text-neutral-300">Mã: {data.code}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        {data.description && (
          <p className="text-gray-400 text-sm">{data.description}</p>
        )}

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{data.type}</Badge>
          <Badge variant="destructive">Giá trị: {data.value}</Badge>
          {data.maxDiscount && (
            <Badge variant="secondary">Tối đa: {data.maxDiscount}</Badge>
          )}
        </div>

        <div className="text-sm text-gray-400 flex items-center gap-2">
          <CalendarDays className="w-4 h-4" />
          {new Date(data.validFrom).toLocaleDateString()} →{' '}
          {new Date(data.validTo).toLocaleDateString()}
        </div>

        <div className="text-sm text-gray-400">
          Áp dụng cho: {data.applicableFor.join(', ')}
        </div>

        <div className="text-sm text-neutral-300">
          Đã dùng: {data.currentUsage}
          {data.usageLimit && ` / ${data.usageLimit}`}
        </div>

      </CardContent>
    </Card>
  );
}

PromotionCard.Skeleton = function PromotionCardSkeleton() {
  return (
    <Card className="w-full max-w-md rounded-2xl bg-bg-neutral-700 shadow-lg p-4">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-">
          <Skeleton className="w-5 h-5" />
          <Skeleton className="w-32 h-6" />
        </CardTitle>
        <p className="text-sm text-neutral-300">
          <Skeleton className="w-24 h-4" />
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <p>
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-5/6 h-4 mt-1" />
        </p>

        <div className="flex flex-wrap gap-2">
          <Skeleton className="w-16 h-6" />
          <Skeleton className="w-20 h-6" />
          <Skeleton className="w-24 h-6" />
        </div>

        <div className="text-sm text-gray-400 flex items-center gap-2">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="w-32 h-4" />
        </div>

        <div className="text-sm text-gray-400">
          <Skeleton className="w-40 h-4" />
        </div>

        <div className="text-sm text-neutral-300">
          <Skeleton className="w-20 h-4" />
        </div>
      </CardContent>
    </Card>
  );
}