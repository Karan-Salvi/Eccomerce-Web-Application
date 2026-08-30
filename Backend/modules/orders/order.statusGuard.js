export function isAlreadyDelivered(order) {
  return order.orderStatus === 'delivered';
}
