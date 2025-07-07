import React, { useEffect, useState } from 'react';
import { useArticleContext } from '../context/ArticleContext';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import Modal from '../components/Modal';
import ArticleList from '../components/ArticleList';

const Home: React.FC = () => {
  const { articles, setArticles } = useArticleContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data) => setArticles(data.articles))
      .catch(() => setError('Failed to load articles'))
      .finally(() => setLoading(false));
  }, [setArticles]);

  const filtered = articles.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter ? article.status === statusFilter : true)
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          label="Search"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          label="Status"
          options={['Draft', 'Published']}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
        <Button onClick={() => setShowModal(true)}>+ Add Article</Button>
      </div>

      {loading && <p>Loading articles...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ArticleList articles={filtered} />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {/* AddArticleForm or EditArticleForm */}
        <p>Form goes here...</p>
      </Modal>
    </div>
  );
};

export default Home;
