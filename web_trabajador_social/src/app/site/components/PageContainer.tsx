import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-32 md:pt-32">
      {children}
    </div>
  );
};

export default PageContainer; 