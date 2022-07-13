import Stores from "../stores/index";
import { observer } from "mobx-react";
import { InboxOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Uploader from "../components/Uploader";
import ShowImg from "../components/ShowImg";

const WrapperWarn = styled.div`
  font-size: 14px;
  background: #d1ecf1;
  margin: 0 100px;
  padding: 20px;
`;
const WrapperUpload = styled.div`
  border: 1px solid red;
  margin: 0 100px;
  .title {
    h1 {
      text-shadow: 4px 3px 1px rgba(108, 101, 101, 0.47);
      font-size: 24px;
    }
    p {
      font-size: 14px;
    }
    .ant-upload-picture-card-wrapper {
      width: 100%;
      border: 1px solid red;
    }
  }
`;
const Home = observer(() => {
  return (
    <>
      {Stores.currentUser ? (
        ""
      ) : (
        <WrapperWarn>请登录后再进行图片上传操作！</WrapperWarn>
      )}
      {Stores.serverFile ? (
        ""
      ) : (
        <WrapperUpload>
          <div className="title">
            <h1>Image Upload</h1>
            <p>最大可上传 5.00 MB 的图片，单次同时可选择 20 张。</p>
          </div>

          <Uploader listType="picture-card">
            <InboxOutlined />
          </Uploader>
        </WrapperUpload>
      )}
      <ShowImg />
    </>
  );
});

export default Home;
