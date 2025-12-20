export const getVietnameseDay = (date: string) => {
  const day = new Date(date).getDay();
  const daysShort = ['CN', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7'];
  return daysShort[day];
};
