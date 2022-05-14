import './ProductDescription.css';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledProductDescription = styled.div`
  ${(props) =>
    props.isMainCart
      ? `margin-top: 0; font-weight: ${
          props.name ? 600 : 400
        }; font-size: 30px; line-height: 27px;`
      : 'margin-bottom: 10px; font-weight: 300; font-size: 16px; line-height: 160%;'}
`;

const StyledProductPrice = styled.div`
  ${(props) =>
    props.isMainCart
      ? 'font-weight: 700; font-size: 24px; line-height: 24px;'
      : 'font-weight: 500; font-size: 16px; line-height: 160%;'}
`;

const mapStateToProps = (state) => ({
  currentCurrency: state.currencyChange.currentCurrency,
  currencies: state.requestInitialData.currencies,
});

class ProductDescription extends React.Component {
  render() {
    const { product, currencies, currentCurrency, isMainCart } = this.props;
    return (
      <div>
        <StyledProductDescription isMainCart={isMainCart} name={1}>
          <p className='cartProductName'>{product.brand}</p>
        </StyledProductDescription>
        <StyledProductDescription isMainCart={isMainCart} name={0}>
          <p className='cartProductName'>{product.name}</p>
        </StyledProductDescription>
        <StyledProductPrice isMainCart={isMainCart}>
          <p className='cartProductPrice'>
            {currencies.length ? currencies[currentCurrency].symbol : '$'}{' '}
            {product.prices[currentCurrency].amount
              ? product.prices[currentCurrency].amount
              : 0}
          </p>
        </StyledProductPrice>
      </div>
    );
  }
}
export default connect(mapStateToProps)(ProductDescription);
