import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselBackground = () => {
  const slides = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/238118/pexels-photo-238118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'First Slide',
      description: 'This is the description for the first slide.'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/8250831/pexels-photo-8250831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Second Slide',
      description: 'This is the description for the second slide.'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/322338/pexels-photo-322338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Third Slide',
      description: 'This is the description for the third slide.'
    }
  ];

  return (
    <Carousel controls={false} indicators={false} interval={7000} fade={true} className="carousel-container">
      {slides.map(slide => (
        <Carousel.Item key={slide.id}>
          <div
            style={{
              backgroundImage: `linear-gradient(to bottom right, rgba(192, 192, 192, 0.8), rgba(255, 255, 255, 0.8)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100vh',
              width: '100vw',
              position: 'relative',  // Ensure carousel content is behind navbar
              transition: 'opacity 1s ease-in-out',
            }}
          >
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselBackground;
