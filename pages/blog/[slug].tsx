import path from "path";
import { promises as fs } from "fs";
import Nav from "../../components/nav";
import styles from "../../styles/blog.module.scss";
import Footer from "../../components/footer";
import { GetStaticPropsContext } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import matter from "gray-matter";

const components = {
  h1: (props: any) => <h1 className={styles.postTitle}>{props.children}</h1>,
  p: (props: any) => <p className={styles.postContent}>{props.children}</p>,
};

const Post = ({ source, frontMatter }: any) => {
  return (
    <div className={styles.font}>
      <Nav />
      <div className={styles.container}>
        <div className={styles.postContentContainer}>
          <MDXRemote {...source} components={components} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const blogPostsDirectoryPath = path.join(process.cwd(), "_posts");
  const blogPostFileNames = await fs.readdir(blogPostsDirectoryPath);

  const allSlugs = blogPostFileNames.map((filename) => {
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

export async function getStaticProps({ params }: GetStaticPropsContext) {
  let fileToFind: string;
  if (params) {
    if (typeof params.slug === "string") {
      fileToFind = params.slug + ".mdx";
    } else if (Array.isArray(params.slug)) {
      fileToFind = params.slug[0] + ".mdx";
    } else {
      fileToFind = "";
    }
  } else {
    fileToFind = "";
  }

  const blogPostsDirectoryPath = path.join(process.cwd(), "_posts");
  const blogPostFileNames = await fs.readdir(blogPostsDirectoryPath);

  const postFileName = blogPostFileNames.find((file) => file === fileToFind);
  const pathToPostFileName = path.join(blogPostsDirectoryPath, postFileName!);
  const postFileContent = await fs.readFile(pathToPostFileName, "utf8");
  const { content, data } = matter(postFileContent);
  const mdxSource = await serialize(content, { scope: data });

  return { props: { source: mdxSource, frontMatter: data } };
}

export default Post;
