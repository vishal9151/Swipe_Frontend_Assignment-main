import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiSolidPencil, BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import InvoiceModal from "../components/InvoiceModal";
import { useNavigate } from "react-router-dom";
import { useInvoiceListData } from "../redux/hooks";
import { useDispatch } from "react-redux";
import {  deleteInvoice } from "../redux/invoicesSlice";
import EditInvoiceModal from "../components/EditInvoiceModal";
import { toast, ToastContainer } from "react-toastify";

const InvoiceList = () => {
  const { invoiceList, getOneInvoice } = useInvoiceListData();

  const isListEmpty = invoiceList.length === 0;
  const [copyId, setCopyId] = useState("");
  const navigate = useNavigate();
  const handleCopyClick = () => {
    const invoice = getOneInvoice(copyId);
    if (!invoice) {
      toast.error("Please enter the valid invoice id.");
    } else {
      navigate(`/create/${copyId}`);
    }
  };
  console.log(invoiceList, "invoiceList");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Row>
      <Col className="mx-auto" xs={12} md={8} lg={9}>
        <h3 className="fw-bold pb-2 pb-md-4 text-center fs-1 font-monospace">
          Swipe Assignment
        </h3>
        <Card className="d-flex p-3 p-md-4 my-3 my-md-4 ">
          {isListEmpty ? (
            <div className="d-flex flex-column align-items-center">
              <h3 className="fw-bold pb-2 pb-md-4">No invoices present</h3>
              <Link to="/create">
                <Button variant="primary">Create Invoice</Button>
              </Link>
            </div>
          ) : (
            <div className="d-flex flex-column">
              <div className="d-flex flex-row align-items-center justify-content-between">
                <h3 className="fw-bold pb-2 pb-md-4 fs-2 font-monospace">
                  Invoice List
                </h3>
                <Link to="/create">
                  <Button variant="primary mb-2 mb-md-4 fw-normal">
                    Create Invoice
                  </Button>
                </Link>
                <Button
                  variant="primary mb-2 mb-md-4 fw-normal"
                  onClick={handleShow}
                >
                  Edit Invoices
                </Button>
                <EditInvoiceModal
                  show={show}
                  handleClose={handleClose}
                  invoiceList={invoiceList}
                />

                <div className="d-flex gap-2">
                  <Button
                    variant="dark mb-2 mb-md-4 fw-normal"
                    onClick={handleCopyClick}
                  >
                    Copy Invoice
                  </Button>
                  <ToastContainer />
                  <input
                    type="text"
                    value={copyId}
                    onChange={(e) => setCopyId(e.target.value)}
                    placeholder="Enter Invoice ID to copy"
                    className="bg-white border"
                    style={{
                      height: "50px",
                      borderRadius: "10px",
                      textAlign: "center",
                    }}
                  />
                </div>
              </div>
              <Table responsive striped bordered>
                <thead>
                  <tr>
                    <th className="px-2 fs-5 font-monospace">Invoice No.</th>
                    <th className="fs-5 font-monospace">Bill To</th>
                    <th className="fs-5 font-monospace">Due Date</th>
                    <th className="fs-5 font-monospace">Total Amt.</th>
                    <th className="fs-5 font-monospace">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceList.map((invoice) => (
                    <InvoiceRow
                      key={invoice.id}
                      invoice={invoice}
                      navigate={navigate}
                    />
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

const InvoiceRow = ({ invoice, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteClick = (invoiceId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this invoice?"
    );

    if (userConfirmed) {
      dispatch(deleteInvoice(invoiceId));
    }
  };

  const handleEditClick = () => {
    navigate(`/edit/${invoice.id}`);
  };

  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {});
  return (
    <tr>
      <td className="px-2 fs-6">{invoice.invoiceNumber}</td>
      <td className="fw-normal fs-6">{invoice.billTo}</td>
      <td className="fw-normal fs-6">{invoice.dateOfIssue}</td>
      <td className="fw-normal fs-6">
        {invoice.currency}
        {invoice.total}
      </td>
      <td>
        <Button variant="outline-primary" onClick={handleEditClick}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiSolidPencil />
          </div>
        </Button>
        <Button
          variant="danger"
          onClick={() => handleDeleteClick(invoice.id)}
          className="mx-3"
        >
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiTrash />
          </div>
        </Button>
        <Button variant="secondary" onClick={openModal}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BsEyeFill />
          </div>
        </Button>
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

export default InvoiceList;
