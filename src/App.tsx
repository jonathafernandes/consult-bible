import React from 'react';

import { VerseDetails } from './components/VerseDetails';
import { Header } from './components/Header';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <VerseDetails />
    </div>
  );
};

export default App;
