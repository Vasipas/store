import React from "react"
import styled from "styled-components"
import AddToCartButton from "./AddToCartButton"
import Price from "./Price"
import {Link} from "react-router-dom"
import StateContext from "../StateContext";

const Item = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 386px;
    height: 444px;
    padding: 16px;
    &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);};
    margin-bottom: 103px;  
    &:first-child{
    margin-left: 0};
    &:nth-child(3n-1){
    margin-right: 40px;
    margin-left: 40px;
    }  
    `
const OutOfStock = styled.div`
    visibility: ${props => props.hidden ? 'hidden' : 'visible'};
    position: absolute;
    left: 15px;
    top: 15px;
    width: 356px; 
    height: 356px;
    background: #FFFFFF;
    opacity: 0.5;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 160%;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8D8F9A;
    `
const ItemImg = styled.img`
    display: block;
    max-width: 354px;
    max-height: 330px;
    align-self: stretch;
    margin: auto;
`
const ImgDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 354px;
    min-height: 330px;
    margin-bottom: 24px;
    `
const ItemTitle = styled.div`
    height: 29px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${props => props.instock === 'true' ? '#1D1F22' : '#8D8F9A'};`

export default class CategoryItem extends React.Component {
    static contextType = StateContext
    state = {
        onFocus: false,
    }
    showToCartButton = () => {
        this.setState({onFocus: true})
    }
    hideToCartButton = () => {
        this.setState({onFocus: false})
    }
    showProductPage = () => {
        const id = this.props.item.id
        const item = this.props.item
        const {setCandidateToCart} = this.context
        const product = {
            id: item.id,
            brand: item.brand,
            name: item.name,
            prices: item.prices,
            inStock: item.inStock,
            attributes: item.attributes,
            gallery: item.gallery,
            count: 1,
            selectedAttrs: item.attributes.map( attr => {
                return {attrId: attr.id, attrValue: attr.items[0].value}
            })}
        sessionStorage.setItem('productId', id)
        sessionStorage.setItem('product', JSON.stringify(product))
        setCandidateToCart(product)
    }
    render() {
        const {addToCart} = this.context
        const item = this.props.item
        const product = {
            id: item.id,
            brand: item.brand,
            name: item.name,
            prices: item.prices,
            inStock: item.inStock,
            attributes: item.attributes,
            gallery: item.gallery,
            count: 1,
            selectedAttrs: item.attributes.map( attr => {
                return {attrId: attr.id, attrValue: attr.items[0].value}
            })}
        return(
            <Item onMouseOver={this.showToCartButton}
                  onMouseOut={this.hideToCartButton}
                  onClick={this.showProductPage}>
                <AddToCartButton visible={this.state.onFocus}
                                 add={addToCart}
                                 inStock={item.inStock}
                                 product={product}/>
                <OutOfStock hidden={item.inStock}>Out of stock</OutOfStock>
                <StyledLink to={`/product/${item.id}`} instock={item.inStock.toString()}>
                    <ImgDiv><ItemImg src={item.gallery[0]}/></ImgDiv>
                <ItemTitle>{item.brand} {item.name}</ItemTitle>
                <Price prices={item.prices}/>
                </StyledLink>
            </Item>
        )
    }
}