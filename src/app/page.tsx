import React, { Suspense } from 'react';
import CarCostsPage from './car-costs/page';
import { Pacifico } from 'next/font/google';

const pacificoFont = Pacifico({ weight: '400', subsets: ['latin'] });
const Home = () => {
  return (
    <div>
      <h1
        className={`text-center mt-9 text-8xl text-white ${pacificoFont.className}`}
      >
        CalCarX
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CarCostsPage />
      </Suspense>
    </div>
  );
};

export default React.memo(Home); // Memoize Home component
