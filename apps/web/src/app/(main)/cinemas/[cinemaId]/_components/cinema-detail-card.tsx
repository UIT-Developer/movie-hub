
import { Card, CardContent } from '@movie-hub/shacdn-ui/card';
import { CinemaLocationResponse } from 'apps/web/src/libs/types/cinema.type';
import { MapPin, Phone, Mail, Globe, Star, Clock } from 'lucide-react';
import Image from 'next/image';


export default function CinemaDetailCard({ cinema  }: {
  cinema: CinemaLocationResponse
}) {
 return (
   <Card className="w-full rounded-xl shadow-md bg-gray-900 text-gray-200 p-4">
     <CardContent className="flex flex-col md:flex-row gap-4">
       {/* Left image */}
       <div className="w-full md:w-1/3 h-40 md:h-auto rounded-lg overflow-hidden flex-shrink-0">
         <Image
           src={cinema.images?.[0] || '/placeholder.jpg'}
           alt={cinema.name}
           width={400}
           height={300}
           className="w-full h-full object-cover"
         />
       </div>

       {/* Right info */}
       <div className="flex-1 flex flex-col gap-2">
         {/* Title and rating */}
         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
           <h2 className="text-xl font-bold text-white">{cinema.name}</h2>
           <div className="flex items-center gap-1 text-yellow-500 text-sm">
             <Star className="w-4 h-4" /> {cinema.rating || '—'}
             <span className="text-gray-400">({cinema.totalReviews})</span>
           </div>
         </div>

         {/* Address */}
         <div className="flex items-center gap-1 text-gray-300 text-sm">
           <MapPin className="w-4 h-4" />
           <span>
             {cinema.address}, {cinema.district && `${cinema.district},`}{' '}
             {cinema.city}
           </span>
         </div>

         {/* Contact */}
         <div className="flex flex-col gap-1 text-gray-300 text-sm">
           {cinema.phone && (
             <div className="flex items-center gap-1">
               <Phone className="w-4 h-4" /> {cinema.phone}
             </div>
           )}
           {cinema.email && (
             <div className="flex items-center gap-1">
               <Mail className="w-4 h-4" /> {cinema.email}
             </div>
           )}
           {cinema.website && (
             <div className="flex items-center gap-1">
               <Globe className="w-4 h-4" />{' '}
               <a
                 href={cinema.website}
                 target="_blank"
                 className="underline text-blue-400 hover:text-blue-300"
               >
                 Website
               </a>
             </div>
           )}
         </div>

         {/* Operating hours */}
         {cinema.operatingHours && (
           <div className="flex flex-col gap-1 text-gray-300 text-sm">
             <div className="flex items-center gap-1 font-semibold">
               <Clock className="w-4 h-4" /> Giờ hoạt động:
             </div>
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
               {Object.entries(cinema.operatingHours).map(([day, hours]) => (
                 <div key={day} className="flex justify-between">
                   <span className="capitalize">{day}</span>
                   <span>{String(hours)}</span>
                 </div>
               ))}
             </div>
           </div>
         )}

         {/* Amenities */}
         {cinema.amenities?.length > 0 && (
           <div className="flex flex-wrap gap-2 mt-1">
             {cinema.amenities.map((a, i) => (
               <span
                 key={i}
                 className="px-2 py-1 rounded-full bg-gray-800 text-xs border border-gray-700"
               >
                 {a}
               </span>
             ))}
           </div>
         )}
       </div>
     </CardContent>
   </Card>
 );
}
