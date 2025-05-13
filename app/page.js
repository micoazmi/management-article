'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Api from '@/lib/api'



export default  function HomePage() {

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
    const [articles, setArticles] = useState([]);
    useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await Api.get('/articles');
        setArticles(res.data.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white border-b shadow-sm py-4 px-6 flex justify-between items-center">
        <div className="font-bold text-blue-600 text-lg">Logoipsum</div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">John Doe</span>
          <img src="/avatar.png" alt="avatar" className="w-8 h-8 rounded-full" />
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white text-center py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-800">
          The Journal : Design Resources, Interviews, and Industry News
        </h1>
        <p className="mt-2 text-gray-600">Your daily dose of design insights!</p>

        {/* Filters */}
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          <select
            className="border px-4 py-2 rounded w-48"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="design">Design</option>
            <option value="security">Security</option>
          </select>

          <Input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
        </div>
      </section>

      {/* Article Grid */}
      <section className="px-4 max-w-6xl mx-auto py-8">
        <p className="mb-6 text-sm text-gray-500">
          Showing {articles.length} of {articles.length} articles
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded shadow overflow-hidden">
              <img src={article.imageUrl} alt={article.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <p className="text-sm text-gray-500">
                  {new Date(article.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <h2 className="text-lg font-semibold mt-1">{article.title}</h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{article.content}</p>
                <div className="mt-3 flex gap-2 flex-wrap">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {article.category.name}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {article.user.username}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center gap-2 text-sm">
          <Button variant="outline">Previous</Button>
          <Button variant="default">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">Next</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-center py-6 text-sm text-gray-500 mt-10 border-t">
        © 2025 Blog project. All rights reserved.
      </footer>
    </div>
  );
}
