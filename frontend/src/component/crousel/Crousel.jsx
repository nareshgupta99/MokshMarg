import React from 'react'
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const Crousel = () => {


    return (
        <Carousel showArrows={true} interval={3000} infiniteLoop={true} >
            <div>
                <img src="https://www.w3schools.com/howto/img_nature_wide.jpg"  />
                <p className="legend">Legend 1</p>
            </div>

            <div>
                <img src="https://www.w3schools.com/howto/img_nature_wide.jpg"  />
                <p className="legend">Legend 1</p>
            </div>
           
        </Carousel>
    )
}



export default Crousel