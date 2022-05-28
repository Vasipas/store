import React from 'react'
import styled from 'styled-components'
import Header from "./components/Header/Header";
import CategoryPage from "./components/categoryPage/CategoryPage";
import StateContext from "./components/StateContext";
import ProductDescription from "./components/PDP/ProductDescription";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import MiniCart from "./components/Cart/MiniCart";
import CartPage from "./components/Cart/CartPage";

const Wrapper = styled.div`
  width: 1240px;
  height: 200px; 
  margin: 0 auto;
  flex-direction: column;
`

class App extends React.Component {
    static contextType = StateContext

    getProduct = () => {
        const {getProductId} = this.context
        const id = getProductId()
        if(!id) return (sessionStorage.getItem('productId'))
        else return id
    }
    getItems = () => {
        const {getCartItems} = this.context
        let items = getCartItems()
        if(!items.length) return 0
        else return items
    }
    getCategory = () => {
        const {selectedCategory} = this.context
        let category = sessionStorage.getItem('category')
        if(category === null) {
            category = selectedCategory
        }
        return category
    }

  render() {
        const{cartOpen, setCartOpen} = this.context
    return (
        <BrowserRouter>
            <Wrapper>
              <Header/>
              <MiniCart open={cartOpen} setCartOpen={setCartOpen} items={this.getItems()}/>
                  <Routes>
                      <Route path='/' element={<CategoryPage category={this.getCategory()}/>}/>
                      <Route path='/product/:id' element={<ProductDescription prodId={this.getProduct()}/>}/>
                      <Route path='/cart' element={<CartPage items={this.getItems()}/>}/>
                  </Routes>
            </Wrapper>
        </BrowserRouter>
    )
  }
}

export default App
