import Modal from "react-bootstrap/Modal";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import react, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteSelectedInvoices } from "../redux/invoicesSlice";

import InvoiceRow from "./InvoiceRow";

function EditInvoiceModal(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invoiceListWithSelectedField = props.invoiceList.map((invoice) => {
    return { ...invoice, selected: false };
  });

  // Contains all Invoices with seleted field
  const [invoiceList, setInvoiceList] = useState(invoiceListWithSelectedField);
  

  useEffect(() => {
   

    setInvoiceList(
      invoiceList.map((item) => {
        item.selected = false;
        return item;
      })
    );
  }, [props.show]);

  const [isAllItemSelected, setIsAllItemSelected] = useState(false);

  const handleSelectAll = (checked) => {
    setIsAllItemSelected(checked);
    setInvoiceList(
      invoiceList.map((item) => {
        item.selected = checked;
        return item;
      })
    );
  };

  const handleSelect = (id, checked) => {
    const updatedInvoiceList = invoiceList.map((item) => {
      if (item.id === id) {
        item.selected = checked;
      }
      return item;
    });
    const isAllSelected = updatedInvoiceList.every((item) => item.selected);
    setIsAllItemSelected(isAllSelected);
    setInvoiceList(updatedInvoiceList);
  };

  const handleEdit = () => {
    const newList = invoiceList;
    if (newList.length > 0) {
      navigate(`/bulkEdit`, {
        state: newList,
      });
    }
  };

  const handleDelete = () => {
    const newList = invoiceList.filter((invoice) => invoice.selected);
    const selectedInvoiceIds = newList.map((invoice) => invoice.id);

    dispatch(deleteSelectedInvoices(selectedInvoiceIds));
    props.handleClose();
    navigate(`/`);
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title className="font-monospace">
          Select Invoices to Edit or Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table responsive hover>
          <thead>
            <tr>
              <th className="px-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="allSelect"
                  checked={isAllItemSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="font-monospace fs-5">Invoice No.</th>
              <th className="font-monospace fs-5">Bill To</th>
              <th className="font-monospace fs-5">Due Date</th>
              <th className="font-monospace fs-5">Total Amt.</th>
            </tr>
          </thead>
          <tbody>
            {invoiceList.map((invoice) => (
              <InvoiceRow
                key={invoice.id}
                invoice={invoice}
                handleSelect={handleSelect}
              />
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleEdit}>
          Edit Selected Items
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Selected Items
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditInvoiceModal;
