import React from "react";
import { useProducts } from "../Store/ProductContext";
import { useCart } from "../Store/CartContext";
import { useAuth } from "../Store/AuthContext"; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link

const ProductList = () => {
  const navigate = useNavigate();

  const { currentProduct, filtered, currentPage, setCurrentPage } = useProducts();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth(); // assumes isLoggedIn is provided from AuthContext

  const totalPages = Math.ceil(filtered.length / 6);

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      alert("Please login to add items to cart.");
      navigate("/login");
      return;
    }
    addToCart(product);
  };
  

  return (
    <div className="cona">
      <div className="product-cards">
        {currentProduct.map((datap) => (
           
          <article key={datap.id}>
           {/* Wrap only the image and title inside Link */}
    <Link to={`/product/${datap.id}`} className="block">
      <figure className="px-4 pt-4">
        <img src={datap.image} alt={datap.name} />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title capitalize tracking-wider">{datap.name}</h2>
      </div>
    </Link>
    
    {/* Keep Add to Cart button outside Link */}
    <div className="bodycon px-4">
<span className="text-secondary datprice">₹{datap.price}</span>
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent navigation when clicking the button
        handleAddToCart(datap);
      }}
      className="btn  btn-brs  font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded"
    >
      Add to Cart
    </button>
    </div>
    
          </article>
        
        ))}
      </div>

      <div className="mt-16 mb-16 pagination flex gap-2 justify-end">
        <div className="joins">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`btn probtn ${
                currentPage === index + 1 ? "btn-primary" : "btn-outline"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
