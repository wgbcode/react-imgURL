import styled from "styled-components";
import { Button } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: colomn;
  justify-content: space-between;
  background: grey;
  padding: 16px 35px;
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
`;
const StyledLink = styled(NavLink)`
  padding: 0px 20px;
  color: black;
  font-size: 14px;
`;
const StyledButton = styled(Button)`
  margin: 0 8px;
`;

const Header = () => {
  return (
    <Wrapper>
      <Div>
        <StyledLink to="/home">首页</StyledLink>
        <StyledLink to="/history">历史记录</StyledLink>
        <StyledLink to="/about">关于我</StyledLink>
      </Div>
      <Div>
        <StyledButton type="primary">
          <StyledLink to="/login"> 登录</StyledLink>
        </StyledButton>
        <StyledButton type="primary">
          <StyledLink to="/register">注册</StyledLink>
        </StyledButton>
      </Div>
    </Wrapper>
  );
};

export default Header;
