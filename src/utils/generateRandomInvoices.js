import generateRandomId from "./generateRandomId";
import handleTtlCalculate from "./handleTtlCalculate";

export default function generateRandomInvoices(numInvoices) {
  const dummyInvoices = [];

  for (let i = 1; i <= numInvoices; i++) {
    const generatedId = generateRandomId();

    const dummyInvoice = {
      id: generatedId,
      currentDate: new Date().toLocaleDateString(),
      invoiceNumber: i,
      dateOfIssue: `2023-11-${i}`, // Example date
      billTo: `Customer ${i}`,
      billToEmail: `customer${i}@example.com`,
      billToAddress: `Address ${i}`,
      billFrom: "Your Company",
      billFromEmail: "yourcompany@example.com",
      billFromAddress: "Your Company Address",
      notes: `Invoice notes for ${i}`,
      total: 100.00, // Example total
      subTotal: 90.00, // Example subtotal
      taxRate: 10,
      taxAmount: 10.00,
      discountRate: 5,
      discountAmount: 5.00,
      currency: "$",
      items: [
        {
          itemId: 1,
          itemName: `Item ${i}`,
          itemDescription: `Description for Item ${i}`,
          itemPrice: 20.00, // Example item price
          itemQuantity: 2, // Example item quantity
        },
        // You can add more items if needed
      ],
    };

    dummyInvoices.push(handleTtlCalculate(dummyInvoice));
  }

  return dummyInvoices;
}

