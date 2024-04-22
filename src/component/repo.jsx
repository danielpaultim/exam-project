import React, { useEffect, useState } from "react";

import { Paginator } from "primereact/paginator";
import { Link } from "react-router-dom";

const GitHubRepo = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRepositories, setFilteredRepositories] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(3);

  useEffect(() => {
    const myRepo = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/danielpaultim/repos`,
          {
            method: "GET",
            headers: {
              Authorization: import.meta.env.VITE_TOKEN,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const data = await response.json();
        setRepositories(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    myRepo();
  }, []);

  const SearchRepo = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filtered = repositories.filter((repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRepositories(filtered);
  }, [repositories, searchTerm]);

  return (
    <div style={{ fontFamily: "Exo 2, sans-serif" }}>
      <div>
        <label
          className="mx-auto mt-40 relative bg-off-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
          for="search-bar"
        >
          <input
            id="search-bar"
            placeholder="Enter your keyword here"
            type="text"
            value={searchTerm}
            onChange={SearchRepo}
            className="px-6 py-2 w-full text-black rounded-md flex-1 outline-none bg-off-white"
          />
          <a
            href="*"
            className="w-full md:w-auto px-6 py-3 bg-black border-black text-off-white fill-off-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70"
          >
            <div className="relative">
              <div className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                <svg
                  className="opacity-0 animate-spin w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>

              <div class="flex items-center transition-all opacity-1 valid:">
                <span class="text-sm font-semibold space-nowrap truncate mx-auto text-white">
                  Search
                </span>
              </div>
            </div>
          </a>
        </label>
      </div>

      <div>
        <div>
          {loading ? (
            <p className="text-off-white">loading...</p>
          ) : (
            <div className="flex lg:flex-row lg:row-span-3 lg:flex-wrap flex-col gap-4 h-svh m-4   items-center">
              {filteredRepositories.slice(first, first + rows).map((repo) => (
                <div className="group flex flex-col justify-start items-center gap-2 w-96 h-56 duration-500 relative rounded-lg p-4 bg-gray-100 hover:-translate-y-2 hover:shadow-xl shadow-gray-300">
                  {/* <div  className=" absolute duration-700 shadow-md group-hover:-translate-y-4 group-hover:-translate-x-4 -bottom-10 -right-10 w-1/2 h-1/2 rounded-lg bg-gray-200" key={repo.id}>
                            </div> */}
                  <div>
                    <h2 class="text-2xl font-bold mb-2 text-gray-800">
                      {repo.name}
                    </h2>
                  </div>
                  <Link
                    to={`/repository/${repo.id}/`}
                    className="block hover:bg-gray-300 bg-gray-200 text-gray-800 mt-6 rounded p-2 px-6"
                  >
                    Explore
                  </Link>
                </div>
              ))}
            </div>
          )}
          <Paginator
            className="flex gap-4 text-zinc-100 m-5 "
            first={first}
            rows={rows}
            totalRecords={6}
            onPageChange={(e) => {
              setFirst(e.first);
              setRows(e.rows);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GitHubRepo;
