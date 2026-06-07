export const dynamic = 'force-dynamic';
import React from 'react';

// Main Layout Components
import { AnnouncementBar } from './components/landing/AnnouncementBar';
import { Navbar } from './components/shared/Navbar';
import { HeroSection } from './components/landing/HeroSection';
import { CollectionSection } from './components/landing/CollectionsSection';
import { FreshDropsSection } from './components/landing/FreshDropsSection';
import { BestSellersSection } from './components/landing/BestsellersSection';
import { InstagramSection } from './components/landing/FollowUsSection';
import { Footer } from './components/shared/Footer';

/**
 * Rangoli Shoes Landing Page
 * Optimized for Mobile-First PWA usage.
 */
const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      
      {/* Fixed Header Stack */}
      <header className="fixed top-0 w-full z-50 ">
        <AnnouncementBar />
        <Navbar />
      </header>

      {/* Main Content Area */}
      {/* pt-28 ensures content starts below the fixed Announcement + Nav bar */}
      <main className="grow pt-22 md:pt-26">
        
        {/* 1. Hero: Brand identity and primary CTA */}
        <HeroSection />

        {/* 2. Collections: Strategic category entry points */}
        <CollectionSection />

        {/* 3. Fresh Drops: Dynamic section with API integration */}
        <section id="new-arrivals">
          <FreshDropsSection />
        </section>

        {/* 5. Bestsellers: High-conversion social proof section */}
        <section id="bestsellers">
          <BestSellersSection />
        </section>

        {/* 6. Social Feed: Engagement and brand trust */}
        <InstagramSection />

      </main>

      {/* Footer: Navigation depth and SEO links */}
      <Footer />

    </div>
  );
};

export default LandingPage;