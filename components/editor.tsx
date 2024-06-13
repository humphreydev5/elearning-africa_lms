import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.snow.css";

/**
 * Props interface for the Editor component.
 */
interface EditorProps {
  onChange: (value: string) => void; // Callback function triggered on editor content change
  value: string; // Current value of the editor content
};

/**
 * Component for rendering a rich text editor.
 */
export const Editor = ({
  onChange,
  value,
}: EditorProps) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  return (
    <div className="bg-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
