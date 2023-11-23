import { useState } from "react";
import InvoiceModal from "../components/InvoiceModal";

const InvoiceRow = ({ invoice, handleSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <tr>
      <td className="px-2">
        <input
          type="checkbox"
          className="form-check-input"
          checked={invoice.selected}
          id={invoice.id}
          onChange={(e) => {
            handleSelect(invoice.id, e.target.checked);
          }}
        />
      </td>
      <td className="fw-normal font-monospace fs-6">{invoice.invoiceNumber}</td>
      <td className="fw-normal font-monospace fs-6">{invoice.billTo}</td>
      <td className="fw-normal font-monospace fs-6">{invoice.dateOfIssue}</td>
      <td className="fw-normal font-monospace fs-6">
        {invoice.currency}
        {invoice.total}
      </td>

      <InvoiceModal
        showModal={isOpen}
        closeModal={closeModal}
        info={{
          isOpen,
          id: invoice.id,
          currency: invoice.currency,
          currentDate: invoice.currentDate,
          invoiceNumber: invoice.invoiceNumber,
          dateOfIssue: invoice.dateOfIssue,
          billTo: invoice.billTo,
          billToEmail: invoice.billToEmail,
          billToAddress: invoice.billToAddress,
          billFrom: invoice.billFrom,
          billFromEmail: invoice.billFromEmail,
          billFromAddress: invoice.billFromAddress,
          notes: invoice.notes,
          total: invoice.total,
          subTotal: invoice.subTotal,
          taxRate: invoice.taxRate,
          taxAmount: invoice.taxAmount,
          discountRate: invoice.discountRate,
          discountAmount: invoice.discountAmount,
        }}
        items={invoice.items}
        currency={invoice.currency}
        subTotal={invoice.subTotal}
        taxAmount={invoice.taxAmount}
        discountAmount={invoice.discountAmount}
        total={invoice.total}
      />
    </tr>
  );
};
export default InvoiceRow;
