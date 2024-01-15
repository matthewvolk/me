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
    <div className="px-2 py-1.5">
      <button
        className={`mt-0.5 rounded-lg bg-[#0E1116] px-3 py-2 transition-all duration-100 hover:bg-gray-800 ${
          isCopied && "bg-green-950 hover:bg-green-950"
        }`}
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
    </div>
  );
};
