import Swal from "sweetalert2";

const handleSuccess = () => {
  Swal.fire({
    icon: "success",
    title: "Account created!",
    text: "A verification email has been sent. Please check your inbox.",
  });
};

const handleError = (error) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: error.message || "Something went wrong!",
  });
};
const handleWarning = () => {
  Swal.fire({
    icon: "warning",
    title: "Email not verified",
    text: "Please check your inbox and verify your email before logging in.",
  });
};

const handleToast = (title, icon = "success") => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: icon,
    title: title
  });
};

export { handleError, handleSuccess, handleWarning, handleToast };
