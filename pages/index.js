import Categories from "@/components/Categories";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Slider from "@/components/Slider";
import AnimatedContent from "@/components/Animation/AnimatedContent";
import Links from "@/components/Links";
import Links2 from "@/components/Links2";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";

const Index = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const router = useRouter();

  const goToRegister = () => {
    router.push("/register");
  };

  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const roles = [
    "Ethical Hacking",
    "Network Security",
    "Bug Bounty",
    "Malware Analysis",
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!deleting && charIndex <= currentRole.length) {
      timeout = setTimeout(() => {
        setText(currentRole.substring(0, charIndex));
        setCharIndex(charIndex + 1);
      }, 120);
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setText(currentRole.substring(0, charIndex));
        setCharIndex(charIndex - 1);
      }, 80);
    } else {
      setDeleting(!deleting);
      if (!deleting) {
        timeout = setTimeout(() => {}, 1000);
      } else {
        setRoleIndex((roleIndex + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

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

  useEffect(() => {
    if (banners.length === 0) return;

    const scrollNext = () => {
      const nextIndex = (currentIndex + 1) % banners.length;
      scrollToSlide(nextIndex);
    };

    intervalRef.current = setInterval(scrollNext, 5000);

    return () => clearInterval(intervalRef.current);
  }, [banners, currentIndex]);

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
  const glowAnimation = {
    animation: "glow 2s ease-in-out infinite",
    color: "white",
    fontWeight: "bold",
    fontSize: "2.00rem", // roughly text-4xl
    lineHeight: 1.25,
    whiteSpace: "pre-line",
    // Make sure to add the keyframes inside a <style> tag or use a global stylesheet
  };
  // for image animation

  const glowControls = useAnimation();
  const audioRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (!hasInteracted) return;

    glowControls.start({
      boxShadow: [
        "0 0 0px rgba(99,102,241,0)",
        "0 0 20px rgba(99,102,241,0.7)",
        "0 0 0px rgba(99,102,241,0)",
      ],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    });

    const audio = audioRef.current;
    let stopAudioTimeout;

    if (audio) {
      // Play audio
      audio.play().catch(() => {});

      // Listen for song ending
      const handleEnded = () => {
        setHasInteracted(false);
      };

      audio.addEventListener("ended", handleEnded);

      // Or fallback timeout in case of browser issues
      stopAudioTimeout = setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
        setHasInteracted(false);
      }, 60000); // 60 seconds
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", () => setHasInteracted(false));
      }
      if (stopAudioTimeout) clearTimeout(stopAudioTimeout);
    };
  }, [glowControls, hasInteracted]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <audio
        ref={audioRef}
        src="/sounds/Zara Zara Mehekta Hai (PenduJatt.Com.Se).mp3"
        preload="auto"
      />

      {!hasInteracted ? (
        <>
          <button
            onClick={() => {
              setHasInteracted(true);
              if (audioRef.current) {
                audioRef.current.play().catch(() => {});
              }
            }}
            className="px-4 py-2 m-5 rounded-full font-semibold flex items-center space-x-3 text-white animated-gradient transition duration-300 hover:brightness-110 hover:shadow-lg"
          >
            <span className="text-lg">Play Sound & Start</span>
            <img
              src="/images/image.png"
              alt="AI Icon"
              className="w-8 h-8 rounded-xl"
            />
          </button>

          <style jsx>{`
            .animated-gradient {
              background: linear-gradient(
                270deg,
                #06b6d4,
                #8b5cf6,
                #ec4899,
                #8b5cf6
              );
              background-size: 600% 600%;
              animation: gradientShift 10s ease infinite;
            }

            @keyframes gradientShift {
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
      ) : (
        <>
          {/* Stop Button */}
          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
              }
              setHasInteracted(false);
            }}
            className="absolute top-5 right-5 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
          >
            Stop
          </button>

          {/* Animated content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-white text-center mt-8"
          >
            <p className="text-xl mb-4">Welcome to the Future of AI</p>
            <h1 className="text-4xl font-bold mb-4">
              Accelerate your hiring with AI.
            </h1>
            {/* Add more motion components/images as needed */}
          </motion.div>
        </>
      )}

      {/* === Neon Animated Background === */}
      <div className="absolute inset-0 -z-10">
        <style jsx>{`
          @keyframes float1 {
            0%,
            100% {
              transform: translate(0, 0) scale(1);
            }
            50% {
              transform: translate(-50px, 30px) scale(1.1);
            }
          }
          @keyframes float2 {
            0%,
            100% {
              transform: translate(0, 0) scale(1);
            }
            50% {
              transform: translate(60px, -40px) scale(1.05);
            }
          }
          @keyframes float3 {
            0%,
            100% {
              transform: translate(0, 0) scale(1);
            }
            50% {
              transform: translate(-30px, 60px) scale(1.15);
            }
          }
          .animate-float1 {
            animation: float1 8s ease-in-out infinite;
            top: 10%;
            left: 20%;
          }
          .animate-float2 {
            animation: float2 10s ease-in-out infinite;
            bottom: 20%;
            right: 25%;
          }
          .animate-float3 {
            animation: float3 12s ease-in-out infinite;
            top: 40%;
            right: 10%;
          }
        `}</style>

        <div className="w-full h-full bg-gradient-to-br from-black via-[#0f0f2d] to-[#1a0033]" />
        <div className="absolute w-[400px] h-[400px] bg-blue-700 opacity-30 rounded-full blur-3xl animate-float1" />
        <div className="absolute w-[300px] h-[300px] bg-purple-600 opacity-25 rounded-full blur-2xl animate-float2" />
        <div className="absolute w-[500px] h-[500px] bg-indigo-500 opacity-20 rounded-full blur-3xl animate-float3" />
      </div>

      {/* === Hero Section === */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 mt-10 gap-10">
        <div className="max-w-xl space-y-6">
          <motion.p
            className="text-sm uppercase text-purple-400 tracking-wide"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
          >
            Cyber Triks – Learn Cybersecurity. Protect the Future. Master
            Ethical Hacking, Network Security & More with Certified Experts.
          </motion.p>
          <style>{`
        @keyframes glow {
          0%, 100% {
            text-shadow:
              0 0 5px #a855f7,
              0 0 10px #7c3aed,
              0 0 20px #8b5cf6,
              0 0 30px #a78bfa,
              0 0 40px #c4b5fd;
          }
          50% {
            text-shadow:
              0 0 10px #d8b4fe,
              0 0 20px #c084fc,
              0 0 30px #a855f7,
              0 0 40px #7c3aed,
              0 0 50px #6d28d9;
          }
        }
      `}</style>
          <motion.h1
            style={glowAnimation}
            initial={{ y: 40, opacity: 0 }} // Start lower
            animate={{ y: 0, opacity: 1 }} // Move up and fade in
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.7 }} // Delay after paragraph
          >
            Don’t just study security,
            <br />
            Master it with Cyber Trik, real-world attacks.
          </motion.h1>
          <h2
            style={{
              fontSize: "1.8rem",
              color: "#00ffff",
              minHeight: "2rem",
              marginBottom: "2rem",
            }}
          >
            {text}
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "1.5rem",
                backgroundColor: "#00ffff",
                marginLeft: "3px",
                animation: "blink 1s step-start infinite",
              }}
            ></span>
          </h2>
          <AnimatedContent
            blur={true}
            duration={1000}
            easing="ease-out"
            initialOpacity={0}
          >
            <div className="space-x-4 flex items-center">
              <button
                onClick={goToRegister}
                className="mt-6 bg-white/10 backdrop-blur-md text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition transform duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,1)] z-10 border border-white/20"
              >
                🔐 Join Cyber Triks
              </button>

              <a
                href="#"
                className="mt-6 text-purple-400 font-medium hover:underline"
              >
                💬 Get Free Counseling
              </a>
            </div>
          </AnimatedContent>
        </div>

        {/* === Image + Floating Badges === */}
        <div className="relative pt-5">
          <div className="absolute top-1 -left-30.5 p-3 rounded-lg shadow-md flex items-center gap-2   bg-white/10 backdrop-blur-md text-white font-bold   hover:scale-105 transition transform duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,1)] z-10 border border-white/20">
            <div className="bg-red-100 text-red-600 p-2 rounded-full text-sm">
              📁
            </div>
            <span> Explore Courses </span>
          </div>

          <div className="absolute -bottom-10 -right-1.5 -translate-x-1/2 p-3 rounded-lg shadow-md flex items-center gap-2   bg-white/10 backdrop-blur-md text-white font-bold   hover:scale-105 transition transform duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,1)] z-10 border border-white/20">
            <div className="text-yellow-500 text-sm">⭐</div>
            <span>Get Free Consultation</span>
          </div>

          <div>
            <style>
              {`
          @keyframes pulse-ring {
            0% {
              transform: scale(1);
              opacity: 0.6;
            }
            70% {
              transform: scale(1.5);
              opacity: 0;
            }
            100% {
              transform: scale(1.6);
              opacity: 0;
            }
          }
        `}
            </style>

            <div className="relative z-10">
              {/* Animated Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 blur-lg opacity-70 animate-[pulse-ring_2s_ease-in-out_infinite]"></div>

              {/* Avatar */}
              <motion.div
                className="relative rounded-full bg-gradient-to-tr backdrop-blur-md font-bold"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 10,
                  delay: 1.2,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(99,102,241,1)",
                }}
              >
                <motion.div
                  animate={glowControls}
                  className="rounded-full w-72 h-72"
                >
                  <img
                    src="https://www.shutterstock.com/image-photo/3d-logo-design-circle-chinese-600nw-2532348269.jpg"
                    alt="Smiling Woman"
                    className="rounded-full w-72 h-72 object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* === Banners + Categories === */}
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
        <Slider />
      </div>

      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
        <Links />
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
        <Links2 />
      </div>
      <footer class="bg-gray-800 text-white pt-12 pb-6">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 class="text-lg font-bold mb-4 flex items-center">
                <i class="fas fa-crown text-primary-400 mr-2"></i>
                Cyber Triks
              </h3>
              <p class="text-gray-400 mb-4">
                Cyber Triks – Empowering students with real-world tech skills
                through hands-on training in today’s most in-demand courses.
              </p>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <i class="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 class="font-semibold mb-4">Customer Service</h4>
              <ul class="space-y-2">
                <li>
                  <a
                    href="mailto:nsouvik555@gmail.com"
                    class="text-gray-400 hover:text-white transition"
                  >
                    Contact Us
                  </a>
                </li>

                <li>
                  <a href="#" class="text-gray-400 hover:text-white transition">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white transition">
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white transition">
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white transition">
                    Size Guide
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-4">About Us</h4>
              <ul class="space-y-2">
                <li>
                  <a href="#" class="text-gray-400 hover:text-white transition">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white transition">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white transition">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-4">Contact Info</h4>
              <ul class="space-y-2 text-gray-400">
                <li class="flex items-center">
                  <i class="fas fa-phone-alt mr-2"></i>
                  (555) 123-4567
                </li>
                <li class="flex items-center">
                  <i class="fas fa-envelope mr-2"></i>
                  info@luxefashion.com
                </li>
              </ul>
            </div>
          </div>
          <div class="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div class="mb-4 md:mb-0">
              <p class="text-gray-400 text-sm">
                © 2023 LuxeFashion. All rights reserved.
              </p>
            </div>
            <div class="flex space-x-6">
              <a
                href="#"
                class="text-gray-400 hover:text-white text-sm transition"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-white text-sm transition"
              >
                Terms of Service
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-white text-sm transition"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
