import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [banners, setBanners] = useState([]);
  const [originalBanners, setOriginalBanners] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState(null);
  const [dateOrder, setDateOrder] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("/api/products-proxy");
        const data = await response.json();
        setBanners(data);
        setOriginalBanners(data);

        const categoryCounts = {};
        data.forEach((item) => {
          const category = item.category || "Other";
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
        setCounts(categoryCounts);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const getFilteredAndSortedBanners = () => {
    let filtered = [...originalBanners];

    if (priceFilter) {
      filtered = filtered.filter((item) => {
        const price = parseFloat(item.price || 0);
        switch (priceFilter) {
          case "under50":
            return price < 50;
          case "100to150":
            return price >= 100 && price <= 150;
          case "150to200":
            return price >= 150 && price <= 200;
          default:
            return true;
        }
      });
    }

    if (sortOrder === "asc") {
      filtered.sort(
        (a, b) => parseFloat(a.price || 0) - parseFloat(b.price || 0)
      );
    } else if (sortOrder === "desc") {
      filtered.sort(
        (a, b) => parseFloat(b.price || 0) - parseFloat(a.price || 0)
      );
    }

    if (dateOrder === "old") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (dateOrder === "new") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  };

  const shuffleProducts = () => {
    const shuffled = [...originalBanners];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setSortOrder(null);
    setPriceFilter(null);
    setDateOrder(null);
    setBanners(shuffled);
  };

  const displayedBanners =
    sortOrder || priceFilter || dateOrder
      ? getFilteredAndSortedBanners()
      : banners;

  return (
    <main className="bg-black min-h-screen text-white font-sans overflow-hidden relative">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-800 via-violet-600 to-rose-900 opacity-30 blur-3xl animate-pulse" />

      <div>
        <header className="absolute top-0 left-0 w-full z-10 text-white">
          <nav className="flex items-center justify-between px-8 py-6">
            <div className="flex items-center space-x-4">
              <button id="menu-toggle" className="text-2xl md:hidden">
                &#9776;
              </button>
              <span className="font-bold text-lg">Constructor</span>
              <ul
                id="menu"
                className="hidden md:flex space-x-4 ml-6 md:static absolute bg-black md:bg-transparent w-full md:w-auto top-full left-0 z-10"
              >
                <li>
                  <a href="#" className="block px-4 py-2">
                    Woman
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2">
                    Men
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2">
                    Children
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2">
                    Contacts
                  </a>
                </li>
              </ul>
            </div>
            <div className="hidden md:flex space-x-4">
              <a href="#">Account</a>
              <a href="#">Bag</a>
            </div>
          </nav>
        </header>

        <section className="relative h-[30vh] pb-3.5 flex items-center justify-center text-center text-white overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
            alt="Hero"
            className="absolute inset-0 w-full h-full rounded-b-full object-cover opacity-80 z-0"
          />
          <div className="z-10 bottom-4">
            <h1 className="text-5xl font-bold mb-4">MEN&apos;S SHOES</h1>
            <button className="bg-white text-black px-6 py-2 rounded-full shadow-md">
              Shop Now
            </button>
          </div>
        </section>

        <main className="relative px-6 md:px-20 py-10 overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-1/4 space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-2">Men&apos;s</h2>
                <ul className="space-y-1 text-sm text-gray-700">
                  {Object.entries(counts).map(([category, count]) => (
                    <li key={category}>
                      • {category} ({count})
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-md font-semibold mb-2">Price</h3>
                <div className="space-y-1 space-x-3 text-sm text-gray-700">
                  <button
                    onClick={() => setPriceFilter("under50")}
                    className={`px-3 py-1 rounded ${
                      priceFilter === "under50"
                        ? "text-green-400 font-bold shadow-neon bg-black"
                        : ""
                    }`}
                  >
                    Under ₹50
                  </button>
                  <button
                    onClick={() => setPriceFilter("100to150")}
                    className={`px-3 py-1 rounded ${
                      priceFilter === "100to150"
                        ? "text-green-400 font-bold shadow-neon bg-black"
                        : ""
                    }`}
                  >
                    ₹100 to ₹150
                  </button>
                  <button
                    onClick={() => setPriceFilter("150to200")}
                    className={`px-3 py-1 rounded ${
                      priceFilter === "150to200"
                        ? "text-green-400 font-bold shadow-neon bg-black"
                        : ""
                    }`}
                  >
                    ₹150 to ₹200
                  </button>
                  <button
                    onClick={() => setPriceFilter(null)}
                    className="text-gray-500 text-sm"
                  >
                    Clear Filter
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-md font-semibold mb-2">Color</h3>
                <div className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-400"></span>
                  <span className="w-5 h-5 rounded-full bg-yellow-300"></span>
                  <span className="w-5 h-5 rounded-full bg-blue-400"></span>
                  <span className="w-5 h-5 rounded-full bg-black"></span>
                </div>
              </div>
            </aside>

            <section className="w-full lg:w-3/4">
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h2 className="text-xl font-semibold">
                  MEN&apos;S SHOES & SNEAKERS{" "}
                  <span className="text-gray-500">
                    ({displayedBanners.length} items)
                  </span>
                </h2>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <button
                    onClick={() => {
                      setSortOrder("asc");
                      setDateOrder(null);
                    }}
                    className={`${
                      sortOrder === "asc" ? "font-bold text-green-700" : ""
                    }`}
                  >
                    Low Price to High
                  </button>
                  <button
                    onClick={() => {
                      setSortOrder("desc");
                      setDateOrder(null);
                    }}
                    className={`${
                      sortOrder === "desc" ? "font-bold text-green-700" : ""
                    }`}
                  >
                    High Price to Low
                  </button>
                  <button
                    onClick={() => {
                      setDateOrder("new");
                      setSortOrder(null);
                    }}
                    className={`${
                      dateOrder === "new" ? "font-bold text-green-700" : ""
                    }`}
                  >
                    New to Old
                  </button>
                  <button
                    onClick={shuffleProducts}
                    className="hover:text-green-700"
                  >
                    Shuffle
                  </button>
                </div>
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={JSON.stringify(displayedBanners)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-wrap gap-4 py-2"
                  >
                    {displayedBanners.map((item, index) => (
                      <div
                        key={index}
                        className="relative bg-white/10 backdrop-blur-md rounded-xl p-4 w-[22%] min-w-[140px] max-w-[25%] flex-grow transition-all duration-300 shadow-[0_0_20px_rgba(0,255,255,0.3)] ring-1 ring-cyan-400/50"
                      >
                        <span className="absolute inset-0 rounded-xl ring-2 ring-cyan-400 animate-pulse pointer-events-none z-0" />
                        <div className="relative z-10">
                          <div className="w-full aspect-[3/4] bg-white rounded-3xl shadow-lg overflow-hidden">
                            <img
                              src={item.images?.[0]}
                              alt={item.title || "Product"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="font-semibold text-white mt-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-300">
                            Men&apos;s Shoe
                          </p>
                          <p className="font-bold mt-1 text-white">
                            ₹{item.price || 180}
                          </p>
                          <li>
                            <Link
                              href={`/components/phoneproducts/details/${item._id}`}
                              className="text-green-400"
                            >
                              Edit
                            </Link>
                          </li>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}
            </section>
          </div>
        </main>
      </div>
    </main>
  );
};

export default Index;
