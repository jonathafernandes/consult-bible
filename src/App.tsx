import React from 'react';

import { VerseDetails } from './components/VerseDetails';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <VerseDetails />
      <Footer />
    </div>
  );
};

export default App;