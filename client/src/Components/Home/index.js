import React from 'react';
import MainSlider from './MainSlider';
import About from './About';
import ProductSlider from './ProductSlider';
import listItems from './listItems';

const Home = () => {
    return(
        // <div className="app container">
        <div>
            <MainSlider slide={listItems[0]}/>
            <ProductSlider />
            <About />
        </div>
        
    );
}

export default Home;