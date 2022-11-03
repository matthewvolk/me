import path from 'path';
import { promises as fs } from 'fs';
import type { NextPage } from 'next';
import Link from 'next/link';
import matter from 'gray-matter';
import SEO from '../components/seo';
import Nav from '../components/nav';
import Footer from '../components/footer';
import Layout from '../components/layout';

const Home: NextPage = ({ blogs }: any) => {
  return (
    <Layout>
      <SEO />
      <Nav />
      <main>
        <section>
          <div className="pt-8 pb-6 px-4 lg:pb-8 lg:pt-10 lg:px-12 mx-auto max-w-screen-xl text-center">
            <div
              className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-slate-700 bg-slate-100 rounded-full cursor-default"
              role="alert"
            >
              <span className="text-xs bg-slate-900 rounded-full text-white px-4 py-1.5 mr-3">
                New
              </span>{' '}
              <span className="text-sm font-medium">
                Please enjoy the redesign!
              </span>
              <svg
                className="ml-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-slate-900 md:text-5xl lg:text-6xl">
              Software that solves hard problems
            </h1>
            <p className="mb-8 text-lg font-normal text-slate-500 lg:text-xl sm:px-16 xl:px-48">
              I build software solutions that ease the transition for
              traditional brick-and-mortar businesses to sell their products and
              services online.
            </p>
            <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <a
                href="mailto:matt@volk.dev?subject=I'd%20like%20to%20chat%20about%20a%20project!&body=Quick%20Project%20Description%3A%0D%0A%0D%0A%0D%0AEstimated%20Budget%3A"
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-slate-900 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300"
              >
                Get a Quote
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="https://github.com/matthewvolk"
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-slate-900 rounded-lg border border-slate-300 hover:bg-slate-100 focus:ring-4 focus:ring-slate-100"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 -ml-1 w-5 h-5"
                >
                  <path d="M7.975 16a9.39 9.39 0 003.169-.509c-.473.076-.652-.229-.652-.486l.004-.572c.003-.521.01-1.3.01-2.197 0-.944-.316-1.549-.68-1.863 2.24-.252 4.594-1.108 4.594-4.973 0-1.108-.39-2.002-1.032-2.707.1-.251.453-1.284-.1-2.668 0 0-.844-.277-2.77 1.032A9.345 9.345 0 008 .717c-.856 0-1.712.113-2.518.34C3.556-.24 2.712.025 2.712.025c-.553 1.384-.2 2.417-.1 2.668-.642.705-1.033 1.612-1.033 2.707 0 3.852 2.342 4.72 4.583 4.973-.29.252-.554.692-.642 1.347-.58.264-2.027.692-2.933-.831-.19-.302-.756-1.045-1.549-1.032-.843.012-.34.478.013.667.428.239.919 1.133 1.032 1.422.201.567.856 1.65 3.386 1.184 0 .55.006 1.079.01 1.447l.003.428c0 .265-.189.567-.692.479 1.007.34 1.926.516 3.185.516z"></path>
                </svg>
                Browse GitHub
              </a>
            </div>
          </div>
        </section>

        <section>
          <div className="pb-8 pt-6 px-4 lg:pt-8 lg:pb-16 lg:px-6 mx-auto max-w-screen-xl">
            <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
              <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-slate-900">
                Stuff to Read
              </h2>
              <p className="font-light text-slate-500 sm:text-xl">
                Musings from the mind of an engineer who needs to work on
                writing blog posts more frequently.
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              {blogs.map((blog: any) => (
                <article
                  key={blog.slug}
                  className="p-6 bg-white rounded-lg border border-slate-200 shadow-md"
                >
                  <div className="flex justify-between items-center mb-5 text-slate-500">
                    <span className="bg-slate-100 text-slate-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
                      <svg
                        className="mr-1 w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Tutorial
                    </span>
                    <span className="text-sm">
                      {blog.ttr.toString()} minute read
                    </span>
                  </div>
                  <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">
                    <Link href={blog.slug}>
                      <a>{blog.title}</a>
                    </Link>
                  </h2>
                  <p className="mb-5 font-light text-slate-500">
                    {blog.abstract}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">{blog.author}</span>
                    </div>
                    <Link href={blog.slug}>
                      <a className="inline-flex items-center font-medium text-slate-600 hover:underline">
                        Read more
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </a>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
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

  // Sort blogData in reverse chronological order (recent blog posts first)
  blogData.sort((a: any, b: any) => {
    return new Date(b.published).getTime() - new Date(a.published).getTime();
  });

  const blogs = blogData
    // Do not display drafts
    .filter((blog) => !blog.draft)
    // Show only featured blogs
    .filter((blog) => blog.featured);

  return {
    props: { blogs },
  };
}

export default Home;
