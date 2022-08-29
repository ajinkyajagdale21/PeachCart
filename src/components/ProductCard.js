import React from "react";
import { useData } from "../dataContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import axios from "axios";
import toast from "react-hot-toast";

export const ProductCard = ({ product }) => {
  const { state, dispatch } = useData();
  const {
    state: { token, userId },
  } = useAuth();
  const navigate = useNavigate();
  const addToCartClicked = async (prodID) => {
    if (token) {
      try {
        const {
          data: { product },
        } = await axios.post(
          `https://afternoon-escarpment-40154.herokuapp.com/cart/${userId}`,
          { productId: prodID }
        );
        dispatch({ type: "ADD_TO_CART", payload: product });
        toast.success("Product Added to cart");
      } catch (error) {
        console.error(error);
      }
    }
  };
  const addToWishlistClicked = async (prodID) => {
    if (token) {
      try {
        const {
          data: { product },
        } = await axios.post(
          `https://afternoon-escarpment-40154.herokuapp.com/wishlist/${userId}`,
          { productId: prodID }
        );
        dispatch({ type: "ADD_TO_WISHLIST", payload: product });
      } catch (error) {
        console.error(error);
      }
    }
  };
  const isCartEmpty = (ProdId) => {
    const foundProduct = state.cart.find((product) => product._id === ProdId);
    return foundProduct ? true : false;
  };
  const isWishListEmpty = (ProdId) => {
    const foundProduct = state.wishlist.find(
      (product) => product._id === ProdId
    );
    return foundProduct ? true : false;
  };
  return (
    <div
      className="card product-card"
      style={{ width: "18rem" }}
      key={product._id}
    >
      <img className="card-img-top" src={product.image} alt="product" />
      <div className="card-body">
        <h5 className="card-title">{product.productName}</h5>

        <h2 className="badge text-bg-dark" style={{ margin: "0.5rem 0rem" }}>
          Rating: {product.ratings} ⭐
        </h2>
        <p style={{ fontWeight: "600" }} className="card-text ">
          Price: ${product.price}
        </p>
        {isCartEmpty(product._id) ? (
          <Link to="/cart">
            <button className="btn btn-success">Go To Cart</button>
          </Link>
        ) : (
          <button
            className="btn btn-success"
            onClick={() =>
              token ? addToCartClicked(product._id) : navigate("/login")
            }
          >
            Add to cart
          </button>
        )}
        {isWishListEmpty(product._id) ? (
          <Link to="/wishlist">
            <button className="btn btn-success">Go To WishList</button>
          </Link>
        ) : (
          <button
            className="btn btn-success"
            onClick={() =>
              token ? addToWishlistClicked(product._id) : navigate("/login")
            }
          >
            Add to wishlist
          </button>
        )}
        <button className="btn btn-light">
          <Link
            to={`/product/${product._id}`}
            style={{ textDecoration: "none" }}
          >
            {" "}
            View Details{" "}
          </Link>
        </button>
      </div>
    </div>
  );
};
