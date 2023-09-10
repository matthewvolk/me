"use client";

import { PropsWithChildren } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";

export const BigRequestCodeSampleDialog = ({ children }: PropsWithChildren) => {
  const content = `product: {
  id: number;
  name: string;
  type: "physical" | "digital";
  sku?: string;
  description?: string;
  weight: number;
  width?: number;
  depth?: number;
  height?: number;
  price: number;
  cost_price?: number;
  retail_price?: number;
  // etc.
}`;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="font-mono font-semibold text-slate-950 dark:text-white">
          `product`
        </DialogHeader>
        <DialogDescription>
          <pre className="font-mono font-semibold text-slate-700 dark:text-slate-200">
            {content}
          </pre>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
