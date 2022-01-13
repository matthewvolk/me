import type { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import SEO from "../components/seo";
import Link from "next/link";
import styles from "../styles/home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faLinkedin,
  faJsSquare,
  faDocker,
  faHtml5,
  faBitbucket,
  faBootstrap,
  faCss3Alt,
  faDigitalOcean,
  faFigma,
  faGit,
  faGithubSquare,
  faNode,
  faNpm,
  faPhp,
  faPython,
  faReact,
  faSass,
  faYarn,
} from "@fortawesome/free-brands-svg-icons";
import { faCalendar, faClock, faUser } from "@fortawesome/free-solid-svg-icons";
import path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";
import Nav from "../components/nav";
import Footer from "../components/footer";

const Home: NextPage = ({ blogs }: any) => {
  return (
    <div>
      <SEO />
      <main className={styles.container}>
        <Nav />
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Hi.</h1>
          <div className={styles.heroText}>
            My name is Matt and I&apos;m a software developer living in Austin,
            TX. I&apos;m currently working at BigCommerce, a NASDAQ-listed
            ecommerce platform that provides a software as a service product to
            retailers.
          </div>
          <div className={styles.heroIcons}>
            <a
              href="https://github.com/matthewvolk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon className={styles.heroIcon} icon={faGithub} />
            </a>
            <a
              href="https://twitter.com/volkmatt"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon className={styles.heroIcon} icon={faLinkedin} />
            </a>
            <a
              href="https://twitter.com/volkmatt"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon className={styles.heroIcon} icon={faTwitter} />
            </a>
          </div>
        </div>
        <div className={styles.projectSection}>
          <h2>Projects</h2>
          <div className={styles.projects}>
            <Card
              title="BigReq"
              description="Node.js HTTP Request Library for BigCommerce"
              href="https://www.npmjs.com/package/bigreq"
              tags={['nodejs', 'npm', 'http', 'cli']}
            />
            <Card
              title="CalendarNotes"
              description="Small web application to generate meeting notes for your calendar events"
              href="https://github.com/matthewvolk/calendarnotes"
              tags={['expressjs', 'nextjs', 'oauth', 'docker']}
            />
          </div>
        </div>
        <div className={styles.blogSection}>
          <h2>Featured Articles</h2>
          {blogs.map((blog: any) => (
            <div key={blog.slug} className={styles.blog}>
              <Link href={blog.slug}>
                <a className={styles.blogLink}>
                  <h3 className={styles.blogTitle}>{blog.title}</h3>
                  <div className={styles.blogInfo}>
                    <div className={styles.blogInfoGroup}>
                      <FontAwesomeIcon
                        icon={faUser}
                        className={styles.blogInfoGroupIcon}
                      />
                      <p className={styles.blogInfoGroupText}>{blog.author}</p>
                    </div>
                    <div className={styles.blogInfoGroup}>
                      <FontAwesomeIcon
                        icon={faCalendar}
                        className={styles.blogInfoGroupIcon}
                      />
                      <p className={styles.blogInfoGroupText}>
                        {blog.published}
                      </p>
                    </div>
                    <div className={styles.blogInfoGroup}>
                      <FontAwesomeIcon
                        icon={faClock}
                        className={styles.blogInfoGroupIcon}
                      />
                      <p className={styles.blogInfoGroupText}>
                        {blog.ttr.toString()} minute read
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
          <Link href="/blog">
            <a className={styles.viewAllBlogs}>View All</a>
          </Link>
        </div>
        <div className={styles.techSection}>
          <h2>Technologies</h2>
          <div className={styles.techIcons}>
            <FontAwesomeIcon className={styles.icon} icon={faHtml5} />
            <FontAwesomeIcon className={styles.icon} icon={faCss3Alt} />
            <FontAwesomeIcon className={styles.icon} icon={faJsSquare} />
            <FontAwesomeIcon className={styles.icon} icon={faNode} />
            <FontAwesomeIcon className={styles.icon} icon={faNpm} />
            <FontAwesomeIcon className={styles.icon} icon={faPhp} />
            <FontAwesomeIcon className={styles.icon} icon={faPython} />
            <FontAwesomeIcon className={styles.icon} icon={faYarn} />
            <FontAwesomeIcon className={styles.icon} icon={faSass} />
            <FontAwesomeIcon className={styles.icon} icon={faReact} />
            <FontAwesomeIcon className={styles.icon} icon={faBootstrap} />
            <FontAwesomeIcon className={styles.icon} icon={faGit} />
            <FontAwesomeIcon className={styles.icon} icon={faGithubSquare} />
            <FontAwesomeIcon className={styles.icon} icon={faBitbucket} />
            <FontAwesomeIcon className={styles.icon} icon={faDocker} />
            <FontAwesomeIcon className={styles.icon} icon={faDigitalOcean} />
            <FontAwesomeIcon className={styles.icon} icon={faFigma} />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const blogDirectory = path.join(process.cwd(), "_posts");
  let blogFileNames = await fs.readdir(blogDirectory);

  const blogFiles = blogFileNames.map((fileName) =>
    path.join(blogDirectory, fileName)
  );

  const blogData = await Promise.all(
    blogFiles.map(async (blogFile) => {
      const fileName = path.parse(blogFile).base;
      const postFileContent = await fs.readFile(blogFile, "utf8");
      const { content, data } = matter(postFileContent);
      data.slug = "/blog/" + fileName.slice(0, -4);
      data.ttr = Math.ceil(content.split(" ").length / 200);
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
