import React from "react";

const Card = ({ plant: { name, origin, temperament, affection_level } }) => {
  return (
    <div className="movie-card">
      <img src={"/src/assets/card-image.jpg"} alt={name} />

      <div className="mt-4">
        <h3>{name}</h3>

        <div className="content">
          <div className="rating">
            <img src="/src/assets/star.svg" alt="Star Icon" />
            <p>{affection_level ? affection_level.toFixed(1) : "N/A"}</p>
          </div>
          <span>•</span>
          <p className="lang">{origin}</p>
          <p className="year">{temperament}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
