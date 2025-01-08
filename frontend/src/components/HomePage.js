import React, { useEffect, useState, useRef } from 'react';
import Carousel from './Carousel';
import '../CSS/homepage.css';
import ReviewsSection from './Reviews-Section';
import DataSection from './HomepageDataSection';
import HomepageCampaign from './homepage_campaign';
import WhatCanYouDo from './whatcanyoudo';
import RatingSection from './TrustPilot';

function HomePage() {
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target.getAttribute('data-section');
            setVisibleSections((prev) => ({ ...prev, [section]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getRef = (key) => (element) => {
    sectionRefs.current[key] = element;
  };

  return (
    <>
      <div
        ref={getRef('carousel')}
        data-section="carousel"
        className={`fade-in-section ${visibleSections.carousel ? 'visible' : ''}`}
      >
        <Carousel />
      </div>
      <div
        ref={getRef('data')}
        data-section="data"
        className={`fade-in-section ${visibleSections.data ? 'visible' : ''}`}
      >
        <DataSection />
      </div>
      <div
        ref={getRef('campaign')}
        data-section="campaign"
        className={`fade-in-section ${visibleSections.campaign ? 'visible' : ''}`}
      >
        <HomepageCampaign />
      </div>
      <div
        ref={getRef('wcyd')}
        data-section="wcyd"
        className={`fade-in-section ${visibleSections.wcyd ? 'visible' : ''}`}
      >
        <WhatCanYouDo />
      </div>
      <div
        ref={getRef('reviews')}
        data-section="reviews"
        className={`fade-in-section ${visibleSections.reviews ? 'visible' : ''}`}
      >
        <ReviewsSection />
      </div>
      <div
        ref={getRef('rating')}
        data-section="rating"
        className={`fade-in-section ${visibleSections.rating ? 'visible' : ''}`}
      >
        <RatingSection />
      </div>
    </>
  );
}

export default HomePage;
