import React from "react"
import styled from 'styled-components'
import Loader from "../assets/Preloader.gif";

const Preload = styled.img.attrs({src: Loader})`
margin: auto;
`

export default class Preloader extends React.Component {
    render() {
        return(<Preload/>)
    }
}