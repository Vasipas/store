import React from 'react'
import styled from 'styled-components'
import Attr, {CART_PAGE, PRODUCT_PAGE} from "./Attr";

const AttrWrapper = styled.div`
    padding-bottom: 2px;
    position: relative;
    ::-webkit-scrollbar {
    width: 0;
    }
    overflow: auto;
    height: ${props => props.page === PRODUCT_PAGE && props.type === CART_PAGE ? '145px' : null};
    `

class Attributes extends React.Component {

    showAttribute = () => {
        return (this.props.attrs.map((attribute, index) => {
            return (<Attr key={index}
                          attr={attribute}
                          type={this.props.type}
                          page={this.props.page}
                          itemId={this.props.itemId}
                          cartIndex={this.props.cartIndex}/>)}))
    }
    render() {
        return (
            <AttrWrapper type={this.props.type} page={this.props.page}>
                {this.showAttribute()}
            </AttrWrapper>)
    }
}

export default Attributes