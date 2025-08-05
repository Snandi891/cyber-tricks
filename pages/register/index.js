"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    address: "",
    qualification: "",
    institute: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace with your actual backend API route
      await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      toast.success("Registration Completed!");
      setTimeout(() => {
        router.back(); // redirect to previous page
      }, 1500);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('/images/bg.jpg')", // <- Change to your correct path
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl backdrop-blur-lg bg-white/10 p-10 rounded-2xl shadow-xl border border-white/20 text-white"
      >
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-2">
          CYBER SECURITY COURSE
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Secure your spot today — register below
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-transparent border border-gray-300 text-white p-3 rounded-lg outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="bg-transparent border border-gray-300 text-white p-3 rounded-lg outline-none"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="bg-transparent border border-gray-300 text-white p-3 rounded-lg outline-none"
            required
          />
          <input
            type="text"
            name="course"
            placeholder="Course Name"
            value={formData.course}
            onChange={handleChange}
            className="bg-transparent border border-gray-300 text-white p-3 rounded-lg outline-none"
            required
          />
          <input
            type="text"
            name="qualification"
            placeholder="qualification Name"
            value={formData.qualification}
            onChange={handleChange}
            className="bg-transparent border border-gray-300 text-white p-3 rounded-lg outline-none"
            required
          />
          <input
            type="text"
            name="institute"
            placeholder="institute Name"
            value={formData.institute}
            onChange={handleChange}
            className="bg-transparent border border-gray-300 text-white p-3 rounded-lg outline-none"
            required
          />
        </div>

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full mt-4 bg-transparent border border-gray-300 text-white p-3 rounded-lg outline-none"
          rows="3"
          required
        ></textarea>

        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition"
        >
          Register Now
        </button>
      </form>
    </div>
  );
}
