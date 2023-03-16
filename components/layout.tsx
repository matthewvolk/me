import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-full min-h-screen bg-slate-50 text-slate-900">
      <div className="container mx-auto px-8">{children}</div>
    </div>
  );
};
export default Layout;
