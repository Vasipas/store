import React from 'react'
import styled from "styled-components";
import StateContext from "../StateContext";
import {PRODUCT_PAGE} from "../PDP/Attr";

const ItemCounter = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 32px;
width: ${props => props.type === PRODUCT_PAGE ? '45px' : '24px'};
height: ${props => props.type === PRODUCT_PAGE ? '288px' : '190px'};`
const CounterButton = styled.div`
display: flex;
width: ${props => props.type === PRODUCT_PAGE ? '45px' : '24px'};
height: ${props => props.type === PRODUCT_PAGE ? '45px' : '24px'};
font-size: ${props => props.type === PRODUCT_PAGE ? '24px' : '8px'};
border: 1px solid #1D1F22;
align-items: center;
justify-content: center;`
const Quantity = styled.div`
width: 8px;
height: 26px;
font-family: 'Raleway';
font-style: normal;
font-weight: 500;
font-size: ${props => props.type === PRODUCT_PAGE ? '24px' : '16px'};
line-height: 160%;
text-align: right;
color: #1D1F22;`

class Counter extends React.Component {
    static contextType = StateContext
    render() {
        const {incrementItem, decrementItem} = this.context
        const type = this.props.type
        return(
            <ItemCounter type={type}>
                <CounterButton type={type} onClick={() => incrementItem(this.props.cartIndex)}>+</CounterButton>
                <Quantity type={type}>{this.props.item.count}</Quantity>
                <CounterButton type={type} onClick={() => decrementItem(this.props.cartIndex)}>-</CounterButton>
            </ItemCounter>
        )
    }
}

export default Counter