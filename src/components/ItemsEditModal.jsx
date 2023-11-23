import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Table } from "react-bootstrap";
import {  BiTrash } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";

function ItemsEditModal(props) {
  const itemLists = props.itemList;
  const [formItemData, setFormItemData] = useState(() => itemLists);

  const updateFormItemData = (e, itemId) => {
    setFormItemData(
      formItemData.map((item) => {
        if (item.itemId === itemId) {
          if (e.target.name === "taxRate" || e.target.name === "discountRate") {
            return { ...item, [e.target.name]: parseFloat(e.target.value) };
          } else {
            return { ...item, [e.target.name]: e.target.value };
          }
        } else {
          return item;
        }
      })
    );
  };
  const handleDelete = (itemId) => {
    setFormItemData(formItemData.filter((item) => item.itemId !== itemId));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    props.submitHandler(formItemData, props.invoiceId);
  };

  const handleAddItem = (e) => {
    setFormItemData([
      ...formItemData,
      {
        itemId: formItemData.length + 1,
        itemName: "",
        itemPrice: 0,
        itemQuantity: 0,
        itemDescription: "",
      },
    ]);
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
        <Modal.Title className="font-monospace fw-bold fs-3">Update the items list </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Table responsive hover>
            <thead>
              <tr>
                <th className="px-2">Item Id</th>
                <th>Item Name</th>
                <th>Item Price</th>
                <th>Quantity</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {formItemData.map((item) => (
                <tr>
                  <td className="px-2 text-center">
                    {item.itemId}
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="itemName"
                      id=""
                      defaultValue={item.itemName}
                      onChange={(e) => updateFormItemData(e, item.itemId)}
                      placeholder="Name"
                      required
                    />
                  </td>

                  <td>
                    <Form.Control
                      type="text"
                      name="itemPrice"
                      id=""
                      defaultValue={item.itemPrice}
                      onChange={(e) => updateFormItemData(e, item.itemId)}
                      placeholder="Price"
                      required
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      name="itemQuantity"
                      id=""
                      defaultValue={item.itemQuantity}
                      onChange={(e) => updateFormItemData(e, item.itemId)}
                      placeholder="Quantity"
                      required
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="itemDescription"
                      id=""
                      defaultValue={item.itemDescription}
                      onChange={(e) => updateFormItemData(e, item.itemId)}
                      placeholder="Description"
                      required
                    />
                  </td>
                  <td style={{ width: "5%" }}>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(item.itemId)}
                    >
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <BiTrash />
                      </div>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        <Button variant="outline-warning" type="submit">
          Update Item List
        </Button>
        <Button
          variant="outline-primary mx-3"
          type="button"
          onClick={handleAddItem}
          >
          Add Item
        </Button>
          </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ItemsEditModal;
