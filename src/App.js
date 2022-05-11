import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import PLP from './components/PLP/PLP';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PDP from './components/PDP/PDP';
import { connect } from 'react-redux';
import { requestInitialData, requestCurrentProduct } from './Redux/actions';
import { client } from './assets/config';
import Cart from './components/Cart/Cart';

const mapStateToProps = (state) => ({
  isPending: state.requestInitialData.isPending,
  categories: state.requestInitialData.categories,
});

const mapDispatchToProps = (dispatch) => ({
  onInitialDataRequest: (client) => dispatch(requestInitialData(client)),
  onCurrentProductsRequest: (client, categoryName) =>
    dispatch(requestCurrentProduct(client, categoryName)),
});

class App extends React.Component {
  componentDidMount() {
    (async() => {
      await this.props.onInitialDataRequest(client);
      await this.props.onCurrentProductsRequest(client, this.props.categories[0].name)
    }
    )();
  }

  render() {
    const { isPending } = this.props;
    return (
      <BrowserRouter>
        <div className='app'>
          <div className='page'>
            {!isPending && <Navbar />}
            <Routes>
              <Route path='/' element={<PLP />} />
              <Route path='/cart' element={<Cart/>} />
              <Route path='/pdp/:id' element={<PDP />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
