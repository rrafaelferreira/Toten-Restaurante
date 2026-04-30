import './ProductsSection.css'
import { produtos } from "../../data/Products/Products";
import ProductCard from './ProductCard/ProductCard'

function ProductSection({ selectedCategory }) {

    const filteredProducts = produtos.filter(
        product => product.category === selectedCategory
    )

    return (

        <div className="product-section">
            {filteredProducts.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    )
}

export default ProductSection