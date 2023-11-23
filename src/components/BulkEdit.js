import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Button, InputGroup } from "react-bootstrap";
import ItemsEditModal from "./ItemsEditModal";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { updateInvoicesList } from "../redux/invoicesSlice";
import handleTtlCalculate from "../utils/handleTtlCalculate";

function BulkEdit() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allInvoices = location.state;
  const selectInvoiceList = allInvoices.filter((invoice) => invoice.selected);
  // selected invoice list
  const [selectedInvoicesList, setSelectedInvoicesList] =
    useState(selectInvoiceList);

  // itemlist for item modal
  const [itemList, setItemList] = useState([]);

  const updateFormData = (e, invoiceId) => {
    setSelectedInvoicesList(
      selectedInvoicesList.map((item) =>{
        if(item.id === invoiceId){
          if(e.target.name === "taxRate" || e.target.name === "discountRate"){
            console.log("🚀 ~ file: BulkEdit.js:34 ~ ) }):", handleTtlCalculate({ ...item, [e.target.name]: parseFloat(e.target.value) }))
            return handleTtlCalculate({ ...item, [e.target.name]: parseFloat(e.target.value) })
          }else{
            return handleTtlCalculate({ ...item, [e.target.name]: e.target.value })
          }
        }else{
          return item;
        }
      })
    );
  };

  const [show, setShow] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(""); 
  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setShow(true);
    const invoice = selectedInvoicesList.filter((item) => item.id === id);

    setSelectedInvoiceId(id);
    setItemList(invoice[0].items);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedInvoicesList = allInvoices.map((invoice) =>
      selectedInvoicesList.find((selectedInvoice) => selectedInvoice.id === invoice.id) || invoice
    );    
    dispatch(updateInvoicesList(updatedInvoicesList));
    navigate("/");
  };

  const updateItemListHandler = (itemList, invoiceId) => {
    const updatedInvoices = selectedInvoicesList.map((invoice) => {
      if (invoice.id === invoiceId) {
        return handleTtlCalculate({
          ...invoice,
          items: itemList,
        });
      } else {
        return handleTtlCalculate(invoice);
      }
    });
    const updatedInvoice = updatedInvoices.filter(
      (invoice) => invoice.id === invoiceId
    );
    
    setSelectedInvoicesList(updatedInvoices);
    setItemList(itemList);
      
    handleClose();
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h1 className="font-monospace fw-bold">Edit all the invoices at once</h1>
        <Table striped bordered hover responsive size="lg" className="my-4" >
          <thead>
            <tr>
              <th className="px-3">Invoice Number</th>
              <th>Bill From</th>
              <th>Bill From Email</th>
              <th>Bill From Address</th>
              <th>Bill To</th>
              <th>Bill To Email</th>
              <th>Bill To Address</th>
              <th>Item</th>
              <th>Notes</th>
              <th>Tax Rate</th>
              <th>Discount %</th>
            </tr>
          </thead>
          <tbody>
            {selectedInvoicesList.map((invoice) => (
              <tr>
                <td className="px-3">{invoice.invoiceNumber}</td>
                <td>
                  <Form.Control
                    type="text"
                    defaultValue={invoice.billFrom}
                    name="billFrom"
                    required
                    onChange={(e) => updateFormData(e, invoice.id)}
                    
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    defaultValue={invoice.billFromEmail}
                    name="billFromEmail"
                    required
                    onChange={(e) => updateFormData(e, invoice.id)}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    defaultValue={invoice.billFromAddress}
                    name="billFromAddress"
                    required
                    onChange={(e) => updateFormData(e, invoice.id)}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    defaultValue={invoice.billTo}
                    name="billTo"
                    required
                    onChange={(e) => updateFormData(e, invoice.id)}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    defaultValue={invoice.billToEmail}
                    name="billToEmail"
                    required
                    onChange={(e) => updateFormData(e, invoice.id)}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    defaultValue={invoice.billToAddress}
                    name="billToAddress"
                    required
                    onChange={(e) => updateFormData(e, invoice.id)}
                  />
                </td>

                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleShow(invoice.id)}
                  >
                    Item
                  </Button>
                </td>
                <td>
                  <Form.Control
                    type="text"
                    defaultValue={invoice.notes}
                    name="notes"
                    required
                    onChange={(e) => updateFormData(e, invoice.id)}
                  />
                </td>
                <td>
                    <InputGroup className="my-1 flex-nowrap">
                      <Form.Control
                        name="taxRate"
                        type="number"
                        defaultValue={invoice.taxRate}
                        onChange={(e) => updateFormData(e, invoice.id)}
                        className="bg-white border"
                        placeholder="0.0"
                        min="0.00"
                        step="0.01"
                        max="100.00"
                      />
                      <InputGroup.Text className="bg-light fw-bold text-secondary small">
                        %
                      </InputGroup.Text>
                    </InputGroup>
                </td>
                <td className="px-2">
                    <InputGroup className="my-1 flex-nowrap">
                      <Form.Control
                        name="discountRate"
                        type="number"
                        onChange={(e) => updateFormData(e, invoice.id)}
                        defaultValue={invoice.discountRate}
                        className="bg-white border"
                        placeholder="0.0"
                        min="0.00"
                        step="0.01"
                        max="100.00"
                        
                      />
                      <InputGroup.Text className="bg-light fw-bold text-secondary small">
                        %
                      </InputGroup.Text>
                    </InputGroup>

                </td>
           
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="success" type="submit" className="my-3">
          Save Edit Changes
        </Button>
      </Form>
            {show ? (
              <ItemsEditModal
                show={show}
                handleClose={handleClose}
                invoiceId={selectedInvoiceId}
                itemList={itemList}
                submitHandler={updateItemListHandler}
              />
            ) : null}
    </div>
  );
}

export default BulkEdit;
