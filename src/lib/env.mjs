/* eslint-env es6 */

import { z } from "zod";

const server = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  GITHUB_PAT: z.string().min(1),
});

const client = z.object(
  /** @satisfies {Record<`NEXT_PUBLIC_${string}`, import('zod').ZodType>} */ ({}),
);

/**
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  GITHUB_PAT: process.env.GITHUB_PAT,
};

const merged = server.merge(client);

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env);

const skip =
  !!process.env.SKIP_ENV_VALIDATION &&
  process.env.SKIP_ENV_VALIDATION !== "false" &&
  process.env.SKIP_ENV_VALIDATION !== "0";
if (!skip) {
  const isServer = typeof window === "undefined";

  const parsed = /** @type {MergedSafeParseReturn} */ (
    isServer ? merged.safeParse(processEnv) : client.safeParse(processEnv)
  );

  if (parsed.success === false) {
    console.error(
      "[ERROR] Invalid environment variables:",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("Invalid environment variables");
  }

  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "[ERROR] Attempted to access a server-side environment variable on the client"
            : `[ERROR] Attempted to access server-side environment variable '${prop}' on the client`,
        );
      return target[/** @type {keyof typeof target} */ (prop)];
    },
  });
}

export { env };
