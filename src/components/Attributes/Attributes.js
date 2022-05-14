import './Attributes.css';
import React from 'react';
import styled from 'styled-components';

const StyledTextAttribute = styled.div`
  margin-right: 10px;
  ${(props) =>
    props.miniCart
      ? 'font-weight: 400; font-size: 10px; width: 32px; height: 32px;'
      : 'width: 63px; height: 45px;'}
`;
const StyledSwatchAttribute = styled.div`
  ${(props) =>
    props.miniCart
      ? 'width: 16px; height: 16px;'
      : 'width: 32px; height: 32px;'}
`;
const StyledAttributeName = styled.div`
  font-family: ${(props) =>
    props.miniCart ? "'Raleway'" : "'Roboto Condensed'"};
  font-weight: ${(props) => (props.miniCart ? '400' : '700')};
  font-size: ${(props) => (props.miniCart ? '14px' : '18px')};
  line-height: ${(props) => (props.miniCart ? '22px' : '18px')};
  text-transform: ${(props) => (props.miniCart ? 'capitalize' : 'uppercase')};
  margin: ${(props) => (props.miniCart ? '5px 0' : '0')};
`;

class Attributes extends React.Component {
  render() {
    const { changePickedValue, miniCart } = this.props;
    return this.props.attributes.map((attribute, attIndex) => {
      return (
        <div key={attIndex}>
          <StyledAttributeName miniCart={miniCart}>
            <p className='attributeName'>{attribute.name}:</p>
          </StyledAttributeName>
          {attribute.type === 'swatch' ? (
            <div className='attributesRow'>
              {attribute.items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`swatchAttributeBorder  ${
                      this.props.pickedValues[attIndex].value ===
                      item.displayValue
                        ? 'pickedSwatchAttribute'
                        : ''
                    }`}
                  >
                    <StyledSwatchAttribute miniCart={miniCart}>
                      <div
                        className='swatchAttribute'
                        style={{
                          backgroundColor: item.value,
                        }}
                        onClick={() => {
                          if (changePickedValue)
                            changePickedValue(attribute, item);
                        }}
                      ></div>
                    </StyledSwatchAttribute>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='attributesRow'>
              {attribute.items.map((item, index) => {
                return (
                  <StyledTextAttribute key={index} miniCart={miniCart}>
                    <div
                      className={`textAttribute ${
                        this.props.pickedValues[attIndex].value ===
                        item.displayValue
                          ? 'pickedTextAttribute'
                          : ''
                      }`}
                      onClick={() => {
                        if (changePickedValue)
                          changePickedValue(attribute, item);
                      }}
                    >
                      {item.displayValue}
                    </div>
                  </StyledTextAttribute>
                );
              })}
            </div>
          )}
        </div>
      );
    });
  }
}

export default Attributes;
