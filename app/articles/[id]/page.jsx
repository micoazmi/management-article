'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import Navbar2 from '@/app/navbar/navbar2';
import Footer from '@/app/footer/footer';
import ArticleCard from '@/app/component/ArticleCard';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [otherArticles, setOtherArticles] = useState([]);
 const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");
        const res = await api.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;
        console.log(data);
        setUser( data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      }
    }
    async function fetchData() {
      try {
        const res = await api.get(`/articles/${id}`);
        setArticle(res.data);

        const all = await api.get('/articles');
        const others = all.data.data.filter((a) => a.id !== id).slice(0, 3);
        setOtherArticles(others);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    }
    fetchUser()
    if (id) fetchData();
  }, [id]);

  if (!article) return <p className="text-center mt-10">Loading article...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar2 user={user} setUser={setUser} />

      <main className="flex-grow">
        {article.imageUrl && (
          <div className="w-full h-96 relative">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="max-w-3xl mx-auto p-6">
          <p className="text-gray-500 text-sm mb-2">
            {new Date(article.createdAt).toLocaleDateString()} · Created by{' '}
            <span className="font-medium">{article.user.username}</span>
          </p>

          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        <section className="bg-gray-50 py-10">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-6">Other articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherArticles.map((item) => (
                <ArticleCard key={item.id} article={item} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
