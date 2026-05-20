import { useState, useEffect } from 'react';
import './ProductsSection.css';
import ProductCard from './ProductCard/ProductCard';

function ProductSection({ selectedCategory }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://pedidos-totem.onrender.com/produtos/listar')
            .then((response) => {
                // verifica se a resposta deu certo
                if (response.ok) {
                    return response.json();
                }
                // se der erro
                throw new Error(
                    'Não foi possível carregar os produtos.'
                );
            })
            .then((data) => {
                // salva os produtos no estado
                setProducts(data);
            })
            .catch((error) => {
                console.error(
                    'Erro na integração:',
                    error
                );
            });
    }, []);

    // FILTRO COM TRADUTOR DE CATEGORIAS (Super flexível contra hífens, espaços e maiúsculas)
    const filteredProducts = products.filter(product => {
        // Evita quebra se selectedCategory não estiver definida ou nula no início
        if (!selectedCategory) return false;

        // 1. Pega o campo do banco e limpa tudo (ex: "Side Dishes" ou "Bebidas Geladas" vira "sidedishes" ou "bebidasgeladas")
        const categoriaDoBanco = (product.categoria || product.category || "")
            .toLowerCase()
            .replace(/[- ]/g, "")
            .trim();
        
        // 2. Pega a categoria vinda do carrossel e limpa da mesma forma (ex: "hot-drinks" vira "hotdrinks")
        const clicada = selectedCategory
            .toLowerCase()
            .replace(/[- ]/g, "")
            .trim();

        // 3. Tradutor com os textos já normalizados
        if (clicada === "hamburgers" && categoriaDoBanco === "hamburguer") return true;
        if (clicada === "sidedishes" && categoriaDoBanco === "sidedishes") return true; 
        if (clicada === "colddrinks" && categoriaDoBanco === "bebidasgeladas") return true; 
        if (clicada === "drinks" && categoriaDoBanco === "drinks") return true;
        
        // Mapeia "hotdrinks" do carrossel para possíveis variações do banco (inglês ou português)
        if (clicada === "hotdrinks" && (categoriaDoBanco === "bebidasquentes" || categoriaDoBanco === "hotdrinks")) return true; 
        
        if (clicada === "desserts" && categoriaDoBanco === "sobremesas") return true; 
        if (clicada === "milkshakes" && categoriaDoBanco === "milkshakes") return true; 

        // Caso os nomes limpos passem a ser perfeitamente iguais
        return categoriaDoBanco === clicada;
    });

    // Se a API ainda estiver carregando os produtos (array vazio), mostra o aviso
    if (products.length === 0) {
        return <div className="loading">Carregando produtos...</div>;
    }

    return (
        <div className="product-section">
            {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                    <ProductCard
                        key={product.nomeProduto} // Usando o nome do produto como key única
                        product={product}
                    />
                ))
            ) : (
                <div className="no-products">Nenhum produto encontrado nesta categoria.</div>
            )}
        </div>
    );
}

export default ProductSection;