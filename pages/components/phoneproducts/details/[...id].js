import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function TourDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchTour = async () => {
      try {
        const response = await axios.get(`/api/products-proxy?id=${id}`);
        setTour(response.data);
        if (response.data.images?.length > 0) {
          setSelectedImage(response.data.images[0]);
        }
      } catch (err) {
        console.error("Failed to fetch tour", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading || !tour) {
    return (
      <div className="text-center py-20 text-lg text-gray-500">
        Loading tour details...
      </div>
    );
  }
  return (
    <div className="min-h-screen p-6 md:p-12 bg-white text-gray-800">
      {/* Title and Summary */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* Image Carousel */}
        <div className="md:w-1/2 space-y-4">
          {/* Main Image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt="Product Image"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-96 h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out"
            />
          </AnimatePresence>

          {/* Thumbnails */}
          <div className="flex space-x-4">
            {tour.images?.map((img, index) => (
              <motion.img
                key={img}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(img)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-16 h-16 object-cover cursor-pointer rounded-md border-2 transition-all duration-300 ${
                  selectedImage === img
                    ? "border-black shadow-lg"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 p-8">
          <nav className="text-sm text-gray-500 mb-4">
            {tour.category} /{" "}
            <span className="text-gray-900">{tour.title}</span>
          </nav>
          <h1 className="text-4xl font-bold mb-2">{tour.title}</h1>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500 text-lg">★★★★☆</span>
            <span className="ml-2 text-sm text-gray-600">
              {tour.rating || "4.6/5.0"}
            </span>
          </div>
          <p className="text-2xl font-semibold text-gray-800 mb-4">
            ${tour.price}
          </p>
          <p className="text-gray-600 mb-6">{tour.description}</p>

          {/* Color */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">COLOR</label>
            <div className="flex space-x-2">
              <button className="w-6 h-6 bg-red-700 rounded-full border-2 border-gray-200 hover:ring-2"></button>
              <button className="w-6 h-6 bg-black rounded-full border-2 border-gray-200 hover:ring-2"></button>
            </div>
          </div>

          {/* Size & Quantity */}
          <div className="flex space-x-8 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">SIZE</label>
              <select className="border px-2 py-1 rounded text-sm">
                <option>40</option>
                <option>41</option>
                <option>42</option>
                <option>43</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">QUANTITY</label>
              <div className="flex items-center border rounded w-fit">
                <button>-</button>
                <span className="px-4">tt</span>
                <button>+</button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
              Add to Cart
            </button>
            <button className="text-gray-600 underline">
              Save to Wishlist
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Standard delivery in 2-4 days or Pickup at store in 2-4 hours.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-3xl justify-start space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Tour Description</h2>
          <div
            className="prose text-gray-700"
            dangerouslySetInnerHTML={{
              __html: tour.description.replace(/\n/g, "<br/>"),
            }}
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Food Plan</h2>
          <p>{tour.food}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Activities</h2>
          <p>{tour.activity}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Nearby Attractions</h2>
          <p>{tour.nearby}</p>
        </section>
      </div>
    </div>
  );
}
