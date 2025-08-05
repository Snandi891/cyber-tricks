"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaClock,
  FaCertificate,
  FaBookOpen,
  FaCheckCircle,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { MdOutlineEventNote } from "react-icons/md";
import { FaToolbox } from "react-icons/fa";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiTwitterXFill,
  RiMailFill,
} from "react-icons/ri";
import { FiArrowLeftCircle } from "react-icons/fi";
import Link from "next/link";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/products?id=${id}`);
        setCourse(response.data);
        if (response.data.images?.length > 0) {
          setSelectedImage(response.data.images[0]);
        }
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading course details...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 text-white bg-gradient-to-br from-black via-[#0d0b2e] to-purple-900">
      {/* Back Button */}
      <Link href="/">
        <div className="flex items-center text-gray-300 hover:text-green-400 mb-6 cursor-pointer">
          <FiArrowLeftCircle className="text-2xl mr-2" />
          <span>Back to Courses</span>
        </div>
      </Link>

      <motion.div
        className="flex flex-col md:flex-row gap-10"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Image Section */}
        <div className="md:w-1/2 space-y-4">
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt="Course"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-lg h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            />
          </AnimatePresence>

          {/* Thumbnails */}
          <div className="flex space-x-3">
            {course.images?.map((img, index) => (
              <motion.img
                key={img}
                src={img}
                alt={`Thumb ${index + 1}`}
                onClick={() => setSelectedImage(img)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                  selectedImage === img
                    ? "border-green-400 shadow-lg"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <motion.div
          className="md:w-1/2 bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-lg space-y-4"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-purple-300">{course.title}</h1>

          <p className="text-gray-300 text-sm">{course.description}</p>

          <div className="flex items-center gap-3 text-green-400 font-bold text-xl">
            ₹{course.price}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-gray-300 mt-4">
            <span className="flex items-center gap-2">
              <FaClock /> {course.duration} hours
            </span>
            <span className="flex items-center gap-2">
              <FaCertificate />
              {course.certificate ? "Certificate Provided" : "No Certificate"}
            </span>
            <span className="flex items-center gap-2">
              <FaChalkboardTeacher />
              Mode:{" "}
              <span className="text-white font-medium">
                {course.format?.toUpperCase() || "N/A"}
              </span>
            </span>
          </div>

          <p className="text-sm text-gray-400">
            Schedule:{" "}
            <span className="text-white font-medium">{course.schedule}</span>
          </p>

          <p className="text-sm text-gray-400">
            Created:{" "}
            <span className="text-white font-medium">
              {new Date(course.createdAt).toLocaleDateString()}
            </span>
          </p>

          <div className="pt-6">
            <button className="w-full bg-gradient-to-r from-purple-500 to-green-400 text-black font-bold py-2 rounded-md shadow-md hover:opacity-90 transition">
              Enroll Now
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        className="mt-20 space-y-8"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-xl">
          <h2 className="text-xl font-bold text-green-400 mb-2 flex items-center gap-2">
            <FaBookOpen />
            Topics Covered
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 pl-4">
            {course.topics?.map((topic, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div
          data-aos="fade-up"
          className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-xl"
        >
          <div className="mt-8">
            <h2 className="flex items-center text-xl font-semibold text-white mb-2">
              <FaToolbox className="text-red-500 mr-2" />
              Tools & Technologies Covered
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-1 pl-2">
              {course.tools?.map((tool, index) => (
                <li key={index}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>

        <div
          data-aos="fade-up"
          className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-xl"
        >
          <h2 className="text-xl font-bold flex items-center gap-2 text-purple-300">
            <MdOutlineEventNote /> Schedule
          </h2>
          <p className="text-sm text-gray-300 whitespace-pre-line">
            {course.shedule || "Schedule not provided."}
          </p>
        </div>

        <div
          data-aos="fade-up"
          className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-xl"
        >
          <h2 className="text-xl font-bold text-purple-400 mb-2">
            Course Description
          </h2>
          <p className="text-sm text-gray-300">{course.description}</p>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-400 text-sm border-t border-white/20 pt-6">
        <p>
          &copy; {new Date().getFullYear()} Cyber Academy. All rights reserved.
        </p>
        <div className="mt-2 flex justify-center gap-4 text-xl">
          <a href="#" className="hover:text-white transition">
            <RiFacebookCircleFill />
          </a>
          <a href="#" className="hover:text-white transition">
            <RiInstagramFill />
          </a>
          <a href="#" className="hover:text-white transition">
            <RiTwitterXFill />
          </a>
          <a
            href="mailto:contact@cyberacademy.com"
            className="hover:text-white transition"
          >
            <RiMailFill />
          </a>
        </div>
      </footer>
    </div>
  );
}
