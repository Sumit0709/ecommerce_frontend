import React from 'react'
import ImageHelper from './helper/ImageHelper';

const Card = ({
    product,
    addToCart = true,
    removeFromCart = false
}) => {
    console.log(product);
    const cardTitle = product.name? product.name: "Default product title";
    const cardDescription = product.description? product.description: "Default product description";
    const cardPrice = product.price? product.price: "XX.XX";

    const showAddToCart = (addToCart) => {
        return (
            addToCart && <button
                onClick={() => {}}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
        )
    }

    const showRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && <button
            onClick={() => {}}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        )
    }


    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardTitle}</div>
        <div className="card-body">
          <ImageHelper product={product}/>
          <p className="lead bg-success font-weight-normal text-wrap">
            {cardDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">Rs. {cardPrice}</p>
          <div className="row">
            <div className="col-12">
              {showAddToCart(addToCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Card