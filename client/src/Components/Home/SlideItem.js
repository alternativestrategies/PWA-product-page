import React from 'react';

const SlideItem = (props) => {
    return(
        
            <div className="item-slide">
              <img src={props.img} alt={props.alt}/>
            </div>
         
    );
}

export default SlideItem;