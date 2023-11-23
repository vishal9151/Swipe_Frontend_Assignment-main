import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import Invoice from "./pages/Invoice";
import InvoiceList from "./pages/InvoiceList";
import BulkEdit from "./components/BulkEdit";
import { addInvoice } from "./redux/invoicesSlice";
import generateRandomInvoices from "./utils/generateRandomInvoices";
import { ToastContainer } from 'react-toastify';


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const randomInvoices = generateRandomInvoices(3)
    console.log("randomd -- ",randomInvoices)
    randomInvoices.forEach((invoice)=>{
      dispatch(addInvoice(invoice));
    })
  },[]);
  return (
    <div className="App d-flex flex-column align-items-center mt-5 w-100">
      <ToastContainer />
      <Container>
        <Routes>
          <Route path="/" element={<InvoiceList />} />
          <Route path="/create" element={<Invoice />} />
          <Route path="/create/:id" element={<Invoice />} />
          <Route path="/edit/:id" element={<Invoice />} />
          <Route path="/bulkEdit" element={<BulkEdit />} />
        </Routes>
      </Container>
      
    </div>
  );
};

export default App;
