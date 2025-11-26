'use client';
import { useAuth, useClerk, useUser } from '@clerk/nextjs';
import { Button } from '@movie-hub/shacdn-ui/button';
import { BlurCircle } from 'apps/web/src/components/blur-circle';
import {
  useGetSessionTTL,
  useGetShowtimeSeats,
} from 'apps/web/src/hooks/showtime-hooks';
import { useBookingStore } from 'apps/web/src/stores/booking-store';
import { Check, Film, LogIn } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CinemaScreen } from './_components/cinema-screen';
import { SeatGrid } from './_components/seat-grid';
import { SeatLegend } from './_components/seat-legend';
import { TicketTypeList } from './_components/ticket-list';
import { RequireSignIn } from 'apps/web/src/components/require-sign-in';
import BookingBar from './_components/booking-summary';
import { LayoutTypeEnum } from 'apps/web/src/libs/types/showtime.type';
import { useRouter } from 'next/navigation';

const steps = ['Chọn ghế', 'Chọn đồ ăn', 'Thanh toán'];

export const SeatBooking = ({ showtimeId }: { showtimeId: string }) => {
  const { user } = useUser();

 
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const nextStep = () => {
   
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Redirect sau khi thanh toán thành công
  const handlePaymentSuccess = (bookingId: string) => {
    router.push(`/showtimes/${showtimeId}/tickets?bookingId=${bookingId}`);
  };

  return (
    <RequireSignIn>
      <div className="flex flex-col  w-full justify-center items-center px-4 md:px-12">
       

        {/* Stepper */}
        <div className="flex justify-center items-center w-full mb-6 ">
          {steps.map((label, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index < steps.length - 1 ? 'flex-1' : ''
              }`}
            >
              {/* Circle */}
              <div
                className={`
          w-10 h-10 rounded-full flex items-center justify-center font-bold text-white
          ${
            currentStep > index
              ? 'bg-rose-500'
              : currentStep === index
              ? 'bg-rose-500/20 border border-rose-500/70'
              : 'bg-gray-600'
          }
        `}
              >
                {currentStep > index ? (
                  <Check className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>

              {/* Line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 ${
                    currentStep > index ? 'bg-rose-500' : 'bg-gray-600'
                  } transition-all`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex w-full items-center justify-between gap-4 mt-6">
          {currentStep > 0 ? (
            <Button variant="outline" onClick={prevStep}>
              Quay lại
            </Button>
          ) : (
            <div></div>
          )}
          {currentStep < steps.length - 1 && (
            <Button onClick={nextStep}>Tiếp tục</Button>
          )}
        </div>

        {/* Step content */}
        <div className="flex-1">
          {currentStep === 0 && <div></div>}
          {currentStep === 1 && <div></div>}
          {currentStep === 2 && <div></div>}
        </div>
      </div>
      <BookingBar />
    </RequireSignIn>
  );
};
