import { useState } from 'react'
import ProductSection from './components/ProductSection/ProductsSection'
import CarouselStructure from "./components/carousel/CarouselStructure";

function App() {
    const [selectedCategory, setSelectedCategory] = useState('hamburgers');

    return (
        <div className='main-app-container'>
            {/* Criamos uma div que abraça os dois e tem o fundo preto */}
            <div className="bg-secao-produtos" style={{ backgroundColor: '#111', minHeight: '100vh' }}>
                <CarouselStructure
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                <ProductSection
                    selectedCategory={selectedCategory}
                />
            </div>
        </div>
    );
}

export default App