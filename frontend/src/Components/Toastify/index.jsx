import React from "react";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastifyAlert() {
  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable="mouse"
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </div>
  );
}
export default ToastifyAlert;
