"use client";
import React, { useEffect, useState, useMemo } from "react";
import Tilt from "react-parallax-tilt";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiPlayCircle } from "react-icons/fi";
import {
  FaStar,
  FaRegStar,
  FaBook,
  FaClock,
  FaDollarSign,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Link from "next/link";

const Index = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/products");
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const maxStars = 5;
  const rating = courses.rating || 4;

  const categories = useMemo(
    () => ["All", ...new Set(courses.map((c) => c.category || "General"))],
    [courses]
  );

  const filteredCourses = courses.filter((course) => {
    const categoryMatch =
      selectedCategory === "All" || course.category === selectedCategory;
    const price = parseFloat(course.price);
    const priceMatch =
      selectedPriceRange === "All" ||
      (selectedPriceRange === "100" && price <= 100) ||
      (selectedPriceRange === "500" && price > 100 && price <= 500) ||
      (selectedPriceRange === "1000" && price > 500 && price <= 1000);
    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen relative overflow-hidden pb-32 text-white animated-dark-bg">
      {/* Filter Area */}
      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-10">
        <div className="flex flex-col sm:flex-row justify-end gap-4 mb-8">
          {/* Category Filter */}
          <div>
            <label className="text-white text-sm font-semibold block mb-1">
              Filter by Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/20 backdrop-blur-md border border-white/30 text-white rounded px-4 py-2 focus:outline-none"
            >
              {categories.map((cat, i) => (
                <option value={cat} key={i} className="bg-black text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div>
            <label className="text-white text-sm font-semibold block mb-1">
              Filter by Price:
            </label>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="bg-white/20 backdrop-blur-md border border-white/30 text-white rounded px-4 py-2 focus:outline-none"
            >
              <option value="All" className="bg-black text-white">
                All
              </option>
              <option value="100" className="bg-black text-white">
                Under ₹100
              </option>
              <option value="500" className="bg-black text-white">
                ₹101 – ₹500
              </option>
              <option value="1000" className="bg-black text-white">
                ₹501 – ₹1000
              </option>
            </select>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-2">
          {filteredCourses.map((course) => {
            const rating = course.rating || 4;
            const maxStars = 5;

            return (
              <Tilt
                key={course._id}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                scale={1.05}
                transitionSpeed={1000}
                glareEnable={false}
              >
                <div
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden transition-transform hover:scale-[1.03] hover:shadow-xl hover:border-purple-400 duration-300 group"
                  data-aos="fade-up"
                >
                  {/* Course Image */}
                  <div className="relative">
                    <img
                      src={course.images?.[0] || "/images/placeholder.png"}
                      alt={`Course on ${course.title}`}
                      className="h-48 w-full object-cover transition-all duration-300 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 text-xs text-purple-900 font-semibold px-3 py-1 rounded-full shadow-md">
                      {course.category || "General"}
                    </span>

                    {/* Avatars */}
                    <div className="absolute -bottom-4 right-4 flex -space-x-3 z-20">
                      {[1, 2, 3, 4].map((n) => (
                        <img
                          key={n}
                          src={`/avatars/avatar${n}.jpg`} // replace with your avatar paths
                          className="w-8 h-8 border-2 border-white rounded-full object-cover shadow-md"
                          alt="user"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="relative z-10 p-4 pt-6 flex flex-col h-full text-white">
                    {/* Title */}
                    <h3 className="text-lg font-bold mb-1">{course.title}</h3>

                    {/* Rating */}
                    <div className="flex items-center text-sm text-yellow-400 mb-2">
                      {Array.from({ length: maxStars }).map((_, i) =>
                        i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                      )}
                      <span className="text-gray-300 ml-2">
                        {rating.toFixed(1)} ({course.reviews || 75} Reviews)
                      </span>
                    </div>

                    {/* Price + Lessons */}
                    <div className="flex justify-between items-center mt-auto pt-3 text-sm">
                      <div className="text-white font-bold text-lg">
                        ₹{course.price}
                        {course.originalPrice && (
                          <span className="text-sm line-through text-gray-400 ml-2">
                            ₹{course.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-gray-300">
                        <FiPlayCircle className="text-base" />
                        {course.lessons || 3} Lessons
                      </div>
                    </div>

                    {/* Button */}
                    <div className="mt-4">
                      <Link href={`products/details/${course._id}`}>
                        <button className="w-full bg-white/30 hover:bg-green-300 hover:text-purple-900 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="border-t border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 flex justify-between text-sm text-gray-200">
                    <span className="flex items-center gap-2">
                      <FaBook className="text-blue-300" />
                      {course.modules || 10} Modules
                    </span>
                    <span className="flex items-center gap-2">
                      <FaClock className="text-blue-300" />
                      {course.duration || "5 hours"}
                    </span>
                  </div>
                </div>
              </Tilt>
            );
          })}
        </div>
      </div>

      {/* Sticky Footer */}
      <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 py-6  text-start fixed bottom-0 w-full z-50">
        <div className="flex justify-center gap-6 text-green-400 text-xl mb-2">
          <FaFacebookF className="hover:scale-110 transition-transform duration-200 cursor-pointer" />
          <FaTwitter className="hover:scale-110 transition-transform duration-200 cursor-pointer" />
          <FaLinkedinIn className="hover:scale-110 transition-transform duration-200 cursor-pointer" />
          <FaInstagram className="hover:scale-110 transition-transform duration-200 cursor-pointer" />
        </div>
        <p className="text-gray-300 text-sm">
          Created by{" "}
          <span className="font-semibold hover:underline hover:text-green-400 cursor-pointer">
            Mr. Web Designer
          </span>{" "}
          | All rights reserved
        </p>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        .animated-dark-bg {
          background: linear-gradient(
            -45deg,
            #0f0c29,
            #302b63,
            #24243e,
            #1b1b2f
          );
          background-size: 400% 400%;
          animation: gradientBG 20s ease infinite;
        }

        @keyframes gradientBG {
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

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .border-glow {
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .border-glow:hover {
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.3),
            0 0 30px rgba(147, 112, 219, 0.25),
            0 0 40px rgba(255, 255, 255, 0.1);
          border-color: rgba(0, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Index;
