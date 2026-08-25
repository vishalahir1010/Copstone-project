import React from "react";

function PlaylistCard({ image, name, songs }) {
  return (
    <div className="playlist-card">
      <img
        src={image}
        alt={name}
        className="album-image"
      />

      <h3>{name}</h3>

      <p>{songs} songs</p>
    </div>
  );
}

export default PlaylistCard;