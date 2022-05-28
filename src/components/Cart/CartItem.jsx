import React from 'react'
import styled from 'styled-components'
import Attributes from "../PDP/Attributes";
import Price from "../categoryPage/Price";
import StateContext from "../StateContext";
import {CART_PAGE} from "../PDP/Attr";
import Counter from "./Counter";

const Item = styled.div`
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: flex-start;
    //gap: 8px;
    width: 293px;
    height: 190px;
    `
const RemoveItem = styled.div`
visibility: ${props => props.visible ? 'visible' : 'hidden'};
position: absolute;
display: flex;
align-items: center;
justify-content: center;
font-family: 'Source Sans Pro';
color: #fff;
background: #000;
width: 24px;
height: 24px;
right: 0;
top: ${props => props.page === CART_PAGE ? '24px' : 0};`
const ItemAttributes = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 4px;
    width: 164px;
    height: 190px;
`
const ItemPhotoWrapper = styled.div`
    display: flex;
    width: 121px;
    height: 190px;
    margin-left: 8px;
    align-items: center;
    justify-content: center;
    `
const ItemPhoto = styled.img`
    display: block;
    max-width: 121px;
    max-height: 190px;`
const ItemDescription = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
width: 136px;
height: 190px;`
const ItemTitleBrand = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 27px;
    margin-bottom: 0;`
const ItemTitleName = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 8px;
`

class CartItem extends React.Component {
    static contextType = StateContext
    state = {onFocus: false}
    removeFromCart = () => {
        const {removeItem} = this.context
        return removeItem(this.props.item)
    }
    showRemoveButton = () => this.setState({onFocus: true})
    hideRemoveButton = () => this.setState({onFocus: false})

    render() {
        const item = this.props.item
        return(
            <Item onMouseOver={this.showRemoveButton} onMouseOut={this.hideRemoveButton}>
                <RemoveItem visible={this.state.onFocus} onClick={this.removeFromCart}>X</RemoveItem>
            <ItemAttributes>
                <ItemDescription>
                    <ItemTitleBrand>{item.brand}</ItemTitleBrand>
                    <ItemTitleName>{item.name}</ItemTitleName>
                    <Price type={this.props.type} prices={item.prices}/>
                    <Attributes attrs={item.attributes}
                                itemId={item.id}
                                type={CART_PAGE}
                                page={CART_PAGE}
                                cartIndex={this.props.cartIndex}/>
                </ItemDescription>
                <Counter item={item} cartIndex={this.props.cartIndex}/>
            </ItemAttributes>
            <ItemPhotoWrapper>
                <ItemPhoto src={item.gallery[0]}/>
            </ItemPhotoWrapper>
        </Item>
        )
    }
}

export default CartItem