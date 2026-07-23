import { useState } from 'react';
import './vehicle-gallery.scss';

interface VehicleGalleryProps {
  images: string[];
  title: string;
}

export const VehicleGallery = ({ images, title }: VehicleGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="vehicle-gallery">
      <div className="vehicle-gallery__main">
        <img
          src={selectedImage}
          alt={title}
          className="vehicle-gallery__image"
        />
      </div>
      <div className="vehicle-gallery__thumbnails">
        {images.map((image, index) => (
          <button
            key={index}
            className={`vehicle-gallery__thumbnail ${
              selectedImage === image ? 'vehicle-gallery__thumbnail_active' : ''
            }`}
            onClick={() => setSelectedImage(image)}
            aria-label={`View image ${index + 1}`}
          >
            <img src={image} alt={`${title} thumbnail ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
};
