import React from 'react'
import styled from 'styled-components'
import Gallery from "./Gallery";
import Description from "./Description";
import {graphql} from "@apollo/client/react/hoc";
import {product} from "../../queries/queries";
import StateContext from "../StateContext";
import Preloader from "../Preloader";
import {PRODUCT_PAGE} from "./Attr";

const ProductWrapper = styled.div`
    display: flex;
    min-height: 853px;
    padding-top: 162px;
    overflow: hidden;`

class ProductDescription extends React.Component {
    static contextType = StateContext
    componentDidUpdate() {
        const {getCandidate, setCandidateToCart} = this.context
        if(!getCandidate()) {
            let product = JSON.parse(sessionStorage.getItem('product'))
            setCandidateToCart(product)
        }
    }

    fetchProductDescription = () => {
        const data = this.props.data
        if(data.loading) return <Preloader/>
        if(data.error) return <p>Oops, loading error</p>
        else {
            return (
                <>
                    <Gallery inStock={data.product.inStock} gallery={data.product.gallery}/>
                    <Description type={PRODUCT_PAGE}
                                 page={PRODUCT_PAGE}
                                 product={data.product}/>
                </>
        )}
    }
    render() {
        return (
    <ProductWrapper>
            {this.fetchProductDescription()}
    </ProductWrapper>
            )
    }
}

export default graphql(product, {
    options: props => ({variables: {prodId: props.prodId}
    })})(ProductDescription)