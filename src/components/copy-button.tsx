"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cs } from "@/lib/cs";

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 10000);
  };

  return (
    <Button
      onClick={copy}
      className={cs(
        "m-1.5 border border-slate-700 bg-slate-950 p-2 duration-75 hover:border-slate-500 hover:bg-slate-800 dark:bg-slate-950 dark:hover:bg-slate-950 md:m-4",
        isCopied &&
          "border-green-500 bg-green-900 hover:border-green-500 hover:bg-green-900 dark:bg-green-900 dark:hover:bg-green-900",
      )}
    >
      {isCopied ? (
        <>
          <CheckIcon width={16} className="stroke-green-500" />
          <span className="sr-only">Copied</span>
        </>
      ) : (
        <>
          <CopyIcon width={16} className="stroke-gray-400" />
          <span className="sr-only">Copy</span>
        </>
      )}
    </Button>
  );
};
