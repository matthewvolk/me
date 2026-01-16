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

  return (
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
  );
}
