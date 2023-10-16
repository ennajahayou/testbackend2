// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import DIOhomepage from "./pages/DIOhomepage/DIOhomepage";
// import CEOProfil from "./pages/CEOProfil";
// import ExecutionBoard from "./pages/Executionboard";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <DIOhomepage />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import DIOhomepage from "./pages/DIOhomepage/DIOhomepage";
import CEOProfil from "./pages/CEOProfil";
import ExecutionBoard from "./pages/Executionboard";
import ExecutionAttribution from "./pages/ExecutionAttribution/ExecutionAttribution";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="DIO" element={<DIOhomepage />} />
        <Route path="CEOProfil" element={<CEOProfil />} />
        <Route path="ExecutionBoard" element={<ExecutionBoard />} />
        <Route path="ExecutionAttribution" element={<ExecutionAttribution />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
