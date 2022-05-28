import React from "react"
import styled from "styled-components"
import StateContext from "../StateContext";

const TEXT_ATTRIBUTE = 'text'
const SWATCH_ATTRIBUTE = 'swatch'
export const CART_PAGE = 'cartPage'
export const PRODUCT_PAGE = 'productPage'

const Attribute =styled.div`
margin-bottom: ${props => props.page === PRODUCT_PAGE && props.type === PRODUCT_PAGE ? '24px' : (props.type === CART_PAGE && props.page === PRODUCT_PAGE ? '16px' : '8px')};
&:last-child{ margin-bottom: 0 }`
const AttrTitle = styled.div`
font-family: 'Roboto Condensed';
font-style: normal;
font-weight: ${props => props.type === CART_PAGE && props.page === CART_PAGE ? '400' : '700'};;
font-size: ${props => props.type === PRODUCT_PAGE || props.page === PRODUCT_PAGE ? '18px' : '14px'};
line-height: 16px;
margin-bottom: 8px;
text-transform: ${props => props.type === CART_PAGE && props.page === CART_PAGE ? 'none' : 'uppercase'};`
const AttrOptions = styled.div`
font-family: 'Source Sans Pro';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 18px;
letter-spacing: 0.05em;
color: #292929;
display: flex;`
const AttrOptionItem = styled.button`
width: ${props => props.color && props.type === CART_PAGE ? '20px' : 0};
height: ${props => props.color && props.type === CART_PAGE ? '20px' : 0};
width: ${props => (props.type === PRODUCT_PAGE || props.page === PRODUCT_PAGE) && !props.color  ? '63px' : (props.color && props.type === CART_PAGE && props.page === PRODUCT_PAGE ? '32px' : props.color && props.type === CART_PAGE ? '20px' : '24px')};
height: ${props => (props.type === PRODUCT_PAGE || props.page === PRODUCT_PAGE) && !props.color ? '45px' : (props.color && props.type === CART_PAGE && props.page === PRODUCT_PAGE ? '32px' : props.color && props.type === CART_PAGE ? '20px' : '24px')};
color: ${props => props.selected ? '#fff' : '#1D1F22'};
background: ${props => props.color ? props.color : props.selected ? '#1D1F22' : '#fff'};
border: ${props => props.color ? '1px solid #D3D2D5' : '1px solid #1D1F22'};
outline: ${props => props.color && props.selected ? '1px solid #5ECE7B': null};
margin-right: ${props => props.color || props.type === CART_PAGE ? '8px' : '12px'};
&:first-child{
margin-left: ${props => props.color ? '2px' : 0}};`

class Attr extends React.Component {
    static contextType = StateContext
    state = {selected: ''}

    componentDidMount() {
        const type = this.props.type
        const {getCandidate, getCartItems} = this.context
        const attribute = this.props.attr
        let selectedItem = ''
        if(type === PRODUCT_PAGE) {
            selectedItem = getCandidate().selectedAttrs.find(attr => attribute.id === attr.attrId)
        }
        else {
            let cartItems = getCartItems()
            let index = this.props.cartIndex
            selectedItem = cartItems[index].selectedAttrs.find(attr => attribute.id === attr.attrId)
        }
        return this.setState({selected: selectedItem.attrValue})
    }

    changeAttrValue = event => {
        const type = this.props.type
        const {changeCandidateAttrValue, changeCartItemAttrValue} = this.context

        if(event.target.tagName === 'BUTTON') {
            const value = JSON.parse(event.target.value)
            if(type === PRODUCT_PAGE) {
                this.setState({selected: value.attrValue})
                return changeCandidateAttrValue(value)
            } else if(type === CART_PAGE) {
                this.setState({selected: value.attrValue})
                return changeCartItemAttrValue(value)
            }
        } else return
    }

    render() {
        const attr = this.props.attr
        const itemId = this.props.itemId

        let showItems = () => {
            if(attr.type === TEXT_ATTRIBUTE) {
                return (attr.items.map((item, index) => {
                    const itemValue = JSON.stringify({
                        itemId: itemId,
                        attrId: attr.id,
                        attrValue: item.value,
                        cartIndex: this.props.cartIndex})
                    return (<AttrOptionItem value={itemValue}
                                            type={this.props.type}
                                            page={this.props.page}
                                            key={index}
                                            selected={item.value === this.state.selected ? true : false}>{item.value}</AttrOptionItem>)}))
            }
            else if(attr.type === SWATCH_ATTRIBUTE) {
                return (attr.items.map((item, index) => {
                    const itemValue = JSON.stringify({
                        itemId: itemId,
                        attrId: attr.id,
                        attrValue: item.value,
                        cartIndex: this.props.cartIndex,})
                    return (<AttrOptionItem value={itemValue}
                                            color={item.value}
                                            type={this.props.type}
                                            page={this.props.page}
                                            key={index}
                                            selected={item.value === this.state.selected ? true : false}/>)}))
            }
            else return
        }
        return (
            <Attribute type={this.props.type}
                       page={this.props.page}
                       onClick={this.changeAttrValue}>
                <AttrTitle type={this.props.type} page={this.props.page}>{this.props.attr.id}:</AttrTitle>
                <AttrOptions>{showItems()}</AttrOptions>
            </Attribute>
        )
    }
}

export default Attr