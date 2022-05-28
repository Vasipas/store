import React from 'react'
import styled from "styled-components";
import Cart from "../../../assets/Cart.svg";
import CurrencySwitcher from "./currencySwitcher/CurrencySwitcher";
import StateContext from "../../StateContext";

const ActionsWrapper = styled.div`
    display: flex;
    position: relative;
    width: 204px;
    height: 40px;
    justify-content: flex-end;
    align-items: center;
    padding: 0px;
    gap: 22px;
    `
const CartImg = styled.img.attrs({src: Cart})`
    width: 20px;
    height: 20px;
    `
const QuantityCircle = styled.div`
visibility: ${props => props.count > 0 ? 'visible' : 'hidden'};
position: absolute;
display: flex;
top: 0;
right: -10px;
width: 20px;
height: 20px;
border-radius: 50%;
background: #1D1F22;
justify-content: center;
align-items: center;
color: white;
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;
text-transform: uppercase;
`

class Actions extends React.Component {
    static contextType = StateContext

    render() {
        const {setCartOpen, getCartQuantity} = this.context
        let count = getCartQuantity()
        return (
                <ActionsWrapper>
                    <CurrencySwitcher/>
                    <CartImg onClick={setCartOpen}/>
                    <QuantityCircle count={count}>{count}</QuantityCircle>
                </ActionsWrapper>
            )
    }
}

export default Actions