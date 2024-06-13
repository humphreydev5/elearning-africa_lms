"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.bubble.css";

/**
 * Component for rendering a preview of rich text content using ReactQuill.
 */
interface PreviewProps {
  /** The rich text content to be previewed */
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  // Dynamically import ReactQuill to prevent server-side rendering (SSR) issues
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  return (
    <ReactQuill
      theme="bubble"
      value={value}
      readOnly
    />
  );
};
