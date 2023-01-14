import React, { useEffect } from "react";
import { useData } from "../dataContext";
import axios from "axios";
import { useAuth } from "../authContext";
import toast from "react-hot-toast";

export const Cart = () => {
  const { state, dispatch } = useData();
  const {
    state: { userId, token },
  } = useAuth();
  useEffect(() => {
    (async function () {
      try {
        const {
          data: { cart },
        } = await axios.get(
          `https://new-api-peachcart-1jnt.vercel.app/cart/${userId}`
        );
        dispatch({ type: "LOAD_CART", payload: cart });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch, userId]);

  const decreaseQuantity = async (prodID) => {
    const product = state.cart.find((each) => each._id === prodID);
    if (token) {
      try {
        const decrement = await axios.post(
          `https://new-api-peachcart-1jnt.vercel.app/cart/${userId}/${prodID}`,
          { quantity: product.quantity - 1 }
        );
        if (decrement.data.success)
          dispatch({ type: "DEC_QTY", payload: prodID });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const increaseQuantity = async (prodID) => {
    const product = state.cart.find((each) => each._id === prodID);
    if (token) {
      try {
        const increment = await axios.post(
          `https://new-api-peachcart-1jnt.vercel.app/cart/${userId}/${prodID}`,
          { quantity: product.quantity + 1 }
        );
        if (increment.data.success)
          dispatch({ type: "INC_QTY", payload: prodID });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const removeFromCart = async (prodID) => {
    if (token) {
      try {
        const {
          data: { success },
        } = await axios.delete(
          `https://new-api-peachcart-1jnt.vercel.app/cart/${userId}/${prodID}`
        );
        if (success) {
          dispatch({ type: "REMOVE_FROM_CART", payload: prodID });
          toast.success("item removed from cart");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const moveToWishlist = async (prodID) => {
    try {
      const product = state.cart.find((item) => item._id === prodID);
      await axios.delete(
        `https://new-api-peachcart-1jnt.vercel.app/cart/${userId}/${prodID}`
      );
      await axios.post(
        `https://new-api-peachcart-1jnt.vercel.app/wishlist/${userId}`,
        { productId: prodID }
      );
      dispatch({ type: "MOVE_TO_WISHLIST", payload: product });
      toast.success("item moved to wishlist");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="product-card-top container text-center">
      <div className="row row-cols-auto">
        {state.cart.length === 0 ? (
          <h1>Cart is empty</h1>
        ) : (
          state.cart.map((product) => (
            <div
              className="card col"
              style={{ width: "21.5rem", margin: "0.5rem" }}
              key={product._id}
            >
              <img className="card-img-top" src={product.image} alt="product" />
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <h2
                  className="badge text-bg-dark"
                  style={{ margin: "0.5rem 0rem" }}
                >
                  Rating: {product.ratings} ⭐
                </h2>
                <p style={{ fontWeight: "600" }} className="card-text ">
                  Price: ${product.price}
                </p>

                <div className="d-flex align-items-center justify-content-center m-2">
                  <button
                    className="btn btn-secondary "
                    onClick={() => decreaseQuantity(product._id)}
                  >
                    -
                  </button>
                  <div>{product.quantity}</div>
                  <button
                    className="btn btn-secondary"
                    onClick={() => increaseQuantity(product._id)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(product._id)}
                >
                  Remove from Cart
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => moveToWishlist(product._id)}
                >
                  MOVE TO WISHLIST
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
