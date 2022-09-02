import styled from "styled-components";
import { Button, message } from "antd";
import { NavLink } from "react-router-dom";
import Stores from "../stores/index";
import { Auth } from "../models/index";
import { observer } from "mobx-react";
import { useEffect } from "react";
import logo from "../icons/logo.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: colomn;
  justify-content: space-between;
  background: white;
  padding: 18px 35px 25px 35px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  a,
  button {
    font-size: 16px;
  }
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
`;
const StyledButton = styled(Button)`
  margin: 0 12px;
  border-radius: 4px;
  padding: 0;
`;

const Header = observer(() => {
  const logout = () => {
    Stores.resetUser();
    Auth.logout();
  };
  useEffect(() => {
    Stores.pullUser();
  }, []);
  return (
    <Wrapper>
      <Div>
        <img
          src={logo}
          style={{ height: "2.5em", paddingRight: "25px", paddingTop: "3px" }}
        />
        <StyledLink to="/home" onClick={() => Stores.resetServerFile()}>
          首页
        </StyledLink>
        <StyledLink to="/history">历史记录</StyledLink>
        <StyledLink to="/about">关于我</StyledLink>
      </Div>
      {Stores.currentUser ? (
        <Div>
          {Stores.serverFile ? (
            <>
              <CopyToClipboard
                text={Stores.serverFile.attributes.url.attributes.url}
                onCopy={() => message.success("复制成功~")}
              >
                <Button
                  type="default"
                  style={{
                    height: "30px",
                    padding: "0 25px",
                    borderRadius: "4px",
                  }}
                >
                  复制 imgUrl
                </Button>
              </CopyToClipboard>
              <StyledButton
                type="default"
                onClick={() => Stores.resetServerFile()}
                style={{ height: "30px", padding: "0 25px" }}
              >
                Image Upload
              </StyledButton>
            </>
          ) : (
            ""
          )}
          <StyledButton
            type="danger"
            onClick={() => logout()}
            style={{ height: "30px" }}
          >
            <span style={{ padding: "0 30px" }}>注销</span>
          </StyledButton>
        </Div>
      ) : (
        <Div>
          <StyledButton
            type="default"
            onClick={() => {
              message.error("域名维护中，暂时无法登录！");
            }}
          >
            <StyledLink to="/login">登录</StyledLink>
          </StyledButton>
          <StyledButton
            type="primary"
            onClick={() => {
              message.error("域名维护中，暂时无法注册！");
            }}
          >
            <StyledLink to="/register">注册</StyledLink>
          </StyledButton>
        </Div>
      )}
    </Wrapper>
  );
});

export default Header;
