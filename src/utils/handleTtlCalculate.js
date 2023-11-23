// this function will take the invoice containing the update tax,discount and items and return the updated invoice

const handleTtlCalculate = (invoice) => {
  let subTotal = 0;

  invoice.items.forEach((item) => {
    subTotal +=
      parseFloat(item.itemPrice).toFixed(2) * parseInt(item.itemQuantity);
  });

  const taxAmount = parseFloat(subTotal * (invoice.taxRate / 100)).toFixed(2);
  const discountAmount = parseFloat(
    subTotal * (invoice.discountRate / 100)
  ).toFixed(2);
  const total = (
    subTotal -
    parseFloat(discountAmount) +
    parseFloat(taxAmount)
  ).toFixed(2);

  return {
    ...invoice,
    subTotal: parseFloat(subTotal).toFixed(2),
    taxAmount,
    discountAmount,
    total,
  };
};
export default handleTtlCalculate;