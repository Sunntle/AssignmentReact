import React from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import "./ToastStyle.scss";
function ToastMessage(props) {
  const { isOpen, message } = props;
  return (
    <Toast isOpen={isOpen} transition={{ timeout: 200 }} className="fixed-bottom">
      <ToastHeader icon={message.status}>Notification</ToastHeader>
      <ToastBody>{message.data}</ToastBody>
    </Toast>
  );
}
export const TOAST_MESSAGE_CONSTANT = {
  add: {
    status: "success",
    data: "Add to cart successfully!",
  },
  update: {
    status: "info",
    data: "Updated product successfully!",
  },
  remove: {
    status: "warning",
    data: "Deleted product successfully!",
  },
  removeAll: {
    status: "danger",
    data: "Cart empty!",
  },
};
export default ToastMessage;
