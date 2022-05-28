import React from 'react'
import styled from "styled-components";
import Vector from "../../../../assets/Vector.svg";
import CurrencyItems from "./CurrencyItems";
import StateContext from "../../../StateContext";

const Currency = styled.div`
    display: flex;
    position: relative;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    width: 38px;
    height: 60px;
    align-items: center;
    justify-content: center;
    `
const SelectCurrency = styled.img.attrs({src: Vector})`
position: absolute;
left: 80%;
right: 20.59%;
top: 53.75%;
bottom: 38.75%;
width: 6px;
height: 3px;
transform: ${props => props.open ? 'rotate(-180deg)' : null};`
const CurrencyMenu = styled.div`
    visibility: ${props => props.open ? 'visible' : 'hidden'};
    position: absolute;
    display: flex;
    padding: 17px 0;
    flex-direction: column;
    width: 114px;
    z-index: 7;
    background: #fff;
    filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
`

class CurrencySwitcher extends React.Component {
    static contextType = StateContext
    state = {open: false}

    openMenu = () => {
        this.setState({open: true})
    }
    closeMenu = () => {
        this.setState({open: false})
    }

    changeCurrency = event => {
        event.stopPropagation()
        event.preventDefault()
        const newCurrency = {
            label: event.target.getAttribute('data-label'),
            symbol: event.target.getAttribute('data-symbol')}
        if(event.target.tagName === 'BUTTON') {
            const { changeCurrency } = this.context
            changeCurrency(newCurrency)
            this.setState({open: false})
        }
    }

    render() {
        const {selectedCurrency} = this.context
        return( <div onMouseOver={this.openMenu}
                     onMouseOut={this.closeMenu}>
                <Currency>
                    <div>{selectedCurrency.symbol}</div>
                    <SelectCurrency open={this.state.open}/>
                </Currency>
                <CurrencyMenu onClick={this.changeCurrency} open={this.state.open}>
                    <CurrencyItems/>
                </CurrencyMenu>
                </div>
        )
    }
}

export default CurrencySwitcher