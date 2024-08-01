import { createPortal } from "react-dom";

const ModalContainer2 = ({ children }) => {
  return createPortal(<>{children}</>, document.getElementById("modal2"));
};

export default ModalContainer2;