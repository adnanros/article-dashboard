import React from 'react';
import { Article } from '../types';
import Button from './Button';

interface ArticleListProps {
  articles: Article[];
  onEdit?: (article: Article) => void;
  onDelete?: (id: number) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, onEdit, onDelete }) => {
  if (articles.length === 0) {
    return <p className="text-gray-500">No articles found.</p>;
  }

  return (
    <table className="w-full border-collapse mt-4">
      <thead>
        <tr className="text-left border-b border-gray-300">
          <th className="py-2 px-4">Title</th>
          <th className="py-2 px-4">Author</th>
          <th className="py-2 px-4">Status</th>
          <th className="py-2 px-4">Created</th>
          <th className="py-2 px-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {articles.map((article) => (
          <tr key={article.id} className="border-b hover:bg-gray-50">
            <td className="py-2 px-4">{article.title}</td>
            <td className="py-2 px-4">{article.author}</td>
            <td className="py-2 px-4">{article.status}</td>
            <td className="py-2 px-4">{new Date(article.createdAt).toLocaleDateString()}</td>
            <td className="py-2 px-4 text-right space-x-2">
              {onEdit && (
                <Button onClick={() => onEdit(article)} aria-label={`Edit ${article.title}`}>
                  ✏️
                </Button>
              )}
              {onDelete && (
                <Button onClick={() => onDelete(article.id)} aria-label={`Delete ${article.title}`}>
                  🗑️
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ArticleList;
