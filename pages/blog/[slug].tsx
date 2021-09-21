import path from "path";
import { promises as fs } from "fs";
import Nav from "../../components/nav";
import styles from "../../styles/blog.module.scss";

const Post = () => {
  return (
    <div className={styles.container}>
      <Nav />
      <h1 className={styles.postTitle}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit!
      </h1>
      <p className={styles.postMeta}>by Matthew Volk on 11.12.22</p>
      <p className={styles.postMeta}>6 min read</p>
      <div className={styles.postContentContainer}>
        <p className={styles.postContent}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti quo
          voluptate fuga tenetur fugit blanditiis accusantium praesentium,
          voluptas magnam laboriosam officia nulla. Magnam labore beatae
          inventore nulla minus porro? Odio?
        </p>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const blogDirectory = path.join(process.cwd(), "_posts");
  const fileNames = await fs.readdir(blogDirectory);

  const allSlugs = fileNames.map((filename) => {
    const slug = `${filename.substring(0, filename.length - 4)}`;
    return slug;
  });

  const slugs = allSlugs.filter((slug) => {
    return slug !== undefined;
  });

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps() {
  return { props: {} };
}

export default Post;
