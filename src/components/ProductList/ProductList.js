import './ProductList.css';
import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

class ProductList extends React.Component {
  render() {
    const { currentProducts } = this.props;
    return (
        <div className='productList'>
          {currentProducts.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
        </div>
    );
  }
}

export default ProductList;
