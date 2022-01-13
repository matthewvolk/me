import type {NextPage} from 'next';
import Link from 'next/link';
import styles from '../styles/blog.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SEO from '../components/seo';
import {faCalendar, faClock, faUser} from '@fortawesome/free-solid-svg-icons';
import path from 'path';
import {promises as fs} from 'fs';
import matter from 'gray-matter';
import Nav from '../components/nav';
import Footer from '../components/footer';

const Blog: NextPage = ({blogs}: any) => {
  return (
    <div>
      <SEO title="Blog" description="Recent Blog Posts" />
      <main className={styles.container}>
        <Nav />
        <div className={styles.blogSection}>
          <h1>Latest Blog Posts</h1>
          {blogs.map((blog: any) => (
            <div key={blog.slug} className={styles.blog}>
              <Link href={blog.slug}>
                <a className={styles.blogLink}>
                  <h3 className={styles.blogTitle}>{blog.title}</h3>
                  <div className={styles.blogInfo}>
                    <div className={styles.blogInfoGroup}>
                      <FontAwesomeIcon icon={faUser} className={styles.blogInfoGroupIcon} />
                      <p className={styles.blogInfoGroupText}>{blog.author}</p>
                    </div>
                    <div className={styles.blogInfoGroup}>
                      <FontAwesomeIcon icon={faCalendar} className={styles.blogInfoGroupIcon} />
                      <p className={styles.blogInfoGroupText}>{blog.published}</p>
                    </div>
                    <div className={styles.blogInfoGroup}>
                      <FontAwesomeIcon icon={faClock} className={styles.blogInfoGroupIcon} />
                      <p className={styles.blogInfoGroupText}>{blog.ttr.toString()} minute read</p>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const blogDirectory = path.join(process.cwd(), '_posts');
  const blogFileNames = await fs.readdir(blogDirectory);

  const blogFiles = blogFileNames.map(fileName => path.join(blogDirectory, fileName));

  const blogData = await Promise.all(
    blogFiles.map(async blogFile => {
      const fileName = path.parse(blogFile).base;
      const postFileContent = await fs.readFile(blogFile, 'utf8');
      const {content, data} = matter(postFileContent);
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
    .filter(blog => !blog.draft);

  return {
    props: {blogs},
  };
}

export default Blog;
