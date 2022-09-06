import Navbar from '../../components/Navbar/Navbar';
import React from 'react';
import Banner from 'components/Banner/Banner';

const Shop = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="mt-11">
        <Banner />
      </main>
    </React.Fragment>
  );
};

export default Shop;
