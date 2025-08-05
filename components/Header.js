import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

const apis = ["/api/products-proxy", "/api/jins", "/api/shirt"];

export default function Header() {
  const router = useRouter();
  const { pathname } = router;

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      setShowDropdown(false);
      setHighlightedIndex(-1);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      let allResults = [];

      for (const api of apis) {
        try {
          const res = await fetch(api);
          const data = await res.json();
          const filtered = data
            .filter((item) =>
              item.place?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item) => ({ ...item, source: api.split("/").pop() }));
          allResults = [...allResults, ...filtered];
        } catch (err) {
          console.error("Error fetching from", api, err);
        }
      }

      setResults(allResults);
      setShowDropdown(true);
      setLoading(false);
      setHighlightedIndex(-1);
    };

    fetchData();
  }, [searchTerm]);

  const getNavClass = (path) =>
    pathname === path
      ? "text-cyan-400 bg-gray-900 px-4 py-2 rounded-md font-semibold"
      : "text-white px-4 py-2 hover:text-cyan-300";

  return (
    <>
      <header className="animated-gradient shadow-header border-b border-gray-800 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-2 md:py-4 relative">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link className="block text-cyan-400" href="/">
              <svg
                className="h-8"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0.41 10.3847C1.14777..." fill="currentColor" />
              </svg>
            </Link>
            <span className="text-white font-extrabold text-xl sm:text-2xl tracking-wide hidden sm:block drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
              Cyber Tricks
            </span>
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Nav & Search */}
          <div className="hidden md:flex items-center gap-6">
            <nav>
              <ul className="flex items-center gap-4 text-sm">
                <li className={getNavClass("/")}>
                  <Link href="/">Dashboard</Link>
                </li>
                <li className={getNavClass("/products")}>
                  <Link href="/products">Products</Link>
                </li>
                <li className={getNavClass("/about")}>
                  <Link href="/about">About</Link>
                </li>
              </ul>
            </nav>

            {/* Desktop Search */}
            <div className="relative w-64" ref={dropdownRef}>
              <div className="relative">
                <svg
                  className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-cyan-400 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                  />
                </svg>

                <input
                  type="text"
                  className="rounded p-2 pl-10 w-64 text-white placeholder-white custom-gradient-input border border-cyan-400 focus:outline-none"
                  placeholder="Search ..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setHighlightedIndex(-1);
                  }}
                  onFocus={() => results.length > 0 && setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setHighlightedIndex((prev) =>
                        prev < results.length - 1 ? prev + 1 : 0
                      );
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setHighlightedIndex((prev) =>
                        prev > 0 ? prev - 1 : results.length - 1
                      );
                    } else if (e.key === "Enter") {
                      e.preventDefault();
                      if (
                        highlightedIndex >= 0 &&
                        highlightedIndex < results.length
                      ) {
                        const selected = results[highlightedIndex];
                        setShowDropdown(false);
                        setSearchTerm(selected.place);
                        router.push(
                          `/components/laptopproducts/${selected._id}?source=${selected.source}`
                        );
                      }
                    } else if (e.key === "Escape") {
                      setShowDropdown(false);
                      setHighlightedIndex(-1);
                    }
                  }}
                />
              </div>

              {showDropdown && (
                <ul className="absolute z-50 mt-1 w-full max-h-64 overflow-auto bg-gray-900 border border-gray-700 rounded shadow-lg">
                  {loading && <li className="p-2 text-white">Loading...</li>}
                  {!loading && results.length === 0 && (
                    <li className="p-2 text-gray-400">No results found</li>
                  )}
                  {!loading &&
                    results.map((product, index) => (
                      <li
                        key={product._id}
                        className={`flex items-center gap-3 p-2 cursor-pointer text-white ${
                          highlightedIndex === index ? "bg-cyan-700" : ""
                        } hover:bg-gray-700`}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        onClick={() => {
                          setShowDropdown(false);
                          setSearchTerm(product.place);
                          router.push(
                            `/components/laptopproducts/${product._id}?source=${product.source}`
                          );
                        }}
                      >
                        <img
                          src={product.images?.[0] || "/default.png"}
                          alt={product.title}
                          className="h-10 w-10 rounded object-cover"
                        />
                        <div>
                          <div className="font-semibold">{product.title}</div>
                          <div className="text-sm text-gray-400">
                            {product.place}
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>

          {/* Avatar */}
          <div className="hidden md:block">
            <img
              src="/computer.png"
              alt="Cyber Tricks Logo"
              className="h-10 w-10 rounded-full object-cover shadow-md border-2 border-blue-500"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-4 py-4 space-y-4 text-white text-sm bg-black/80">
            {/* Close button */}
            <div className="flex justify-end">
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-3">
              <Link href="/" className={getNavClass("/")}>
                Dashboard
              </Link>
              <Link href="/products" className={getNavClass("/products")}>
                Products
              </Link>
              <Link href="/about" className={getNavClass("/about")}>
                About
              </Link>
            </div>

            {/* Mobile Search */}
            <input
              type="text"
              className="w-full rounded p-2 pl-3 text-white custom-gradient-input border border-cyan-400"
              placeholder="Search ..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setHighlightedIndex(-1);
              }}
              onFocus={() => results.length > 0 && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
          </div>
        )}
      </header>

      {/* Styles */}
      <style jsx global>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animated-gradient {
          background: linear-gradient(270deg, black, gray, white, gray, black);
          background-size: 800% 800%;
          animation: gradientAnimation 15s ease infinite;
        }
        .shadow-header {
          box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.3),
            0 0 40px 10px rgba(192, 192, 192, 0.25);
        }
        .custom-gradient-input {
          background: linear-gradient(135deg, #7f00ff, #00c3ff, #000);
          background-size: 400% 400%;
          animation: inputGradient 10s ease infinite;
          color: white;
          border: none;
        }
        .custom-gradient-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        @keyframes inputGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
}
