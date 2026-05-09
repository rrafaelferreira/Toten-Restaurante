import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './CarouselStructure.css';

// Importação segura das imagens (removidas as duplicadas/vazias)
import image1 from "../../assets/images/carouselimage/CarouselHamburgers.jpg";
import image2 from "../../assets/images/carouselimage/sidedishescarousel.jpg";
import image3 from "../../assets/images/carouselimage/CarouselColdDrinks.jpg";
import image4 from "../../assets/images/carouselimage/drinkscarousel.jpg";
import image5 from "../../assets/images/carouselimage/CarouselHotDrink.jpg";
import image6 from "../../assets/images/carouselimage/CarouselDesserts.jpg";
import image7 from "../../assets/images/carouselimage/milkshakescarousel.jpg";


// Lista de categorias organizada
const categories = [
    { id: 'hamburgers', label: 'Hamburgers', img: image1 },
    { id: 'Sidedishes', label: 'Side Dishes',  img: image2 },
    { id: 'cold-drinks', label: 'Bebidas Geladas', img: image3 },
    { id: 'drinks', label: 'Drinks', img: image4 },
    { id: 'hot-drinks', label: 'Bebidas Quentes', img: image5 },
    { id: 'desserts', label: 'Sobremesas', img: image6 },
    { id: 'milk-shakes', label: 'Milk Shakes',  img: image7 },
];

function CarouselStructure({ selectedCategory, setSelectedCategory }) { 
    const carousel = useRef();
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (carousel.current) {
            const scrollWidth = carousel.current.scrollWidth;
            const offsetWidth = carousel.current.offsetWidth;

            setWidth(scrollWidth - offsetWidth + 20);
        }
    }, []);

    return (
        <div className="CarouselStructure">
            <motion.div
                ref={carousel}
                className="carousel"
                whileTap={{ cursor: "grabbing" }}
            >
                <motion.div
                    className="inner"
                    drag="x"
                    dragConstraints={{
                        right: 0,
                        left: -width
                    }}
                >
                    {categories.map((cat) => (
                        <motion.div
                            key={cat.id}
                            className={`item ${selectedCategory === cat.id ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedCategory(cat.id);
                                console.log("Categoria selecionada:", cat.id);
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="img-wrapper">
                                <img
                                    src={cat.img}
                                    alt={cat.label}
                                />
                            </div>
                            <p>{cat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}

export default CarouselStructure;