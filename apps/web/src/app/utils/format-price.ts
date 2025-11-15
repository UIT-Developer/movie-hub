export const formatPrice = (amount: number, includeUnit = true) => {
  if (typeof amount !== 'number') return '';

  // Chuyển số thành chuỗi có phân cách nghìn bằng dấu chấm
  const formatted = amount.toLocaleString('vi-VN');

  return includeUnit ? `${formatted} VNĐ` : formatted;
}
