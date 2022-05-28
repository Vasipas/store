import React from 'react'
import styled from 'styled-components'
import Vector from '../../assets/Vector_Gallery.svg'

const ItemGalleryWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 200px;
    height: 288px;
    margin-left: 24px;
    `
const GalleryButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    position: absolute;
    bottom: 16px;
    background: rgba(0, 0, 0, 0.73);
transform: matrix(-1, 0, 0, 1, 0, 0);
    `
const ButtonLeft = styled(GalleryButton)`
visibility: ${props => props.visibility === 'true' ? 'visible' : 'hidden'};
right: 48px;
`
const ButtonRight = styled(GalleryButton)`
visibility: ${props => props.visibility === 'true' ? 'visible' : 'hidden'};
right: 16px;
`
const ItemPhoto = styled.img`
display: block;
max-width: 200px;
max-height: 288px;`
const Arrow = styled.img.attrs({src: Vector, alt: 'arrow'})`
    display: block;
    `

class ItemGallery extends React.Component {
    state = {index: 0}
    prevPhoto = () => {
        const lastIndex = this.props.gallery.length-1
        const currentIndex = this.state.index
        const prevIndex = currentIndex-1
        if(currentIndex === 0) {
            this.setState({index: lastIndex})
        } else this.setState({index: prevIndex})
    }
    nextPhoto = () => {
        const lastIndex = this.props.gallery.length-1
        const currentIndex = this.state.index
        const nextIndex = currentIndex+1
        if(currentIndex === lastIndex) this.setState({index: 0})
        else this.setState({index: nextIndex})
    }
    render() {
        let gallery = this.props.gallery
        const visibleButtons = () => {
            if(gallery.length > 1) return 'true'
            else return 'false'
        }
        return(<ItemGalleryWrapper>
            <ItemPhoto src={gallery[this.state.index]}/>
            <ButtonLeft onClick={this.prevPhoto} visibility={visibleButtons()}><Arrow style={{transform: 'rotate(-180deg)'}}/></ButtonLeft>
            <ButtonRight onClick={this.nextPhoto} visibility={visibleButtons()}><Arrow/></ButtonRight>
        </ItemGalleryWrapper>)
    }
}

export default ItemGallery