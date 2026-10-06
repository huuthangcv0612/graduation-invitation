import { useState } from 'react';
import { Envelope } from './components/Envelope';
import { Hero } from './components/Hero';
import { Invitation } from './components/Invitation';
import { EventDetails } from './components/EventDetails';
import { Countdown } from './components/Countdown';
import { Location } from './components/Location';
import { SchoolMap } from './components/SchoolMap';
import { Timeline } from './components/Timeline';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';
import { FloatingNavigation } from './components/FloatingNavigation';

export function App() {
  const [isOpened, setIsOpened] = useState(false);

  const handleScrollToInvitation = () => {
    const el = document.getElementById('invitation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isOpened) {
    return <Envelope onOpen={() => setIsOpened(true)} />;
  }

  return (
    <div className="relative min-h-screen bg-ivory-100 text-charcoal font-sans selection:bg-champagne-gold/20 selection:text-charcoal overflow-x-hidden">
      {/* Floating Navigation Dots */}
      <FloatingNavigation />

      {/* Main Invitation Page Sections */}
      <main>
        <Hero onScrollToInvitation={handleScrollToInvitation} />
        <Invitation />
        <EventDetails />
        <Countdown />
        <Location />
        <SchoolMap />
        <Timeline />
        <Gallery />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Audio Controls */}
      <MusicPlayer />
    </div>
  );
}

export default App;
