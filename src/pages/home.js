import React, { useState, useEffect } from "react";

export default function Home() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("sports"); // Default category
  const [country, setCountry] = useState("in"); // Default country
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true); // Set loading state to true before fetching news
        const api = "423c372d505f45fb8b9f38426610d367";
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${api}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        setNews(data.articles);
        console.log(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false); // Set loading state to false after fetching news
      }
    };

    fetchNews();
  }, [category, country]);

  return (
    <div>
      <h1>News App</h1>
      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="sports">Sports</option>
          <option value="business">Business</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <select
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="in">India</option>
          <option value="us">United States</option>
          {/* Add more options as needed */}
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="m-2 p-2">
          <div className="grid gap-3 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {news.map((article, index) => (
              <article
                key={index}
                className="overflow-hidden rounded-lg shadow transition hover:shadow-lg"
              >
                <img
                  alt="Not Found"
                  src={article.urlToImage}
                  className="h-56 w-full object-cover"
                />
                <div className="bg-white p-4 sm:p-6">
                  <time
                    dateTime="2022-10-10"
                    className="block text-xs text-gray-500"
                  >
                    {article.publishedAt}
                  </time>
                  <h3 className="mt-0.5 text-lg text-gray-900">
                    {article.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    {article.description}
                  </p>
                  <a
                    href={article.url}
                    className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                  >
                    Find out more
                    <span
                      aria-hidden="true"
                      className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                    >
                      &rarr;
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
