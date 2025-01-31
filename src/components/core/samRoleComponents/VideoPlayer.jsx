import React, {  useState } from "react";

const VideoPlayer = ({ videoUrl, title }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <video
        key={videoUrl} // Forces reloading of video
        src={videoUrl}
        controls
        autoPlay
        className="w-full rounded-md shadow-md"
      />
    </div>
  );
};

export default VideoPlayer;
