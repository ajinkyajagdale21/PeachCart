import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

export const ProductDetails = () => {
  const { productId } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    try {
      (async () => {
        const {
          data: { product },
        } = await axios.get(
          `https://afternoon-escarpment-40154.herokuapp.com/products/${productId}`
        );
        setDetails(product);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [productId]);
  return (
    <div className="product-card-top">
      {!details && <h1>Loading....</h1>}
      {details && (
        <div className="card mb-3" style={{ width: "auto" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                className="img-fluid rounded-start"
                src={details.image}
                alt="product"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{details.productName}</h5>
                <h2
                  className="badge text-bg-dark"
                  style={{ margin: "0.5rem 0rem" }}
                >
                  Rating: {details.ratings} ⭐
                </h2>
                <p style={{ fontWeight: "600" }} className="card-text ">
                  Price: ${details.price}{" "}
                </p>
                <p className="card-text">
                  <strong>Description:</strong> {details.description}
                </p>
                <p>{details.gender}</p>
                <p>
                  <i
                    className="fas fa-solid fa-tag "
                    style={{ paddingRight: "0.5rem" }}
                  ></i>
                  {details.offers}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
