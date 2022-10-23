import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-slate-50 text-slate-900 h-full min-h-screen">
      <div className="container mx-auto px-8">{children}</div>
    </div>
  );
};
export default Layout;
