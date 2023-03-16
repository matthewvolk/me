import type { NextPage } from 'next';
import Link from 'next/link';
import SEO from '../components/seo';
import path from 'path';
import { promises as fs } from 'fs';
import matter from 'gray-matter';
import Nav from '../components/nav';
import Footer from '../components/footer';
import Layout from '../components/layout';

const Blog: NextPage = ({ blogs }: any) => {
  return (
    <Layout>
      <SEO title="Blog" description="Recent Blog Posts" />
      <Nav />
      <main>
        <div>
          <h1 className="pt-8 pb-6 text-4xl font-extrabold">Blog Index</h1>
          {blogs.map((blog: any) => (
            <div
              key={blog.slug}
              className="flex flex-row content-center items-center py-2"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <Link href={blog.slug} className="flex flex-row">
                <p>
                  <span className="font-medium underline">{blog.title}</span>
                  <span className="ml-2 text-sm italic text-slate-500 no-underline">
                    <span className="mr-2">[{blog.published}]</span>
                    <span>[{blog.ttr.toString()} minute read]</span>
                  </span>
                </p>
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export async function getStaticProps() {
  const blogDirectory = path.join(process.cwd(), '_posts');
  const blogFileNames = await fs.readdir(blogDirectory);

  const blogFiles = blogFileNames.map((fileName) =>
    path.join(blogDirectory, fileName)
  );

  const blogData = await Promise.all(
    blogFiles.map(async (blogFile) => {
      const fileName = path.parse(blogFile).base;
      const postFileContent = await fs.readFile(blogFile, 'utf8');
      const { content, data } = matter(postFileContent);
      data.slug = '/blog/' + fileName.slice(0, -4);
      data.ttr = Math.ceil(content.split(' ').length / 200);
      return data;
    })
  );

  // Sort blogs in reverse chronological order (recent blog posts first)
  blogData.sort((a: any, b: any) => {
    return new Date(b.published).getTime() - new Date(a.published).getTime();
  });

  const blogs = blogData
    // Do not display drafts
    .filter((blog) => !blog.draft);

  return {
    props: { blogs },
  };
}

export default Blog;
