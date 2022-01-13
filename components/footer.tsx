import styles from '../styles/footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      &copy; {new Date().getFullYear()}, Matthew Volk
    </footer>
  );
};
export default Footer;
