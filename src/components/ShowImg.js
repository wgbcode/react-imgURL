import Stores from "../stores/index";
import { observer } from "mobx-react";
import styled from "styled-components";

const WrapperImg = styled.div`
  position: relative;
  background: #323232;
  height: 80vh;
  img {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    max-height: 70vh;
    display: black;
  }
`;
const WrapperText = styled.div`
  margin: 16px;
  h1 {
    width: 160px;
    padding: 0px 16px 8px 8px;
    font-weight: 500;
    font-size: 15px;
    display: block;
  }
  span {
    font-size: 14px;
    background: #2b2b2b;
    color: white;
    padding: 4px 16px;
    border-radius: 4px;
  }
`;

const ShowImg = observer(() => {
  return (
    <>
      {Stores.serverFile ? (
        <div>
          <WrapperImg>
            <img src={Stores.serverFile.attributes.url.attributes.url} alt="" />
          </WrapperImg>
          <WrapperText>
            <h1>直接(源文件)链接</h1>
            <span>{Stores.serverFile.attributes.url.attributes.url}</span>
          </WrapperText>
        </div>
      ) : (
        ""
      )}
    </>
  );
});

export default ShowImg;
