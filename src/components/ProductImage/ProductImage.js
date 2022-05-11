import './ProductImage.css';
import React from 'react';
import PrevPng from '../../assets/images/prev.png';
import NextPng from '../../assets/images/next.png';

class ProductImage extends React.Component {
  constructor() {
    super();
    this.state = {
      imageIndex: 0,
    };
  }
  render() {
    const { isMainCart, product } = this.props;
    const { imageIndex } = this.state;
    return (
      <div className='cartProductPhoto' style={{ width: this.props.imgWidth }}>
        <img
          src={product.gallery[imageIndex]}
          alt='product'
          width={this.props.imgWidth}
        />
        {isMainCart && product.gallery.length > 1 ? (
          <div className='carrouselButtons'>
            <div
              className='prev'
              onClick={() => {
                this.setState({
                  imageIndex:
                    imageIndex === product.gallery.length - 1
                      ? 0
                      : imageIndex + 1,
                });
              }}
            >
              <img src={PrevPng} alt='prev' />
            </div>
            <span
              className='next'
              onClick={() => {
                this.setState({
                  imageIndex:
                    imageIndex === 0
                      ? product.gallery.length - 1
                      : imageIndex - 1,
                });
              }}
            >
              <img src={NextPng} alt='next' />
            </span>
          </div>
        ) : (
          <span></span>
        )}
      </div>
    );
  }
}

export default ProductImage;
