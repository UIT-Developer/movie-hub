/**
 * Timezone utility functions for consistent UTC+7 (Vietnam timezone) handling
 * Backend stores all times in UTC, frontend must convert to UTC+7 for display
 */

/**
 * Convert UTC time to Vietnam timezone (UTC+7) and format as time string
 * @param utcDate - ISO UTC date string or Date object
 * @returns Formatted time string "HH:mm" in UTC+7
 */
export function formatShowtimeTime(utcDate: string | Date): string {
  const date = typeof utcDate === 'string' ? new Date(utcDate) : utcDate;
  const vnDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  
  const hours = vnDate.getUTCHours().toString().padStart(2, '0');
  const minutes = vnDate.getUTCMinutes().toString().padStart(2, '0');
  
  return `${hours}:${minutes}`;
}

/**
 * Convert UTC time to Vietnam timezone (UTC+7) and format as date-time string
 * @param utcDate - ISO UTC date string or Date object
 * @returns Formatted datetime string "HH:mm DD/MM/YYYY" in UTC+7
 */
export function formatShowtimeDateTime(utcDate: string | Date): string {
  const date = typeof utcDate === 'string' ? new Date(utcDate) : utcDate;
  const vnDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  
  const hours = vnDate.getUTCHours().toString().padStart(2, '0');
  const minutes = vnDate.getUTCMinutes().toString().padStart(2, '0');
  const day = vnDate.getUTCDate().toString().padStart(2, '0');
  const month = (vnDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = vnDate.getUTCFullYear();
  
  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

/**
 * Convert UTC time to Vietnam timezone (UTC+7) and format for detailed display
 * @param utcDate - ISO UTC date string or Date object
 * @returns Formatted string "HH:mm DD/MM/YYYY" with Vietnamese locale
 */
export function formatShowtimeDateTimeVN(utcDate: string | Date): string {
  const date = typeof utcDate === 'string' ? new Date(utcDate) : utcDate;
  const vnDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  
  const day = vnDate.getUTCDate().toString().padStart(2, '0');
  const month = (vnDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = vnDate.getUTCFullYear();
  const hours = vnDate.getUTCHours().toString().padStart(2, '0');
  const minutes = vnDate.getUTCMinutes().toString().padStart(2, '0');
  
  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

/**
 * Check if a showtime has already passed in Vietnam timezone
 * @param utcDate - ISO UTC date string or Date object
 * @returns true if showtime is in the past, false otherwise
 */
export function isShowtimePassed(utcDate: string | Date): boolean {
  const date = typeof utcDate === 'string' ? new Date(utcDate) : utcDate;
  return date < new Date();
}
