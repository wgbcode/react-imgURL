import Stores from "../stores/index";
import { observer } from "mobx-react";
import styled from "styled-components";

const WrapperImg = styled.div`
  position: relative;
  background: #323232;
  flex-grow: 1;
  img {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    max-height: 90%;
    display: black;
  }
`;

const ShowImg = observer(() => {
  return (
    <>
      {Stores.serverFile ? (
        <WrapperImg>
          <img src={Stores.serverFile.attributes.url.attributes.url} alt="" />
        </WrapperImg>
      ) : (
        ""
      )}
    </>
  );
});

export default ShowImg;
