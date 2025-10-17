'use client';

import { Card, CardContent } from '@movie-hub/shacdn-ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@movie-hub/shacdn-ui/select';
import { Button } from '@movie-hub/shacdn-ui/button';
import { Building2, Film, CalendarDays, Clock } from 'lucide-react';

export default function QuickBooking() {
  return (
    <Card
      className="bg-black/90 md:bg-white/10 md:border
  border-gray-300/20 shadow-md max-w-7xl mx-auto "
    >
      <CardContent className="flex flex-col md:flex-row items-center gap-4 p-4 max-w-7xl mx-auto">
        {/* Tiêu đề */}
        <h2 className="text-lg font-bold text-white whitespace-nowrap">
          ĐẶT VÉ NHANH
        </h2>

        <div className="flex items-center gap-2">
          <Building2 className="text-white" size={22} />
          <Select>
            <SelectTrigger className="w-[180px] h-13  text-rose-500 font-bold focus:ring-2 focus:ring-rose-700 text-lg ">
              <SelectValue
                placeholder={
                  <span className="text-rose-500 font-bold">1. Chọn Rạp</span>
                }
              />
            </SelectTrigger>
            <SelectContent className="text-rose-400">
              <SelectItem value="rap1">Rạp 1</SelectItem>
              <SelectItem value="rap2">Rạp 2</SelectItem>
              <SelectItem value="rap3">Rạp 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Film className="text-white" size={22} />
          <Select>
            <SelectTrigger className="w-[180px] h-13 text-rose-500 font-bold focus:ring-2 focus:ring-rose-700 text-lg">
              <SelectValue
                placeholder={
                  <span className="text-rose-500 font-bold">2. Chọn Phim</span>
                }
              />
            </SelectTrigger>
            <SelectContent className="text-rose-400">
              <SelectItem value="phim1">Phim A</SelectItem>
              <SelectItem value="phim2">Phim B</SelectItem>
              <SelectItem value="phim3">Phim C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays className="text-white" size={22} />
          <Select>
            <SelectTrigger className="w-[180px] h-13  text-rose-500 font-bold focus:ring-2 focus:ring-rose-700 text-lg">
              <SelectValue
                placeholder={
                  <span className="text-rose-500 font-bold">3. Chọn Ngày</span>
                }
              />
            </SelectTrigger>
            <SelectContent className="text-rose-400">
              <SelectItem value="2025-09-27">27/09/2025</SelectItem>
              <SelectItem value="2025-09-28">28/09/2025</SelectItem>
              <SelectItem value="2025-09-29">29/09/2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="text-white  " size={22} />
          <Select>
            <SelectTrigger className="w-[180px] h-13 text-rose-500 font-bold focus:ring-2 focus:ring-rose-700 text-lg">
              <SelectValue
                placeholder={
                  <span className="text-rose-500 font-bold">4. Chọn Suất</span>
                }
              />
            </SelectTrigger>
            <SelectContent className="text-rose-400">
              <SelectItem value="10h">10:00</SelectItem>
              <SelectItem value="14h">14:00</SelectItem>
              <SelectItem value="20h">20:00</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Button */}
        <Button className="text-white font-bold text-lg">ĐẶT NGAY</Button>
      </CardContent>
    </Card>
  );
}
