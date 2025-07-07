import React, { createContext, useContext, useEffect, useState } from 'react';
import { Article } from '../types';

interface ArticleContextType {
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const useArticleContext = () => {
  const context = useContext(ArticleContext);
  if (!context) throw new Error('useArticleContext must be used within ArticleProvider');
  return context;
};

export const ArticleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  return (
    <ArticleContext.Provider value={{ articles, setArticles }}>
      {children}
    </ArticleContext.Provider>
  );
};