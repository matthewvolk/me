import Image from "next/image";

import { env } from "@/lib/env.mjs";

export const GitHubAvatar = async () => {
  const response = await fetch("https://api.github.com/users/matthewvolk", {
    headers: { authorization: `bearer ${env.GITHUB_PAT}` },
  });

  const data = await response.json();

  return (
    <Image
      src={data.avatar_url}
      alt="GitHub Profile Picture"
      width={42}
      height={42}
      className="rounded-full bg-white"
    />
  );
};
