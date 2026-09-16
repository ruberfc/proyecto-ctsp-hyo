import React from 'react';

interface ContentCardProps {
  children: React.ReactNode;
  className?: string; // Optional: Allow passing additional classes
}

const ContentCard: React.FC<ContentCardProps> = ({ children }) => {
  return (
    <div className={`min-h-screen bg-white dark:bg-[#15233c] rounded-lg shadow-md`}>
      <div className="p-3">
        {children}
      </div>
    </div>
  );
};

export default ContentCard; 