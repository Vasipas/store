import React from 'react'
import styled from 'styled-components'

const GalleryWrapper = styled.div`
    display: flex;
    width: 730px;
    height: 511px;
    margin-right: 100px;
    `
const MiniGallery = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 511px;
    overflow: auto;
    margin-right: 40px;
    ::-webkit-scrollbar {
  width: 0;
}`
const BigPhotoWrapper = styled.div`
    display: flex;
    position; relative;
    align-items: center;
    justify-content: center;
    min-width: 610px;
    min-height: 511px;`
const BigPhoto = styled.img`
    display: block;
    max-width: 610px;
    max-height: 511px;
    margin: auto;`
const MiniPhotoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 79px; 
    min-height: 80px;
    margin-bottom: 32px;`
const MiniPhoto = styled.img`
    display: block;
    max-width: 79px;
    max-height: 80px;
    margin: auto;
    `
const OutOfStock = styled.div`
visibility: ${props => props.visible ? 'visible' : 'hidden'};
display: flex;
position: absolute;
width: 610px;
height: 511px;
color: #8D8F9A;
background: #fff;
opacity: 0.5;
text-transform: uppercase;
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 24px;
justify-content: center;
align-items: center;
`

class Gallery extends React.Component {
    state = {index: 0}
    setMiniPhotos = () => {
        return (this.props.gallery
            .map((item, index) => (
                <MiniPhotoWrapper key={index}>
                    <MiniPhoto id={index} key={index} src={item}/>
                </MiniPhotoWrapper>)))
    }
    showPhoto = event => {
        if(event.target.tagName === 'IMG') {
            this.setState({index: event.target.id})
        } else return
    }
    render() {
        return(
            <GalleryWrapper>
                <MiniGallery onClick={this.showPhoto}>
                    {this.setMiniPhotos()}
                </MiniGallery>
                <BigPhotoWrapper>
                    <OutOfStock visible={!this.props.inStock}>Out of stock</OutOfStock>
                    <BigPhoto src={this.props.gallery[this.state.index]}/>
                </BigPhotoWrapper>
            </GalleryWrapper>
        )
    }
}

export default Gallery