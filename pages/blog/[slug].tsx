import path from 'path';
import { promises as fs } from 'fs';
import Nav from '../../components/nav';
import Footer from '../../components/footer';
import { GetStaticPropsContext } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import matter from 'gray-matter';
import Highlight, { defaultProps } from 'prism-react-renderer';
import rangeParser from 'parse-numeric-range';
import Image from 'next/image';
import SEO from '../../components/seo';
import Layout from '../../components/layout';
const imageSize = require('rehype-img-size');

const components = {
  h1: (props: any) => (
    <h1 className="my-4 text-4xl font-extrabold lg:my-6 lg:text-5xl">
      {props.children}
    </h1>
  ),
  h2: (props: any) => (
    <h2 className="my-3 text-3xl font-bold lg:my-5 lg:text-4xl">
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 className="my-2 text-2xl font-semibold lg:my-4 lg:text-3xl">
      {props.children}
    </h3>
  ),
  h4: (props: any) => (
    <h4 className="my-2 text-xl font-medium lg:my-4 lg:text-2xl">
      {props.children}
    </h4>
  ),
  h5: (props: any) => (
    <h5 className="my-2 text-lg font-medium lg:my-4 lg:text-xl">
      {props.children}
    </h5>
  ),
  h6: (props: any) => (
    <h6 className="my-2 text-base font-medium lg:my-4 lg:text-lg">
      {props.children}
    </h6>
  ),
  p: (props: any) => <p className="my-2 lg:my-3">{props.children}</p>,
  img: (props: any) => (
    <div>
      <Image {...props} alt={props.alt} />
    </div>
  ),
  kbd: (props: any) => (
    // <kbd className="text-sm p-1 break-words rounded bg-slate-900 text-slate-200">
    <kbd className="rounded border border-slate-200 bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-800">
      {props.children}
    </kbd>
  ),
  pre: (props: any) => {
    const meta = props.children.props.className;

    let language: any = meta && meta.substr(meta.indexOf('-') + 1, meta.length);
    language && language.indexOf(':') !== -1
      ? (language = language.substr(0, language.indexOf(':')))
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

    const fileName =
      meta && meta.indexOf('=') !== -1
        ? meta.substr(meta.indexOf('=') + 1, meta.length)
        : null;

    return (
      <Highlight
        {...defaultProps}
        theme={undefined}
        code={props.children.props.children.slice(0, -1)}
        language={language}
      >
        {({ tokens, getLineProps, getTokenProps }) => (
          <div>
            <pre className="my-5 overflow-auto whitespace-pre rounded-lg bg-slate-900 p-4 text-left text-sm leading-6 text-slate-50">
              {language && (
                <div className="absolute -mt-4 mr-4 mb-4 ml-0 rounded-b-lg bg-yellow-300 p-4 py-1 px-2 font-mono text-xs text-slate-900">
                  {fileName ? fileName : language}
                </div>
              )}
              {language && <div className="mb-5" />}
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line, key: i })}
                  className={`${
                    linesToHighlight &&
                    linesToHighlight.includes(i + 1) &&
                    'bg-slate-700/75'
                  }`}
                >
                  <span className="table-cell select-none pr-4 text-right opacity-50">
                    {i + 1}
                  </span>
                  <span className="table-cell w-full">
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
    <Layout>
      <SEO
        title={frontMatter.title}
        description={frontMatter.abstract}
        image={frontMatter.image}
        imageAlt={frontMatter.imageAlt}
        type="article"
      />
      <Nav />
      <div className="mx-auto max-w-screen-md">
        <h1 className="my-4 text-4xl font-extrabold leading-tight text-slate-900 lg:my-6 lg:text-5xl">
          {frontMatter.title}
        </h1>
        <p className="text-sm text-slate-500">
          By {frontMatter.author} on {frontMatter.published}
        </p>
        {frontMatter.updated && (
          <p className="text-sm text-slate-500">
            Updated {frontMatter.updated}
          </p>
        )}
        <p className="text-sm text-slate-500">{frontMatter.ttr} min read</p>
        <div>
          <MDXRemote {...source} components={components} />
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const blogPostsDirectoryPath = path.join(process.cwd(), '_posts');
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
    if (typeof params.slug === 'string') {
      fileToFind = params.slug + '.mdx';
    } else if (Array.isArray(params.slug)) {
      fileToFind = params.slug[0] + '.mdx';
    } else {
      fileToFind = '';
    }
  } else {
    fileToFind = '';
  }

  const blogPostsDirectoryPath = path.join(process.cwd(), '_posts');
  const blogPostFileNames = await fs.readdir(blogPostsDirectoryPath);

  const postFileName = blogPostFileNames.find((file) => file === fileToFind);
  const pathToPostFileName = path.join(blogPostsDirectoryPath, postFileName!);
  const postFileContent = await fs.readFile(pathToPostFileName, 'utf8');
  const { content, data } = matter(postFileContent);
  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: { rehypePlugins: [[imageSize, { dir: 'public' }]] },
  });
  data.ttr = Math.ceil(content.split(' ').length / 200);

  return { props: { source: mdxSource, frontMatter: data } };
}

export default Post;
