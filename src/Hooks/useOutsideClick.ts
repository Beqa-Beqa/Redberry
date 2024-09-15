import { useEffect } from "react"

const useOutsideClick = (ref: React.MutableRefObject<any>, action: () => void) => {
  // Rerun useffect on every ref change
  useEffect(() => {
    // Outside click handler
    // Detect if the given ref element is a part of event.target
    const handleOutsideClick = (event: any) => {
      if(ref.current && !ref.current.contains(event.target)) {
        // If not do the provided action
        action();
      }
    }

    // Add mousedown event listener to whole document
    document.addEventListener("mousedown", handleOutsideClick);

    // Remove listeners during unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [ref]);
}

export default useOutsideClick;