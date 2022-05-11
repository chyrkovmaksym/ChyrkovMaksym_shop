import './DropDownList.css';
import React from 'react';
import DropDownIcon from '../../assets/images/currencyDropDown.png';
import { connect } from 'react-redux';
import { currencyChange } from '../../Redux/actions';

const mapStateToProps = (state) => ({
  currencies: state.requestInitialData.currencies,
  currentCurrency: state.currencyChange.currentCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  onCurrencyChange: (index) => dispatch(currencyChange(index)),
});

class DropDownList extends React.Component {
  constructor() {
    super();
    this.state = {
      droppedDown: false,
    };
  }
  componentDidMount() {
    window.addEventListener('click', (event) => {
      if (
        this.state.droppedDown &&
        !event.target.matches('.currency') &&
        !event.target.matches('.dropDown') &&
        !event.target.matches('.open')
      ) {
        this.setState({ droppedDown: false });
      }
    });
  }
  render() {
    const { currencies, currentCurrency } = this.props;
    return (
      <div
        className='dropDown'
        onClick={() => {
          this.setState({ droppedDown: !this.state.droppedDown });
        }}
      >
        <p className='open'>{currencies[currentCurrency].symbol}</p>
        <img src={DropDownIcon} alt='' />
        {this.state.droppedDown && (
          <div className='currenciesBox'>
            <ul className='currencies navigation'>
              {currencies.map((currency, index) => {
                if (currentCurrency !== index) {
                  return (
                    <li
                      key={index}
                      className='currency'
                      onClick={() => {
                        this.props.onCurrencyChange(index);
                      }}
                    >
                      {currency.symbol} {currency.label}
                    </li>
                  );
                }
                return false;
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownList);
