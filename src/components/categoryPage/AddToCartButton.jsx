import React from "react"
import styled from 'styled-components'
import Cart from '../../assets/Cart_white.svg'

const Button = styled.button`
    visibility: ${props => props.visible && props.inStock ? 'visible' : 'hidden'};
    position: absolute;
    display: flex;
    width: 52px;
    height: 52px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #5ECE7B;
    top: 320px;
    right: 31px;
    filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.1));
    `
const AddButton = styled.button`
width: 100%;
display: 'flex';
flex-direction: column;
align-items: center;
padding: 16px 32px;
background: ${props => props.disabled ? '#ccc' : '#5ECE7B'};
font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 120%;
display: flex;
align-items: center;
text-align: center;
text-transform: uppercase;
color: #fff;
`

export default class AddToCartButton extends React.Component {
    add = () => {
        return this.props.add(this.props.product)
    }
    render() {
        let inStock = this.props.product.inStock
            if(this.props.type === 'productPage') {
                if(!inStock) return (<AddButton disabled>Out of stock</AddButton>)
                else return (<AddButton onClick={this.add}>Add to cart</AddButton>)
            }
            else return (<Button inStock={inStock}
                                 visible={this.props.visible}
                                 onClick={this.add}><img src={Cart} alt={'cart'}/></Button>)
        }
}