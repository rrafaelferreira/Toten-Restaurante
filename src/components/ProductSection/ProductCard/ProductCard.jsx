import './ProductCard.css'

function ProductCard({ product }) {

    return (

        <div className="product-card">

            <img
                src={product.image}
                alt={product.name}
            />
            <h2>{product.name}</h2>
            <p>
                R$ {product.price.toFixed(2)}
            </p>
            <button>
                Adicionar
            </button>
        </div>
    )
}

export default ProductCard