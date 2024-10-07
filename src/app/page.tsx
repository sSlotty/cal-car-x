'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Pacifico } from 'next/font/google';
import { Spin } from 'antd';

// Load Pacifico font
const pacificoFont = Pacifico({ weight: '400', subsets: ['latin'] });

// Dynamically import CarCostsPage without SSR and show loading spinner while loading
const CarCostsPage = dynamic(() => import('./car-costs/page'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Spin size="large" />
    </div>
  ),
});

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false); 
    }, 100); 

    return () => clearTimeout(timeout); 
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <h1
        className={`text-center mt-9 text-8xl text-white ${pacificoFont.className}`}
      >
        CalCarX
      </h1>
      <CarCostsPage />
    </div>
  );
};

export default React.memo(Home);
