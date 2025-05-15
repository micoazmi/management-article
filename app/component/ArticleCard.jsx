'use client';

import Link from 'next/link';

export default function ArticleCard({ article }) {
  return (
    <Link href={`/articles/${article.id}`}>
      <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white">
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-40 object-cover"
          />
        )}
        <div className="p-4">
          <p className="text-xs text-gray-500">
            {new Date(article.createdAt).toLocaleDateString()}
          </p>
          <h3 className="text-lg font-bold mb-2">{article.title}</h3>
          <div className="flex gap-2 flex-wrap text-xs text-blue-600">
            <span className="bg-blue-100 px-2 py-1 rounded">
              {article.category?.name}
            </span>
            <span className="bg-blue-100 px-2 py-1 rounded">
              {article.user?.username}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
