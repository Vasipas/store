import React from "react";
import Category from "./Category";
import Actions from "./actions/Actions";
import styled from "styled-components";
import Logo from "../../assets/Group.svg";

const HeaderWrapper = styled.header`
      position: fixed;
      top: 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 1240px;
      height: 80px;
      z-index: 7;
      background: #fff;
      margin: 0 auto;`
const LogoImg = styled.img.attrs({src: Logo})`
    width: 41px;
    height: 41px;`

export default class Header extends React.Component {
    render() {
        return(
                <HeaderWrapper>
                    <Category/>
                    <LogoImg/>
                    <Actions/>
                </HeaderWrapper>
            )
    }
}