import { motion } from 'framer-motion';

import image1 from "../../assets/images/hamburgercarousel.jpg";
import image2 from "../../assets/images/bebidafriacarousel.jpg";
import image3 from "../../assets/images/bebidaquentecarousel.jpg";
import image4 from "../../assets/images/sobremesacarousel.jpg";

const images = [image1, image2, image3, image4]

function CarouselStructure() {
    return(
        <div className="CarouselStructure">

            <motion.div className="carousel">
                <motion.div className="inner">

                    {images.map(image => (
                        <motion.div key={image}>
                            <img src={image} alt="" />
                        </motion.div>
                    ))}

                </motion.div>
            </motion.div>

        </div>
    );  
}

export default CarouselStructure;