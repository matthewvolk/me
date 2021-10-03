import Link from "next/link";
import styles from "../styles/nav.module.scss";

const Nav = () => {
  const contactMe = (event: any) => {
    event.preventDefault();
    window.open("mailto:matt@volk.dev", "_blank");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/">
          <a className={styles.logoLink}>
            <div className={styles.logo}>volk.</div>
          </a>
        </Link>

        <div>
          <button onClick={contactMe} className={styles.button}>
            Contact Me
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
