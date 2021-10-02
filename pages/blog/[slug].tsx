import path from "path";
import { promises as fs } from "fs";
import Nav from "../../components/nav";
import styles from "../../styles/post.module.scss";
import Footer from "../../components/footer";
import { GetStaticPropsContext } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import matter from "gray-matter";
import Highlight, { defaultProps } from "prism-react-renderer";
import rangeParser from "parse-numeric-range";
import Image from "next/image";
import SEO from "../../components/seo";
const imageSize = require("rehype-img-size");

const components = {
  h1: (props: any) => <h1 className={styles.postTitle}>{props.children}</h1>,
  h2: (props: any) => <h2 className={styles.h2}>{props.children}</h2>,
  h3: (props: any) => <h3 className={styles.h3}>{props.children}</h3>,
  h4: (props: any) => <h4 className={styles.h4}>{props.children}</h4>,
  h5: (props: any) => <h5 className={styles.h5}>{props.children}</h5>,
  h6: (props: any) => <h6 className={styles.h6}>{props.children}</h6>,
  p: (props: any) => <p className={styles.postContent}>{props.children}</p>,
  img: (props: any) => (
    <div className={styles.img}>
      <Image {...props} alt={props.alt} />
    </div>
  ),
  a: (props: any) => {
    return (
      <a
        href={props.href}
        className={styles.postLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {props.children}
      </a>
    );
  },
  pre: (props: any) => {
    const meta = props.children.props.className;

    let language: any = meta && meta.substr(meta.indexOf("-") + 1, meta.length);
    language && language.indexOf(":") !== -1
      ? (language = language.substr(0, language.indexOf(":")))
      : language;

    let linesToHighlight: any;
    if (/{([\d,-]+)}/.test(props.children.props.metastring)) {
      linesToHighlight = /{([\d,-]+)}/.exec(
        props.children.props.metastring
      )![1];
    }
    linesToHighlight
      ? (linesToHighlight = rangeParser(linesToHighlight))
      : linesToHighlight;

    let fileName =
      meta && meta.indexOf("=") !== -1
        ? meta.substr(meta.indexOf("=") + 1, meta.length)
        : null;

    return (
      <Highlight
        {...defaultProps}
        theme={undefined}
        code={props.children.props.children.slice(0, -1)}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div>
            {fileName && (
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 52, 0.75)",
                  padding: "1em 1em 1em 1em",
                  fontFamily: "monospace",
                  fontSize: "1rem",
                  borderRadius: "8px 8px 0 0",
                  color: "#f8f8ff",
                }}
              >
                &#47;&#47; {fileName}
              </div>
            )}
            <pre
              className={className}
              style={{
                // padding: "1rem",
                overflowX: "auto",
                marginTop: fileName ? "0" : "",
                borderRadius: fileName ? "0 0 8px 8px" : "8px",
              }}
            >
              {language && (
                <div
                  style={{
                    margin: "-1rem 1rem 1rem 0rem",
                    padding: "0.25rem 0.5rem",
                    backgroundColor: "rgb(247, 223, 30)",
                    color: "#000034",
                    fontSize: "12px",
                    borderRadius: "0px 0px 0.25rem 0.25rem",
                    position: "absolute",
                    letterSpacing: "0.025rem",
                    textTransform: "uppercase",
                  }}
                >
                  {language}
                </div>
              )}
              {language && <div style={{ marginBottom: "1.65rem" }} />}
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line, key: i })}
                  style={{
                    display: "table-row",
                    // lineHeight: "1.45rem",
                    backgroundColor: linesToHighlight
                      ? linesToHighlight.includes(i + 1)
                        ? "rgba(248, 248, 255, 0.25)"
                        : ""
                      : "",
                  }}
                >
                  <span
                    style={{
                      display: "table-cell",
                      textAlign: "right",
                      paddingRight: "1rem",
                      userSelect: "none",
                      opacity: "0.5",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      display: "table-cell",
                      width: "100%",
                    }}
                  >
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        )}
      </Highlight>
    );
  },
};

const Post = ({ source, frontMatter }: any) => {
  return (
    <div className={styles.font}>
      <SEO title={frontMatter.title} />
      <Nav />
      <div className={styles.container}>
        <h1 className={styles.postTitle}>{frontMatter.title}</h1>
        <p className={styles.postMeta}>
          By {frontMatter.author} on {frontMatter.published}
        </p>
        {frontMatter.updated && (
          <p className={styles.postMeta}>Updated {frontMatter.updated}</p>
        )}
        <p className={styles.postMeta}>{frontMatter.ttr} min read</p>
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
  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: { rehypePlugins: [[imageSize, { dir: "public" }]] },
  });
  data.ttr = Math.ceil(content.split(" ").length / 200);

  return { props: { source: mdxSource, frontMatter: data } };
}

export default Post;
