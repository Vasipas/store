import React from "react"
import styled from 'styled-components'
import StateContext from "../StateContext";
import {graphql} from "@apollo/client/react/hoc";
import {categories} from "../../queries/queries";
import {Link} from "react-router-dom";
import Preloader from "../Preloader";

const CategoryWrapper = styled.div`
    height: 100%;
`
const CategoryItem = styled.button`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  background: none;
  padding: 28px 16px 32px 16px;
  border-bottom: ${props => props.clicked ? '2px solid #5ECE7B' : null};
  align-items: center;
  text-align: center;
  text-transform: uppercase;`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: #1D1F22;`

class Category extends React.Component {
    static contextType = StateContext

    componentDidUpdate() {
        const {categoryList, setCategories} = this.context
        let categories = JSON.stringify(this.props.data.categories)
        if(JSON.stringify(categoryList) === categories ) return
        else {
            sessionStorage.setItem('categories', categories)
            setCategories(categories)}
    }
    changeCategory = event => {
        if(event.target.tagName === 'BUTTON') {
            const {changeCategory} = this.context
            const categoryName = event.target.value
            changeCategory(categoryName)
        } else return
    }
    isSelected = value => {
        const {showCategory} = this.context
        if(showCategory() === value) return true
        else return false
    }
    fetchCategories = () => {
        const data = this.props.data

        if (data.loading) return <Preloader/>
        if (data.error) return <p>Error...</p>
        else {
            return (data.categories.map((item, index) => {
            return(
                <StyledLink key={index} to='/'>
                    <CategoryItem clicked={this.isSelected(item.name)} key={index} value={item.name}>{item.name}</CategoryItem>
                </StyledLink>)
            })
        )}
    }
    render() {
        return(
            <>
                <CategoryWrapper onClick={this.changeCategory}>
                    {this.fetchCategories()}
                </CategoryWrapper>
            </>)
    }
}

export default graphql(categories)(Category)