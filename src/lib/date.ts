import { type Blog } from "contentlayer/generated";

export const formatDate = (input: string | number) => {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const descending = (a: Blog, b: Blog) =>
  (b.updated
    ? new Date(b.updated).valueOf()
    : new Date(b.published).valueOf()) -
  (a.updated ? new Date(a.updated).valueOf() : new Date(a.published).valueOf());
