import React from 'react'
import StateContext from "../StateContext";
import styled from "styled-components";
import {PRODUCT_PAGE, CART_PAGE} from "../PDP/Attr";

const PriceField = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: ${props => props.type === PRODUCT_PAGE || props.page === CART_PAGE ? 700 : 500};
    font-size: ${props => props.type === PRODUCT_PAGE || props.page === CART_PAGE ? '24px' : (props.type === CART_PAGE ? '16px' : '18px')};
    line-height: 160%;
    margin: ${props => props.type === CART_PAGE && props.page === CART_PAGE ? '20px 0' : (props.type === PRODUCT_PAGE ? ' 0 0 31px 0' : '0 0 10px 0')};
    `

class Price extends React.Component {
    static contextType = StateContext
    render() {
        const {selectedCurrency} = this.context
        if(!this.props.prices) return
        else return (this.props.prices
            .filter( price => price.currency.label === selectedCurrency.label )
            .map((price, index) => {
                return (<PriceField page={this.props.page}
                                    type={this.props.type}
                                    key={index}>{price.currency.symbol} {price.amount}</PriceField>)
            }))
    }
}

export default Price