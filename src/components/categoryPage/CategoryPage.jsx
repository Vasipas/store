import React from "react";
import styled from 'styled-components'
import CategoryItem from "./CategoryItem";
import StateContext from "../StateContext";
import {graphql} from '@apollo/client/react/hoc';
import {categoryItems} from "../../queries/queries";
import Preloader from "../Preloader";

const CategoryName = styled.h1`
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 42px;
line-height: 160%;
padding: 160px 0 103px 0;
text-transform: capitalize;
`
const ItemsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    `

class CategoryPage extends React.Component {
    static contextType = StateContext

    fetchProductCards() {
        const data = this.props.data

        if(data.loading) return <Preloader/>
        if(data.error) return <p>There is no items in this category</p>

        return (data.category.products.map(item => {
            return (<CategoryItem key={item.id} item={item}/>)
        }))
    }

    render() {
        const {showCategory} = this.context
        return(
            <>
            <CategoryName>{showCategory()}</CategoryName>
                <ItemsWrapper>
                    {this.fetchProductCards()}
                </ItemsWrapper>
            </>
        )
    }
}

export default graphql(categoryItems, {
    options: props => ({variables: {title: props.category}
})})(CategoryPage)