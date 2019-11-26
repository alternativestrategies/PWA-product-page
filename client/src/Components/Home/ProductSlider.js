import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';


const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true
      }
    },
    {
      breakpoint: 930,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true
      }
    }
  ]
}

const ProductSlider = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try{
      const res = await fetch('api/products');
      const text = await res.text();
        const response = text.length ? JSON.parse(text) : {}
      setProducts(response)
    }
    catch (error){
      throw error;
    }
  }

  useEffect(() => {
    fetchProducts()
  }, []);

    
  return(
<div className="slider">  
      <h2 className="pt-4 pb-2">Search Products</h2>  
        <Slider {...settings}>
          {products
          .map( p => 
            <div key={p.product_id} className="slide">
            <img 
              src={`assets/img/${p.product_img}`}
              alt={p.product_name}/>
            </div>

            )}
        </Slider>
      </div>
  );
}

export default ProductSlider;