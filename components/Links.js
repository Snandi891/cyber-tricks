import React from "react";

const Links = () => {
  const videos = [
    { src: "/videos/myvideo.mp4" },
    { src: "/videos/myvideo.mp4" },
    { src: "/videos/myvideo.mp4" },
  ];

  return (
    <div className="w-full bg-transparent py-10 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
        Watch Our Video
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {videos.map((video, index) => (
          <div
            key={index}
            className="w-full rounded-lg overflow-hidden shadow-lg"
          >
            <video className="w-full h-auto rounded-lg" controls>
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Links;
