import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";

const Slider = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("/api/products-proxy");
        const data = await response.json();
        setBanners(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  const scrollToSlide = (index) => {
    const container = containerRef.current;
    if (!container) return;
    const children = container.children;
    if (children[index]) {
      children[index].scrollIntoView({ behavior: "smooth", inline: "start" });
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => {
    const next = (currentIndex + 1) % banners.length;
    scrollToSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentIndex - 1 + banners.length) % banners.length;
    scrollToSlide(prev);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div {...swipeHandlers}>
      {loading ? (
        <div className="w-full h-[300px] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden relative bg-transparent">
          <div
            ref={containerRef}
            className="overflow-x-auto whitespace-nowrap scroll-smooth rounded-2xl mt-3.5 snap-x snap-mandatory no-scrollbar"
          >
            {banners.map((item, index) => (
              <motion.div
                key={item.id || index}
                className="inline-block w-full sm:w-screen h-[300px] sm:h-[400px] px-4 sm:px-8 py-6 sm:py-16 snap-start transition-all duration-700 bg-transparent"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden relative backdrop-blur-md transition transform duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,1)] z-10">
                  <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1740&q=80')",
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      className="relative bg-white/10 backdrop-blur-lg p-4 sm:p-6 rounded-2xl shadow-xl max-w-[95%] sm:max-w-3xl mx-auto text-white space-y-4"
                    >
                      <div className="absolute inset-0 rounded-2xl animate-glow bg-gradient-to-tr from-purple-500 via-indigo-500 to-purple-500 blur-2xl opacity-30 z-0" />
                      <div className="relative z-10">
                        <p className="font-semibold text-lg text-white">
                          Devon Lane
                        </p>
                        <p className="text-sm text-gray-200">2h ago</p>
                        <p className="mt-2 text-sm leading-relaxed">
                          “Christopher Nolan tells the cautionary story of the
                          creation of the atomic bomb and the heavy burden of
                          knowledge.”
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Arrows (hidden on mobile) */}
          <button
            onClick={prevSlide}
            className="hidden sm:block absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-100 z-10"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="hidden sm:block absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-100 z-10"
          >
            ▶
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                className={`w-3 h-3 rounded-full ${
                  i === currentIndex ? "bg-pink-500" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        </div>
      )}

      {/* Custom CSS */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes glow {
          0% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Slider;
