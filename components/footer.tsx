const Footer = () => {
  return (
    <footer className="flex flex-row justify-around py-8 lg:py-16">
      <p className="text-slate-500">
        &copy; {new Date().getFullYear()} Volk Development
      </p>
    </footer>
  );
};
export default Footer;
