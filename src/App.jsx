import { useState } from 'react'
import ProductSection from './components/ProductSection/ProductsSection'
import CarouselStructure from "./components/carousel/CarouselStructure";

function App() {

    const [selectedCategory, setSelectedCategory] =
        useState('hamburgers')

    return (
        <>
            <CarouselStructure
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <ProductSection
                selectedCategory={selectedCategory}
            />
        </>
    )
}

export default App