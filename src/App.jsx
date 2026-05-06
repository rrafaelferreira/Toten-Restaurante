function App() {
    const [selectedCategory, setSelectedCategory] = useState('hamburgers');

    return (
        <div className='main-app-container'>
            {/* Criamos uma div que abraça os dois e tem o fundo preto */}
            <div className="bg-secao-produtos" style={{ backgroundColor: '#111' }}>
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