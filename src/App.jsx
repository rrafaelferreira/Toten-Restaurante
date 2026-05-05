import { useState } from 'react'
import ProductSection from './components/ProductSection/ProductsSection'
import CarouselStructure from "./components/carousel/CarouselStructure";

function App() {

    const [selectedCategory, setSelectedCategory] =
        useState('hamburgers')

    return (
        <div className='main-app-container'>
            <CarouselStructure
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <ProductSection
                selectedCategory={selectedCategory}
            />
        </div>
    )
}

export default App