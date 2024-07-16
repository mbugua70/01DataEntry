import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, onClose }) {
  const dialog = useRef(null); // Initialize useRef with null

  useEffect(() => {
    const modal = dialog.current;

    if (modal) {
      modal.showModal(); // Show the modal dialog if supported
    }

    // Clean-up function to close the modal
    return () => {
      if (modal) {
        modal.close(); // Close the modal dialog if supported
      }
    };
  }, []); // Empty dependency array for mount/unmount effect

  // Render the modal using createPortal
  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById("modal") // Ensure this matches your HTML structure
  );
}
