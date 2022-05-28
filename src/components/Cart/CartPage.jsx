import React from 'react'
import styled from 'styled-components'
import {CART_PAGE} from "../PDP/Attr";
import CartPageItem from "./CartPageItem";
import StateContext from "../StateContext";

const TAX_PERCENT = 21

const CartWrapper = styled.div`
    width: 1240px;
    padding: 160px 0 0 0;
    `
const CartTitle = styled.div`
    font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 40px;
padding-bottom: 55px;
border-bottom: 1px solid #E5E5E5;
    `
const ItemsWrapper = styled.div`
`
const OrderItems = styled.div`
    margin-top: 32px;
    width: 279px;
    height: 159px;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;
    `
const OrderButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px 32px;
    width: 100%;
    height: 43px;
    background: #5ECE7B;
    color: #fff;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
    text-transform: uppercase;
    
    `
const OrderTable = styled.table`
    width: 100%;
    height: 100px;
    margin-bottom: 16px;`
const TableTitle = styled.td`
width: 100px;
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 28px;
`
const TableInfo = styled.td`
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 24px;
`

class CartPage extends React.Component {
    static contextType = StateContext
    state = {cartItems: []}
    componentDidMount() {
        this.setState({cartItems: this.props.items})
    }
    componentDidUpdate() {
        const {cartOpen, setCartOpen} = this.context
        if(cartOpen) setCartOpen()
        if(JSON.stringify(this.state.cartItems) === JSON.stringify(this.props.items)) return
        else this.setState({cartItems: this.props.items})
    }
    showCartItems = () => {
        if(!this.state.cartItems) return null
         else return (this.state.cartItems.map((item, index) => {
            if(!item) return null
            else return(<CartPageItem type={CART_PAGE}
                                      page={CART_PAGE}
                                      item={item}
                                      key={index}
                                      cartIndex={index}/>)
        }))
    }
    showTotalPrice = () => {
        const {getTotalPrice} = this.context
        let totalPrice = getTotalPrice()
        if (!totalPrice) return 0
        else return (totalPrice.map((item, index)=>
        {
            return (<div key={index}>{item.currency.symbol}{item.amount.toFixed(2)}</div>)}))
    }
    showTax = () => {
        const {getTotalPrice} = this.context
        let totalPrice = getTotalPrice()
        if (!totalPrice) return 0
        else return (totalPrice.map((item, index)=>
        {
            return (<div key={index}>{item.currency.symbol}{(item.amount*TAX_PERCENT/100).toFixed(2)}</div>)}))
    }
    render() {
        const {getCartQuantity, checkOut} = this.context
        let quantity = getCartQuantity()
        return (
            <CartWrapper>
                <CartTitle>Cart</CartTitle>
                <ItemsWrapper>
                    {this.showCartItems()}
                </ItemsWrapper>
                <OrderItems>
                    <OrderTable>
                        <tbody>
                        <tr><TableTitle>Tax {TAX_PERCENT}%:</TableTitle><TableInfo>{this.showTax()}</TableInfo></tr>
                        <tr><TableTitle>Quantity:</TableTitle><TableInfo>{quantity}</TableInfo></tr>
                        <tr><TableTitle>Total:</TableTitle><TableInfo>{this.showTotalPrice()}</TableInfo></tr>
                        </tbody>
                    </OrderTable>
                    <OrderButton onClick={checkOut}>order</OrderButton>
                </OrderItems>
            </CartWrapper>
        )
    }
}

export default CartPage