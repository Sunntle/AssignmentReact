import React, { useEffect } from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import "./ToastStyle.scss";

function ToastMessage({ toast }) {
  useEffect(() => {
    console.log(toast);
  }, [toast]);
  return (
    <Toast isOpen={toast.isOpen} transition={{ timeout: 150 }} className="fixed-bottom">
      <ToastHeader icon={toast.type}>Notification</ToastHeader>
      <ToastBody>{toast.message}</ToastBody>
    </Toast>
  );
}
export default ToastMessage;
