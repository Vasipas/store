import React from "react";
import styled from 'styled-components'
import Price from "../categoryPage/Price";
import {CART_PAGE, PRODUCT_PAGE} from "../PDP/Attr";
import Attributes from "../PDP/Attributes";
import Counter from "./Counter";
import ItemGallery from "./ItemGallery";
import StateContext from "../StateContext";
import {Link} from "react-router-dom";

const ItemWrapper = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    min-height: 336px;
    border-bottom: 1px solid #E5E5E5;
    padding: 24px 0;
    flex-direction: row;
    `
const ItemInfo = styled.div`
    flex-direction: column;
    height: 100%;
    width: 100%;
    `
const ItemTitle = styled.div`
    display: flex;
    flex-direction: column;
    height: 70px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 27px;
    justify-content: space-between;`
const Remove = styled.div`
visibility: ${props => props.visible ? 'visible' : 'hidden'};
position: absolute;
display: flex;
align-items: center;
justify-content: center;
font-family: 'Source Sans Pro';
color: #fff;
background: #000;
width: 45px;
height: 45px;
left: calc(100% - 45px);
z-index: 7;`
const StyledLink = styled(Link)`
color: #1D1F22;
text-decoration: none;`

class CartPageItem extends React.Component {
    state = {onFocus: false}
    static contextType = StateContext
    removeFromCart = () => {
        const {removeItem} = this.context
        return removeItem(this.props.item)
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
    showRemoveButton = () => this.setState({onFocus: true})
    hideRemoveButton = () => this.setState({onFocus: false})

    render() {
        const item = this.props.item
        return(
            <ItemWrapper onMouseOver={this.showRemoveButton} onMouseOut={this.hideRemoveButton}>
                <Remove visible={this.state.onFocus} onClick={this.removeFromCart}>X</Remove>
                <ItemInfo>
                    <StyledLink to={`/product/${item.id}`} onClick={this.showProductPage}>
                    <ItemTitle>
                        <div>{item.brand}</div>
                        <div style={{fontWeight: 400}}>{item.name}</div>
                    </ItemTitle>
                    </StyledLink>
                    <Price type={this.props.type}
                           page={this.props.page} prices={item.prices}/>
                    <Attributes attrs={item.attributes}
                                itemId={item.id}
                                type={CART_PAGE}
                                page={PRODUCT_PAGE}
                                cartIndex={this.props.cartIndex}/>
                </ItemInfo>
                <Counter item={item}
                         cartIndex={this.props.cartIndex}
                         type={PRODUCT_PAGE}/>
                <ItemGallery gallery={item.gallery}/>
            </ItemWrapper>
        )
    }
}

export default CartPageItem