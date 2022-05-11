import './CartProduct.css';
import React from 'react';

class CartProduct extends React.Component {
  render() {
    return <div className='cartProduct'>{this.props.children}</div>;
  }
}
export default CartProduct;