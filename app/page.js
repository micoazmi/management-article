"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Api from "@/lib/api";
import Footer from "./footer/footer";
import Navbar from "./navbar/navbar";
import api from "@/lib/api";
import Link from "next/link";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [articles, setArticles] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await Api.get("/articles");
        setArticles(res.data.data);
      } catch (err) {
        console.error(err);
      }
    }

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

    fetchArticles();
    fetchUser();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const titleMatch = article.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const categoryMatch = category === "" || article.category.name === category;
    return titleMatch && categoryMatch;
  });

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative h-[500px] text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        />

        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-[#2563EBDB] z-10" />

        {/* Navbar */}
        <Navbar user={user} setUser={setUser}/>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 mt-[-48px]">
          <h2> Blog genzet</h2>
          <h1 className="text-3xl font-bold text-white max-w-2xl">
            The Journal : Design Resources, <br></br> Interviews, and Industry
            News
          </h1>
          <p className="mt-2 text-white">Your daily dose of design insights!</p>

          {/* Filters */}
          <div className="mt-6 flex justify-center">
            <div className="bg-[#3B82F6] rounded-lg px-4 py-3 w-full max-w-2xl shadow-lg">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {/* Select Category */}
                <select
                  className="bg-white text-black border px-4 py-2 rounded w-full sm:w-48"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Management">Management</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                </select>

                {/* Search Input with Lucide Icon */}
                <div className="relative w-full sm:w-64 bg-white rounded">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 " />
                  <Input
                    placeholder="Search articles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 w-full rounded text-black placeholder:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="px-9 max-w-7xl mx-auto py-8 ">
        <p className="mb-6 text-sm text-gray-500">
          Showing {filteredArticles.length} of {articles.length} articles
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded shadow overflow-hidden"
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-500">
                  {new Date(article.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                  <Link href={`/articles/${article.id}`} >
                <h2 className="text-lg font-semibold mt-1">{article.title}</h2>
                  </Link>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {article.content}
                </p>
                <div className="mt-3 flex gap-2 flex-wrap">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {article.category.name}
                  </span>
                  <span className="text-xs bg-gray-100 text-blue-800 px-2 py-1 rounded-full">
                    {article.user.username}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center gap-2 text-sm">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "default" : "outline"}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
}
