import Link from 'next/link';

const Nav = () => {
  return (
    <header className="py-8">
      <nav className="flex flex-row justify-between items-center content-center">
        <Link href="/">
          <a className="text-3xl font-extrabold flex flex-row items-center content-center hover:text-slate-900/90">
            <svg
              className="w-8 h-8 -mb-1 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              ></path>
            </svg>
            volk
          </a>
        </Link>

        <div>
          <a
            href="mailto:matt@volk.dev"
            target="_blank"
            rel="noreferrer"
            className="text-white bg-slate-900 hover:bg-slate-900/90 focus:ring-4 focus:outline-none focus:ring-slate-900/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center "
          >
            <svg
              className="mr-2 -ml-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
