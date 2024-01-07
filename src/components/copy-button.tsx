"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };

  return (
    <button
      className="m-2 rounded-md border border-gray-700 bg-gray-950 px-3 py-2 transition-all duration-100 hover:border-gray-500 hover:bg-gray-800"
      onClick={copy}
    >
      {isCopied ? (
        <>
          <CheckIcon className="stroke-green-500" width={18} />
          <span className="sr-only">Copied</span>
        </>
      ) : (
        <>
          <CopyIcon className="stroke-gray-400" width={18} />
          <span className="sr-only">Copy</span>
        </>
      )}
    </button>
  );
};
