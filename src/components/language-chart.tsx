import Link from "next/link";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { languages } from "@/lib/languages";

export const LanguageChart = async () => {
  const { total, langs } = await languages();

  return (
    <div className="flex overflow-hidden rounded-lg">
      {langs.map((lang) => (
        <TooltipProvider key={lang.lang} delayDuration={0}>
          <Dialog>
            <Tooltip>
              <DialogTrigger asChild>
                <TooltipTrigger
                  className="h-12 brightness-125 transition-all hover:brightness-200 focus:brightness-200"
                  style={{
                    backgroundColor: lang.color || "white",
                    width: `${lang.percent_of_total}%`,
                  }}
                ></TooltipTrigger>
              </DialogTrigger>
              <TooltipContent className="m-1 flex flex-col gap-1">
                <h3 className="font-medium">{lang.lang}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {lang.bytes} bytes
                </p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {lang.percent_of_total}%
                </p>
              </TooltipContent>
            </Tooltip>
            <DialogContent>
              <h3 className="text-lg font-medium">{lang.lang} Statistics</h3>
              <p className="leading-6 text-neutral-600 dark:text-neutral-400">
                Found{" "}
                <span className="font-medium text-black dark:text-white">
                  {lang.bytes}
                </span>{" "}
                bytes of {lang.lang} code across{" "}
                <span className="font-mono text-sm">matthewvolk</span>
                &apos;s{" "}
                <Link
                  href="https://github.com/matthewvolk?tab=repositories"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black underline decoration-1 underline-offset-2 dark:text-white"
                >
                  public repositories
                </Link>
                .
              </p>
              <p className="leading-6 text-neutral-600 dark:text-neutral-400">
                {lang.lang} accounts for{" "}
                <span className="font-medium text-black dark:text-white">
                  {lang.percent_of_total}%
                </span>{" "}
                of{" "}
                <span className="font-medium text-black dark:text-white">
                  {total}
                </span>{" "}
                total bytes of code found in{" "}
                <span className="font-mono text-sm">matthewvolk</span>
                &apos;s public repositories.
              </p>
            </DialogContent>
          </Dialog>
        </TooltipProvider>
      ))}
    </div>
  );
};
