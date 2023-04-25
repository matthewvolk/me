import Link from "next/link";

export const Nav: React.FC = () => {
  return (
    <nav>
      <Link href="/" className="font-bold text-xl text-sky-700 underline">
        volk
      </Link>
    </nav>
  );
};
