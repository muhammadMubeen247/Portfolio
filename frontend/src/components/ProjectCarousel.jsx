import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ProjectCarousel({ images, name }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div className="project-image-placeholder">Add screenshots</div>;
  }

  const goPrev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="project-carousel">
      <div className="project-carousel-viewport">
        <img src={images[index]} alt={`${name} screenshot ${index + 1}`} />

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="carousel-arrow carousel-arrow-prev"
              onClick={goPrev}
              aria-label="Previous screenshot"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="carousel-arrow carousel-arrow-next"
              onClick={goNext}
              aria-label="Next screenshot"
            >
              <ChevronRight size={20} />
            </button>
            <div className="carousel-counter">
              {index + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="carousel-dots">
          {images.map((src, i) => (
            <button
              type="button"
              key={src || i}
              className={`carousel-dot${i === index ? " active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to screenshot ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectCarousel;
