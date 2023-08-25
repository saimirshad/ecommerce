import Image, { StaticImageData } from "next/image";
import React from "react";

interface EventCardProps {
  heading: string;
  img?: string;
  description?: string;
  promo?: string;
  buttonDesc?: string;
  color?: string;
}

const EventCard = ({
  heading,
  img,
  description,
  promo,
  buttonDesc,
  color,
}: EventCardProps) => {
  return (
    <div className={`flex justify-between bg-${color}-500`}>
      <div className="flex flex-col">
        <h1>{heading}</h1>
        <h4>{description}</h4>
      </div>

      <div>
        <img src={img} alt="img" />
      </div>
    </div>
  );
};

export default EventCard;
