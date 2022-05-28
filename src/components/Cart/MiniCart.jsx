import React from 'react'
import styled from 'styled-components'
import CartItem from "./CartItem";
import StateContext from "../StateContext";
import {Link} from "react-router-dom";
import {CART_PAGE} from "../PDP/Attr";

const CartBackground = styled.div`
visibility: ${props => props.open ? 'visible' : 'hidden'};
position: fixed;
width: 100%;
height: calc(100% - 80px);
left: 0px;
top: 80px;
background: rgba(57, 55, 72, 0.22);
z-index: 6;`
const MiniCartWrapper = styled.div`
    flex-direction: column;
    position: absolute;
    left: 1043px;
    top: 0;
    width: 325px;
    max-height: 677px;
    background: #FFF;
    justify-content: center;
    align-items: center;
    padding: 32px 16px;
    gap: 32px;
    z-index: 7;`
const CartTitle = styled.h4`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 160%;
    color: #1D1F22;
    margin-bottom: 32px;
    `
const CartItemsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 40px;
    width: 293px;
    max-height: 420px;
    overflow: auto;
    ::-webkit-scrollbar {
    display: none;
    };
    `
const Total = styled.div`
display: flex;
flex-direction: row;
width: 289px;
height: 28px;
justify-content: space-between;
font-family: 'Roboto';
font-style: normal;
font-weight: 500;
font-size: 16px;
margin: 43px 0 32px;
`
const TotalTitle = styled.div`
font-family: 'Roboto';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 18px;
    `
const TotalPrice = styled.div`
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 160%;
display: flex;
align-items: center;
text-align: right;
color: #1D1F22;`
const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 12px;
    width: 292px;
    height: 43px;
    `
const ViewBagButton = styled(Link)`
    display: flex;
    box-sizing: border-box;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
    color: #1D1F22;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 140px;
    height: 43px;
    background: #FFFFFF;
    border: 1px solid #1D1F22;
    text-transform: uppercase;
    text-decoration: none;
    `
const CheckOutButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
padding: 16px 32px;
width: 140px;
height: 43px;
background: #5ECE7B;
text-align: center;
text-transform: uppercase;
font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 120%;
color: #FFFFFF;
    `
const TotalNButtons = styled.div`
display: ${props => props.quantity > 0 && props.open ? 'flex' : 'none'};
flex-direction: column;
margin: 0;
padding: 0;
border: none;
`

class MiniCart extends React.Component {
    static contextType = StateContext
    state = {cartItems: []}
    componentDidMount() {
        this.setState({cartItems: this.props.items})
    }

    componentDidUpdate() {
        if(JSON.stringify(this.state.cartItems) === JSON.stringify(this.props.items)) return
        else this.setState({cartItems: this.props.items})
    }

    showCartItems = () => {
        let items = this.state.cartItems
        if(!items.length) return null
        else return (items.map((item, index) => {
            if(!item) return null
            else return(<CartItem type={CART_PAGE} item={item} key={index} cartIndex={index}/>)
        }))
    }

    closeCart = event => {
        const {setCartOpen} = this.context
        if(event.target.id === 'close') setCartOpen()
        else return
    }
    showTotalPrice = () => {
        const {getTotalPrice} = this.context
        let totalPrice = getTotalPrice()
        if (!totalPrice) return
        else return (totalPrice.map((item, index)=> <div key={index}>{item.currency.symbol}{item.amount.toFixed(2)}</div>))
    }

    render() {
        const {checkOut} = this.context
        let itemsQuantity = this.state.cartItems.length || 0
        return(
            <CartBackground id={'close'} open={this.props.open} onClick={this.closeCart}>
                <MiniCartWrapper>
                    <CartTitle>My Bag, {itemsQuantity} {itemsQuantity === 1 ? 'item' : 'items'}</CartTitle>
                    <CartItemsWrapper>
                        {this.showCartItems()}
                    </CartItemsWrapper>
                    <TotalNButtons quantity={itemsQuantity} open={this.props.open}>
                    <Total>
                        <TotalTitle>Total</TotalTitle>
                        <TotalPrice>{this.showTotalPrice()}</TotalPrice>
                    </Total>
                    <Buttons>
                        <ViewBagButton to={'/cart'}>view bag</ViewBagButton>
                        <CheckOutButton onClick={checkOut}>check out</CheckOutButton>
                    </Buttons>
                    </TotalNButtons>
                </MiniCartWrapper>
            </CartBackground>
        )
    }
}

export default MiniCart