import React, { useEffect } from "react";
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
} from "react-icons/fa";

const teachers = [
  {
    name: "John Deo",
    role: "online tutor",
    image: "/images/teacher1.jpg",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  {
    name: "John Deo",
    role: "online tutor",
    image: "/images/teacher2.jpg",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  {
    name: "John Deo",
    role: "online tutor",
    image: "/images/teacher3.jpg",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
];

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* === About Us Section === */}
      <section className="py-16 px-4 md:px-20 bg-white">
        <div className="text-center mb-10" data-aos="fade-down">
          <h2 className="text-3xl font-bold">About Us</h2>
          <p className="text-sm text-green-600 mt-2">home / about</p>
        </div>

        <div className="md:flex items-center justify-between gap-10">
          {/* Left Image */}
          <div className="md:w-1/2" data-aos="fade-right">
            <img
              src="/images/about-illustration.png"
              alt="About Illustration"
              className="w-full"
            />
          </div>

          {/* Right Text */}
          <div className="md:w-1/2 mt-10 md:mt-0" data-aos="fade-left">
            <h3 className="text-2xl font-semibold mb-4">
              We Provide Best Learning Experience.
            </h3>
            <p className="text-gray-600 mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              porro. Neque, labore expedita! Voluptatum veniam molestias
              ducimus, officiis unde modi. Ex nemo beatae, libero temporibus
              vero excepturi tempora repellat praesentium.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="border p-6 text-center rounded-md hover:shadow-lg">
                <FaBook className="text-3xl text-green-600 mx-auto mb-2" />
                <h4 className="text-xl font-bold">99+</h4>
                <p className="text-sm text-gray-600">courses</p>
              </div>
              <div className="border p-6 text-center rounded-md hover:shadow-lg">
                <FaAward className="text-3xl text-green-600 mx-auto mb-2" />
                <h4 className="text-xl font-bold">15+</h4>
                <p className="text-sm text-gray-600">awards</p>
              </div>
              <div className="border p-6 text-center rounded-md hover:shadow-lg">
                <FaUserGraduate className="text-3xl text-green-600 mx-auto mb-2" />
                <h4 className="text-xl font-bold">769+</h4>
                <p className="text-sm text-gray-600">students</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Expert Teachers Section === */}
      <section className="py-16 px-4 md:px-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10" data-aos="fade-up">
          Expert Teachers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className="group relative rounded-lg overflow-hidden shadow-lg"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              {/* Image with Zoom */}
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Social Icons on Hover */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center gap-6 py-4">
                <a
                  href={teacher.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF className="hover:text-blue-400 text-lg" />
                </a>
                <a
                  href={teacher.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="hover:text-sky-400 text-lg" />
                </a>
                <a
                  href={teacher.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn className="hover:text-blue-600 text-lg" />
                </a>
                <a
                  href={teacher.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="hover:text-pink-500 text-lg" />
                </a>
              </div>

              {/* Name & Role */}
              <div className="mt-3 text-center">
                <p className="text-sm text-gray-500">{teacher.role}</p>
                <h4 className="text-lg font-semibold">{teacher.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
