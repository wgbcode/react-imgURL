import Stores from "../stores/index";
import { observer } from "mobx-react";
import { InboxOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Uploader from "../components/Uploader";
import Icon from "../icon/icon";

const WrapperImg = styled.div`
  position: relative;
  background: #323232;
  height: 60vh;
`;
const Img = styled.img`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  max-height: 50vh;
  display: black;
`;
const WrapperText = styled.div`
  display: flex;
  align-items: center;
  h4 {
    width: 200px;
    padding: 0px 16px 0px 30px;
  }
  input {
    width: 800px;
  }
`;
const WrapperIll = styled.div`
  border: 1px solid red;
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
          <WrapperIll>
            <div>
              <Icon name="illustration" />
            </div>
            <span>直接源文件链接</span>
          </WrapperIll>
          <WrapperText>
            <h4>文件名</h4>
            <input value={Stores.serverFile.attributes.filename} readOnly />
          </WrapperText>
          <WrapperText>
            <h4>图片 URL</h4>
            <input
              value={Stores.serverFile.attributes.url.attributes.url}
              readOnly
            />
          </WrapperText>
        </div>
      ) : (
        ""
      )}
    </>
  );
});

export default Home;
