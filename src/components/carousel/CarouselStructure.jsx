import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './CarouselStructure.css';

// Importação segura das imagens (removidas as duplicadas/vazias)
import image1 from "../../assets/images/carouselimage/CarouselHamburgers.jpg";
import image3 from "../../assets/images/carouselimage/CarouselColdDrinks.jpg";
import image4 from "../../assets/images/carouselimage/CarouselHotDrink.jpg";
import image6 from "../../assets/images/carouselimage/CarouselDesserts.jpg";

// Lista de categorias organizada
const categories = [
    { id: 'hamburgers', label: 'Hamburgers', img: image1 },
    { id: 'cold-drinks', label: 'Bebidas Geladas', img: image3 },
    { id: 'hot-drinks', label: 'Bebidas Quentes', img: image4 },
    { id: 'desserts', label: 'Sobremesas', img: image6 },
];

function CarouselStructure() {
    const carousel = useRef();
    const [width, setWidth] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('hamburgers');

    useEffect(() => {
        if (carousel.current) {
            // Calcula o limite do arraste (total menos o que é visível)
            setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
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