import { Skeleton } from "@/components/ui/skeleton";

export const OSSCardLoading = () => (
  <li className="h-56 w-full rounded-lg border border-neutral-300 p-4 dark:border-neutral-800 md:h-[12.9rem]">
    <div className="flex items-center justify-between">
      <Skeleton className="h-6 w-36" />
      <div className="flex gap-6">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
    <Skeleton className="my-4 h-24 w-full md:h-20" />
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
    </div>
  </li>
);
