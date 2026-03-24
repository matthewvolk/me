import { DownloadCloud, ExternalLink, Star } from "lucide-react";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { DateChip } from "@/components/date-chip";

export async function BigRequestStars() {
  "use cache";
  cacheLife("hours");

  const response = await fetch(
    "https://api.github.com/repos/matthewvolk/bigrequest",
    {
      headers: { authorization: `bearer ${process.env.GITHUB_PAT}` },
    },
  );
  const data = await response.json();

  if (typeof data.stargazers_count !== "number") {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <Star size={16} />
      <span>{Intl.NumberFormat().format(data.stargazers_count)}</span>
    </div>
  );
}

export async function BigRequestDownloads() {
  "use cache";
  cacheLife("hours");

  const response = await fetch(
    "https://api.npmjs.org/downloads/point/last-year/bigrequest",
  );
  const data = await response.json();

  return (
    <div className="flex items-center gap-2 text-sm">
      <DownloadCloud size={16} />
      <span>{Intl.NumberFormat().format(data.downloads)}</span>
    </div>
  );
}

export async function BigRequestLatestVersion() {
  "use cache";
  cacheLife("hours");

  const response = await fetch(
    "https://api.github.com/repos/matthewvolk/bigrequest/releases/latest",
    {
      headers: { authorization: `bearer ${process.env.GITHUB_PAT}` },
    },
  );
  const latest = await response.json();

  if (!latest.published_at || !latest.tag_name) {
    return null;
  }

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold">Changelog</h2>
        <span className="relative flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative left-1 top-1 inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
      </div>
      <Link
        className="flex flex-col rounded-md p-4 -mx-4 hover:bg-accent"
        href="https://www.npmjs.com/package/bigrequest"
        target="_blank"
      >
        <DateChip date={latest.published_at} className="pb-1" />
        <div className="flex font-semibold items-center gap-2">
          <span>BigRequest {latest.tag_name} released!</span>
          <ExternalLink size={14} />
        </div>
      </Link>
    </section>
  );
}
