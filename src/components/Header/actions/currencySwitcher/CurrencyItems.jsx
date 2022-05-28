import React from "react";
import styled from "styled-components";
import {graphql} from '@apollo/client/react/hoc'
import {currencyList} from "../../../../queries/queries";
import StateContext from "../../../StateContext";

const CurrencyItem = styled.button`
border: none;
background: #fff;
width: 114px;
height: 45px;
display: flex;
font-family: 'Raleway';
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 160%;
padding-left: 20px;
align-items: center;
&:hover {
background: #EEE;
};`

class CurrencyItems extends React.Component {
    static contextType = StateContext

    componentDidUpdate() {
        const {setCurrencies} = this.context
        setCurrencies(this.props.data.currencies)
    }

    fetchCurrencies() {
        const data = this.props.data

        if (data.loading) return <p>Loading...</p>
        if (data.error) return <p>...Error...</p>
        return (
            data.currencies.map((item, index) => {
                return (<CurrencyItem key={index}
                              id={index}
                              data-symbol={item.symbol}
                              data-label={item.label}>{item.symbol} {item.label}</CurrencyItem>)
            }))
    }
    render() {
        return(<>
            {this.fetchCurrencies()}
        </>)
    }
}

export default graphql(currencyList)(CurrencyItems)