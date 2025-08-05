import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaBook,
  FaAward,
  FaUserGraduate,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaStar,
  FaStarHalfAlt,
  FaArrowUp,
} from "react-icons/fa";

const teachers = [
  {
    name: "John Deo",
    role: "Online Tutor",
    image: "/images/profile.jpg",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  {
    name: "Jane Smith",
    role: "Online Tutor",
    image: "/images/profile.jpg",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  {
    name: "Emily Rose",
    role: "Online Tutor",
    image: "/images/profile.jpg",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
];

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative flex flex-col min-h-screen text-gray-800 overflow-hidden">
      {/* 🔮 Animations */}
      <style>{`
        @keyframes gradientBackground {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes sparkle {
          from {
            transform: translateY(0) scale(0.8);
            opacity: 0.8;
          }
          to {
            transform: translateY(-300px) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>

      {/* ✨ Sparkles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}vw`,
              top: `${Math.random() * 100}vh`,
              animation: `sparkle ${2 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* 🌈 Animated Gradient Background */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-200 via-white to-blue-100 bg-[length:400%_400%]"
        style={{ animation: "gradientBackground 15s ease infinite" }}
      />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {/* === About Section === */}
        <section className="py-16 px-4 md:px-20">
          <div
            className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-xl max-w-6xl mx-auto"
            data-aos="fade-down"
          >
            <h2 className="text-3xl font-bold text-center pb-3">About Us</h2>

            <div className="md:flex items-center gap-10 mt-10">
              <div className="md:w-1/2" data-aos="fade-right">
                <img
                  src="/images/about.jpg"
                  alt="About"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0" data-aos="fade-left">
                <h3 className="text-2xl font-semibold mb-4">
                  We Provide Best Learning Experience.
                </h3>
                <p className="text-gray-700 mb-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, porro. Neque, labore expedita! Voluptatum veniam
                  molestias ducimus, officiis unde modi.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-6 rounded-lg text-center bg-white/60 backdrop-blur shadow hover:shadow-lg">
                    <FaBook className="text-3xl text-green-600 mx-auto mb-2" />
                    <h4 className="text-xl font-bold">99+</h4>
                    <p className="text-gray-600 text-sm">Courses</p>
                  </div>
                  <div className="p-6 rounded-lg text-center bg-white/60 backdrop-blur shadow hover:shadow-lg">
                    <FaAward className="text-3xl text-green-600 mx-auto mb-2" />
                    <h4 className="text-xl font-bold">15+</h4>
                    <p className="text-gray-600 text-sm">Awards</p>
                  </div>
                  <div className="p-6 rounded-lg text-center bg-white/60 backdrop-blur shadow hover:shadow-lg">
                    <FaUserGraduate className="text-3xl text-green-600 mx-auto mb-2" />
                    <h4 className="text-xl font-bold">769+</h4>
                    <p className="text-gray-600 text-sm">Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === Expert Teachers === */}
        <section className="py-16 px-4 md:px-20 text-center">
          <h2 className="text-3xl font-bold mb-10" data-aos="fade-up">
            Expert Teachers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
              <div
                key={index}
                className="group relative bg-white/60 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center gap-4 py-3">
                  <a href={teacher.social.facebook} target="_blank">
                    <FaFacebookF />
                  </a>
                  <a href={teacher.social.twitter} target="_blank">
                    <FaTwitter />
                  </a>
                  <a href={teacher.social.linkedin} target="_blank">
                    <FaLinkedinIn />
                  </a>
                  <a href={teacher.social.instagram} target="_blank">
                    <FaInstagram />
                  </a>
                </div>
                <div className="py-4">
                  <p className="text-sm text-gray-600">{teacher.role}</p>
                  <h4 className="font-semibold text-lg">{teacher.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === Student Testimonials === */}
        <section className="py-16 px-4 md:px-20 text-center">
          <h2 className="text-3xl font-bold mb-12" data-aos="fade-up">
            Our Satisfied Students
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="relative bg-white/60 backdrop-blur-lg border border-green-200 p-6 rounded-lg shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-12px] w-4 h-4 bg-white/60 border-l border-b border-green-200 rotate-45 z-0"></div>
                <p className="text-gray-700 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dolore consequatur fuga quaerat quibusdam praesentium
                  exercitationem temporibus assumenda ex.
                </p>
                <div className="mt-12 flex flex-col items-center z-10 relative">
                  <img
                    src={`/images/profile${index + 1}.jpg`}
                    alt="Student Avatar"
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow -mt-10"
                  />
                  <h4 className="mt-2 font-semibold text-gray-800">John Deo</h4>
                  <div className="flex gap-1 text-green-600 mt-1">
                    {[...Array(4)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    {index === 2 ? <FaStarHalfAlt /> : <FaStar />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* === Footer === */}
      <footer className="bg-white/60 backdrop-blur border-t py-6 text-center">
        <div className="flex justify-center gap-4 text-green-600 text-xl mb-2">
          <FaFacebookF />
          <FaTwitter />
          <FaLinkedinIn />
          <FaInstagram />
        </div>
        <p className="text-gray-700 text-sm">
          Created by{" "}
          <span className="font-semibold hover:underline">
            Mr. Web Designer
          </span>{" "}
          | All rights reserved
        </p>
      </footer>

      {/* Scroll To Top */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}
