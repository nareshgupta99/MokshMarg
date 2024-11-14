import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { crauselData } from '../../data/crauselData';

const Crousel = () => {


    return (
        <Carousel showArrows={true} interval={3000} infiniteLoop={true} >

            {crauselData.map((crausel, index) => (

                <div key={index}>
                    <img src={crausel.link} alt={crausel.name} />
                    <p className="legend">{crausel.name}</p>
                </div>
            ))}


        </Carousel>
    )
}



export default Crousel