import React, { Component } from "react";
import formatCurrency from "../util";
import { Fade,  Zoom } from 'react-reveal';
//import Zoom from 'react-reveal/Zoom';
import Modal from 'react-modal';
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    }
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  openModal = (product) => {
    this.setState({ product });
  };

  closeModal = (product) => {
    this.setState({ product: null });
  };

  render() {
    const { product } = this.state;

    return (
      <div>
        <Fade bottom cascade>
          {!this.props.products ? (
            <div>Loading...</div>
          ) : (
            <ul className="products">
              {this.props.products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <a
                      href={"#" + product._id}
                      onClick={() => this.openModal(product)}
                    >
                      <p className="product-title">{product.title}</p>
                      <img src={product.image} alt={product.title} />
                    </a>
                    
                    <div className="product-price">
                      <div>
                        RS: <span className="bold">{product.price}</span>
                      </div>
                      <button onClick={() => this.props.addToCart(product)} className="button primary">Add To Cart</button>
                    </div>
                    
                  </div>
                </li>
              ))}
            </ul>
          )}

        
        </Fade>

        {product && (
          <Modal
            isOpen={true}
            onRequestClose={this.closeModal}
          >
            <Zoom>
              <button
                className="close-modal"
                onClick={this.closeModal}
              >
                X
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title} />
                <div className="product-details-descripton">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>
                    {product.description}
                  </p>
                  <p>
                    Available Sizes: {" "}
                    {product.availableSizes.map((x) => (
                      <span>
                        {" "}
                        <button className="button">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>
                      {/* {formatCurrency(product.price)} */}
                      {product.price}
                    </div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({ products: state.products.filteredItems }),
  {
    fetchProducts,
    addToCart
  },
)(Products);
/*connect accepts two parameters. 
  The first one is a function that accepts state, and returns an object that describes which part of state we going to use
  Second parameter is list of actions
  Connect function returns another function, and parameter is the name of component we going to connect
*/