import { useState, useEffect } from 'react';
import './ProductsSection.css';
import ProductCard from './ProductCard/ProductCard';

// Adicionado a prop onAdicionarAoCarrinho vinda do Menu.jsx
function ProductSection({ selectedCategory, onAdicionarAoCarrinho }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://pedidos-totem.onrender.com/produtos/listar')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(
                    'Não foi possível carregar os produtos.'
                );
            })
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error(
                    'Erro na integração:',
                    error
                );
            });
    }, []);

    // FILTRO COM TRADUTOR DE CATEGORIAS
    const filteredProducts = products.filter(product => {
        if (!selectedCategory) return false;

        const categoriaDoBanco = (product.categoria || product.category || "")
            .toLowerCase()
            .replace(/[- ]/g, "")
            .trim();
        
        const clicada = selectedCategory
            .toLowerCase()
            .replace(/[- ]/g, "")
            .trim();

        if (clicada === "hamburgers" && categoriaDoBanco === "hamburguer") return true;
        if (clicada === "sidedishes" && categoriaDoBanco === "sidedishes") return true; 
        if (clicada === "colddrinks" && categoriaDoBanco === "bebidasgeladas") return true; 
        if (clicada === "drinks" && categoriaDoBanco === "drinks") return true;
        
        if (clicada === "hotdrinks" && (categoriaDoBanco === "bebidasquentes" || categoriaDoBanco === "hotdrinks")) return true; 
        
        if (clicada === "desserts" && categoriaDoBanco === "sobremesas") return true; 
        if (clicada === "milkshakes" && categoriaDoBanco === "milkshakes") return true; 

        return categoriaDoBanco === clicada;
    });

    if (products.length === 0) {
        return <div className="loading">Carregando produtos...</div>;
    }

    return (
        <div className="product-section">
            {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                    <ProductCard
                        key={product.idProduto || product.nomeProduto} 
                        product={product}
                        // Repassa a função para o Card
                        onAdicionarAoCarrinho={onAdicionarAoCarrinho} 
                    />
                ))
            ) : (
                <div className="no-products">Nenhum produto encontrado nesta categoria.</div>
            )}
        </div>
    );
}

export default ProductSection;