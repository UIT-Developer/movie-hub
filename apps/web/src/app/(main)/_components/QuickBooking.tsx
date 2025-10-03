"use client";

import { Card, CardContent } from "@movie-hub/shacdn-ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@movie-hub/shacdn-ui/select";
import { Button } from "@movie-hub/shacdn-ui/button";
import { Building2, Film, CalendarDays, Clock } from "lucide-react";

export default function QuickBooking() {
  return (
    <Card className="bg-gradient-to-r from-indigo-200 to-indigo-50 shadow-md max-w-7xl mx-auto ">
      <CardContent className="flex flex-col md:flex-row items-center gap-4 p-4 max-w-7xl mx-auto">
        {/* Tiêu đề */}
        <h2 className="text-lg font-bold text-gray-800 whitespace-nowrap">ĐẶT VÉ NHANH</h2>

        <div className="flex items-center gap-2">
          <Building2 className="text-purple-700" size={22} />
          <Select>
            <SelectTrigger className="w-[180px] h-13  text-purple-700 font-bold focus:ring-2 focus:ring-purple-400 text-lg ">
              <SelectValue placeholder={<span className="text-purple-700 font-bold">1. Chọn Rạp</span>} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rap1">Rạp 1</SelectItem>
              <SelectItem value="rap2">Rạp 2</SelectItem>
              <SelectItem value="rap3">Rạp 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Film className="text-purple-700" size={22} />
          <Select>
            <SelectTrigger className="w-[180px] h-13 text-purple-700 font-bold focus:ring-2 focus:ring-purple-400 text-lg">
              <SelectValue placeholder={<span className="text-purple-700 font-bold">2. Chọn Phim</span>} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phim1">Phim A</SelectItem>
              <SelectItem value="phim2">Phim B</SelectItem>
              <SelectItem value="phim3">Phim C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays className="text-purple-700" size={22} />
          <Select>
            <SelectTrigger className="w-[180px] h-13  text-purple-700 font-bold focus:ring-2 focus:ring-purple-400 text-lg">
              <SelectValue placeholder={<span className="text-purple-700 font-bold">3. Chọn Ngày</span>} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025-09-27">27/09/2025</SelectItem>
              <SelectItem value="2025-09-28">28/09/2025</SelectItem>
              <SelectItem value="2025-09-29">29/09/2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="text-purple-700" size={22} />
          <Select>
            <SelectTrigger className="w-[180px] h-13 text-purple-700 font-bold focus:ring-2 focus:ring-purple-400 text-lg">
              <SelectValue placeholder={<span className="text-purple-700 font-bold">4. Chọn Suất</span>} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10h">10:00</SelectItem>
              <SelectItem value="14h">14:00</SelectItem>
              <SelectItem value="20h">20:00</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Button */}
        <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg">
          ĐẶT NGAY
        </Button>
      </CardContent>
    </Card>
  );
}
