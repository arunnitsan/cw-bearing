"use client"; // Error components must be Client Components
import { useEffect } from "react";
export default function Error(props) {
  useEffect(() => {
    // Log the error to an error reporting service
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }, [props.error]);
  return;
}
