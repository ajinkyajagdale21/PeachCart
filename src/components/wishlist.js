import React, { useEffect } from "react";
import { useAuth } from "../authContext";
import { useData } from "../dataContext";
import axios from "axios";
import toast from "react-hot-toast";

export const WishList = () => {
  const { state, dispatch } = useData();
  const {
    state: { userId, token },
  } = useAuth();

  useEffect(() => {
    (async function () {
      try {
        const {
          data: { wishlist },
        } = await axios.get(
          `https://new-api-peachcart-1jnt.vercel.app/wishlist/${userId}`
        );
        dispatch({ type: "LOAD_WISHLIST", payload: wishlist });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch, userId]);

  async function removeFromWishlist(prodID) {
    if (token) {
      try {
        const {
          data: { success },
        } = await axios.delete(
          `https://new-api-peachcart-1jnt.vercel.app/wishlist/${userId}/${prodID}`
        );
        if (success) {
          dispatch({ type: "REMOVE_FROM_WISHLIST", payload: prodID });
          toast.success("item removed from wishlist");
        }
      } catch (error) {
        console.error({ message: error.message });
      }
    }
  }
  const moveToCart = async (prodID) => {
    try {
      const product = state.wishlist.find((item) => item._id === prodID);
      await axios.delete(
        `https://new-api-peachcart-1jnt.vercel.app/wishlist/${userId}/${prodID}`
      );
      await axios.post(
        `https://new-api-peachcart-1jnt.vercel.app/cart/${userId}`,
        { productId: prodID }
      );
      dispatch({ type: "MOVE_TO_CART", payload: product });
      toast.success("item moved to cart");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="product-card-top container text-center">
      <div className="row row-cols-auto">
        {state.wishlist.length === 0 ? (
          <h1>WishList is empty</h1>
        ) : (
          state.wishlist.map((product) => (
            <div
              className="card col"
              key={product._id}
              style={{ width: "21.5rem", margin: "0.5rem" }}
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

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromWishlist(product._id)}
                >
                  REMOVE FROM WISHLIST
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => {
                    moveToCart(product._id);
                  }}
                >
                  MOVE TO CART
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
