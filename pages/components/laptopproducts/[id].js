import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        // Fetch from all your APIs and merge results
        const apis = ["/api/products-proxy", "/api/jins", "/api/shirt"];
        const allData = await Promise.all(
          apis.map((url) => axios.get(url).then((res) => res.data))
        );
        const merged = allData.flat();

        // Find product by id (match with _id or id)
        const found = merged.find(
          (item) =>
            item._id === id || item.id === id || item._id?.toString() === id
        );

        if (!found) throw new Error("Product not found");

        setProduct(found);
        if (found.images?.length) setSelectedImage(found.images[0]);
      } catch (error) {
        console.error("Failed to fetch product", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // New effect for automatic image cycling every 1 second
  useEffect(() => {
    if (!product?.images || product.images.length === 0) return;

    const interval = setInterval(() => {
      setSelectedImage((current) => {
        const currentIndex = product.images.indexOf(current);
        const nextIndex = (currentIndex + 1) % product.images.length;
        return product.images[nextIndex];
      });
    }, 10000); // 1 second interval

    return () => clearInterval(interval);
  }, [product?.images]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 bg-white">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 bg-white">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12 bg-white text-gray-800">
      {/* Main Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* Image Carousel */}
        <div className="md:w-1/2 space-y-4">
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt={product.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-lg h-auto rounded-2xl shadow-xl object-cover cursor-pointer"
            />
          </AnimatePresence>

          {/* Thumbnails */}
          <div className="flex space-x-4 overflow-x-auto">
            {product.images?.map((img, i) => (
              <motion.img
                key={img + i}
                src={img}
                alt={`Thumbnail ${i + 1}`}
                onClick={() => setSelectedImage(img)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-16 h-16 object-cover rounded-md border-2 cursor-pointer transition duration-300 ${
                  selectedImage === img
                    ? "border-indigo-600 shadow-lg"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-start p-4 md:p-8">
          <nav className="text-sm text-gray-500 mb-4">
            {product.category || "Tour"} /{" "}
            <span className="text-gray-900">{product.title}</span>
          </nav>

          <h1 className="text-4xl font-bold mb-2">{product.title}</h1>

          <div className="flex items-center mb-4">
            <span className="text-yellow-500 text-lg">★★★★☆</span>
            <span className="ml-2 text-sm text-gray-600">
              {product.rating || "4.6/5.0"}
            </span>
          </div>

          <p className="text-2xl font-semibold text-gray-800 mb-4">
            ${product.price || "N/A"}
          </p>

          <p className="text-gray-600 mb-6 whitespace-pre-line">
            {product.description ||
              product.short ||
              "No description available."}
          </p>

          {/* Optional additional info (adjust based on your data) */}
          {product.place && (
            <p className="mb-2">
              <strong>Place:</strong> {product.place}
            </p>
          )}
          {product.phone && (
            <p className="mb-2">
              <strong>Contact:</strong> {product.phone}
            </p>
          )}

          {/* Example action buttons */}
          <div className="flex space-x-4 mt-auto">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">
              Book Now
            </button>
            <button className="text-indigo-600 underline">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Sections below */}
      <div className="max-w-3xl space-y-6">
        {product.food && (
          <section>
            <h2 className="text-2xl font-semibold mb-2">Food Plan</h2>
            <p>{product.food}</p>
          </section>
        )}

        {product.activity && (
          <section>
            <h2 className="text-2xl font-semibold mb-2">Activities</h2>
            <p>{product.activity}</p>
          </section>
        )}

        {product.nearby && (
          <section>
            <h2 className="text-2xl font-semibold mb-2">Nearby Attractions</h2>
            <p>{product.nearby}</p>
          </section>
        )}

        {/* You can add more sections here */}
      </div>
    </div>
  );
}
