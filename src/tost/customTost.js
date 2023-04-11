import { toast } from "react-toastify";
// import { css } from "glamor";

const customToast = {
  success(msg, options = {}) {
    return toast.success(msg, {
      ...options,
      className: "tost-success",
    });
  },
  error(msg, options = {}) {
    return toast.error(msg, {
      ...options,
      className: "tost-error",
    });
  },
};

export default customToast;
