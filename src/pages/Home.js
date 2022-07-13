import Stores from "../stores/index";
import { observer } from "mobx-react";
import { InboxOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Uploader from "../components/Uploader";

const WrapperImg = styled.div`
  position: relative;
  background: #323232;
  height: 80vh;
`;
const Img = styled.img`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  max-height: 60vh;
  display: black;
`;

const Home = observer(() => {
  return (
    <>
      {Stores.currentUser ? "" : <div>请登录后再进行图片上传操作！</div>}
      {Stores.serverFile ? (
        ""
      ) : (
        <Uploader listType="picture-card">
          <InboxOutlined />
        </Uploader>
      )}
      {Stores.serverFile ? (
        <div>
          <WrapperImg>
            <Img src={Stores.serverFile.attributes.url.attributes.url} alt="" />
          </WrapperImg>
          <div>{Stores.serverFile.attributes.url.attributes.url}</div>
        </div>
      ) : (
        ""
      )}
    </>
  );
});

export default Home;
