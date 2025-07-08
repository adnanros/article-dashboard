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

const Home: React.FC = () => {
  const { articles, setArticles } = useArticleContext();
  const [filtered, setFiltered] = useState<Article[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Article>>({});
  const [isEditing, setIsEditing] = useState(false);

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
  }, [search, status, articles]);

  //Packaging Fetching Articles
  const fetchArticles = async () => {
    const res = await fetch('/api/articles');
    const data = await res.json();
    setArticles(data.articles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.status) return;

    const now = new Date().toISOString();
    if (isEditing && formData.id !== undefined) {
      await fetch(`/api/articles/${formData.id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
      });
    } else {
      await fetch('/api/articles', {
        method: 'POST',
        body: JSON.stringify({ ...formData, createdAt: now }),
      });
    }

    fetchArticles();
    setModalOpen(false);
    setFormData({});
    setIsEditing(false);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/articles/${id}`, {
      method: 'DELETE',
    });
    fetchArticles();
  };

  const openEditModal = (article: Article) => {
    setFormData(article);
    setIsEditing(true);
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <Header />\
       <div className="flex justify-between items-center">
        <RoleSwitcher />
        <AddArticleButton onClick={() => setModalOpen(true)} />
      </div>
      <h1 className="text-2xl font-bold mb-4">Articles</h1>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          options={["Draft", "Published"]}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        {/* <Button onClick={() => setModalOpen(true)}>Add Article</Button> */}
      </div>

      <ul className="space-y-2">
        {filtered.map((article) => (
          <li key={article.id} className="p-4 border rounded flex justify-between">
            <div>
              <h2 className="font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-600">By {article.author} | {article.status}</p>
            </div>
            <div>
              <Button onClick={() => openEditModal(article)}>Edit</Button>
              <Button onClick={() => handleDelete(article.id)} className="bg-red-600 hover:bg-red-700">
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit' : 'Add'} Article</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Title"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <Input
            label="Author"
            value={formData.author || ''}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
          <Select
            label="Status"
            options={["Draft", "Published"]}
            value={formData.status || ''}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Draft' | 'Published' })}
            required
          />
          <Button type="submit">{isEditing ? 'Update' : 'Create'}</Button>
        </form>
      </Modal>
    </div>
  );
};

export default Home;