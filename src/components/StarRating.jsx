import React from "react";
import Star from "./Helpers/icons/Star";

const StarRating = ({ rating = 0 }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<i class="ri-star-fill text-yellow-400"></i>);
      } else {
        stars.push(<i class="ri-star-line text-yellow-400"></i>);
      }
    }
    return stars;
  };
  return <div>{renderStars()}</div>;
};

export default StarRating;
