import React from "react"
import styled from "styled-components";
import Price from "../categoryPage/Price";
import ProductTitle from "./ProductTitle";
import Attributes from "./Attributes";
import AddToCartButton from "../categoryPage/AddToCartButton";
import StateContext from "../StateContext";
import parse from 'html-react-parser'

const DescriptionWrapper = styled.div`
position: relative;
width: 292px;`
const AboutProduct = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 159.96%;
    color: #1D1F22;
    margin-top: 40px;
    `
const PriceTitle = styled.div`
    display: flex;
    text-transform: uppercase;
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
    margin: 36px 0 22px 0;
    `

class Description extends React.Component {
    static contextType = StateContext
    render() {
        const {addToCart, candidateToCart} = this.context
        const product = this.props.product
        return(
            <DescriptionWrapper>
                <ProductTitle name={product.name} brand={product.brand}/>
                <Attributes attrs={product.attributes}
                            type={this.props.type}
                            page={this.props.page}
                            itemId={product.id}/>
                            <PriceTitle>Price:</PriceTitle>
                <Price type={this.props.type} prices={product.prices}/>
                <AddToCartButton add={addToCart} product={candidateToCart}
                                 type={this.props.type}>Add to cart</AddToCartButton>
                <AboutProduct>{parse(product.description)}</AboutProduct>
            </DescriptionWrapper>
        )
    }
}

export default Description