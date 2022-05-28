import React from 'react'
import styled from 'styled-components'

const TitleWrapper = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 43px;
    `
const Brand = styled.div`
    height: 27px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 27px;
    color: #1D1F22;`
const Name = styled.div`
height: 27px;
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 30px;
line-height: 27px;`

class ProductTitle extends React.Component {
    render() {
        return(
            <TitleWrapper>
                <Brand>{this.props.brand}</Brand>
                <Name>{this.props.name}</Name>
            </TitleWrapper>
        )
    }
}

export default ProductTitle