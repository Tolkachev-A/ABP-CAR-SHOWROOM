export const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number
) => {
  return (price * (1 - discountPercentage / 100)).toFixed(2);
};
