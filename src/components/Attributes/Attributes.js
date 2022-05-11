import './Attributes.css';
import React from 'react';

class Attributes extends React.Component {
  render() {
    return this.props.attributes.map((attribute, attIndex) => {
      return (
        <div key={attIndex}>
          <p className='attributeName' style={this.props.attributeNameStyle}>
            {attribute.name}:
          </p>
          {attribute.type === 'swatch' ? (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                    style={{
                      width:
                        this.props.swatchAttributeSize.width.slice(0, -2) -
                        1 +
                        'px',
                    }}
                  >
                    <div
                      className={`swatchAttribute`}
                      style={{
                        backgroundColor: item.value,
                        ...this.props.swatchAttributeSize,
                      }}
                      onClick={() => {
                        this.props.changePickedValue(attribute, item);
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {attribute.items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`textAttribute ${
                      this.props.pickedValues[attIndex].value ===
                      item.displayValue
                        ? 'pickedTextAttribute'
                        : ''
                    }`}
                    style={this.props.textAttributeSize}
                    onClick={() => {
                      this.props.changePickedValue(attribute, item);
                    }}
                  >
                    {item.displayValue}
                  </div>
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
