import React, { useEffect, useState } from 'react';
import { useArticleContext } from '../context/ArticleContext';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import { Article } from '../types';
import Header from '../components/Header';
import AddArticleButton from '../components/AddArticleButton';
import RoleSwitcher from '../components/RoleSwitcher';
import ArticleForm from '../components/ArticleForm';

const PAGE_SIZE = 5;

const Home: React.FC = () => {
  const { articles, setArticles } = useArticleContext();
  const [filtered, setFiltered] = useState<Article[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    const filteredData = articles.filter(article => {
      return (
        article.title.toLowerCase().includes(search.toLowerCase()) &&
        (status === '' || article.status === status)
      );
    });
    setFiltered(filteredData);
    setCurrentPage(1);
  }, [search, status, articles]);

  const fetchArticles = async () => {
    const res = await fetch('/api/articles');
    const data = await res.json();
    setArticles(data.articles);
  };

  const handleFormSubmit = async (data: Partial<Article>) => {
    const now = new Date().toISOString();
    if (data.id !== undefined) {
      await fetch(`/api/articles/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } else {
      await fetch('/api/articles', {
        method: 'POST',
        body: JSON.stringify({ ...data, createdAt: now }),
      });
    }

    await fetchArticles();
    setModalOpen(false);
    setEditingArticle(null);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/articles/${id}`, {
      method: 'DELETE',
    });
    fetchArticles();
  };

  const openEditModal = (article: Article) => {
    setEditingArticle(article);
    setModalOpen(true);
  };

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="p-6">
      <Header />
      <div className="flex justify-between items-center">
        <RoleSwitcher />
        <AddArticleButton
          onClick={() => {
            setEditingArticle(null);
            setModalOpen(true);
          }}
        />
      </div>
      <h1 className="text-2xl font-bold mb-4">Articles</h1>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          options={['Draft', 'Published']}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>

      <ul className="space-y-2">
        {paginated.map(article => (
          <li key={article.id} className="p-4 border rounded flex justify-between">
            <div>
              <h2 className="font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-600">
                By {article.author} | {article.status}
              </p>
            </div>
            <div>
              <Button onClick={() => openEditModal(article)}>Edit</Button>
              <Button
                onClick={() => handleDelete(article.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            Prev
          </button>
          <span className="self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            Next
          </button>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">
          {editingArticle ? 'Edit' : 'Add'} Article
        </h2>
        <ArticleForm
          initialData={editingArticle || {}}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </div>
  );
};

export default Home;
