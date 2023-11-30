
export const numberFormat = (value) =>
new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND'
}).format(value);






export function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }