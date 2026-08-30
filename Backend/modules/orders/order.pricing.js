export function calculateOrderTotal({ itemsPrice, taxPrice, shippingPrice }) {
  const items = Number(itemsPrice);
  const tax = Number(taxPrice);
  const shipping = Number(shippingPrice);

  const taxAmount = items * (tax / 100);
  const totalPrice = items + taxAmount + shipping;

  return { taxAmount, totalPrice };
}
