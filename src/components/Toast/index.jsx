import React, { useEffect } from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import "./ToastStyle.scss";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "redux/toast/toastSlice";

function ToastMessage() {
  const toast = useSelector((state) => state.toastReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    let delay;
    if (toast.isOpen) {
      delay = setTimeout(() => {
        dispatch(hideToast());
      }, 1500);
    }
    return () => {
      clearTimeout(delay);
    };
  }, [dispatch, toast.isOpen]);

  return (
    <Toast isOpen={toast.isOpen} transition={{ timeout: 100 }} className="fixed-bottom">
      <ToastHeader icon={toast.type}>{toast?.notification ?? "Notification"}</ToastHeader>
      <ToastBody>{toast.message}</ToastBody>
    </Toast>
  );
}

export default ToastMessage;
