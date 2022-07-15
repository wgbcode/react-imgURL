import Stores from "../stores/index";
import { observer } from "mobx-react";
import styled from "styled-components";
import UploadImg from "../components/UploadImg";
import ShowImg from "../components/ShowImg";
import add from "../icons/add.svg";

const WrapperWarn = styled.div`
  font-size: 14px;
  background: black;
  margin: 50px 100px 10px 100px;
  padding: 10px;
  border-radius: 4px;
  color: red;
`;
const WrapperUpload = styled.div`
  margin: 20px 100px;
  .title {
    h1 {
      text-shadow: 4px 3px 1px rgba(108, 101, 101, 0.47);
      font-size: 24px;
    }
    p {
      font-size: 12px;
      font-weigth:300;
    }
  }
 .ant-upload-picture-card-wrapper {
    border:1px dashed black;
    :hover{
       border:1px dashed #38adf4;
    }
    .ant-upload {
        width: 100%;
        background:white;
        height:250px;
        margin:0;
        border:none;
      }
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
        <ShowImg />
      ) : (
        <WrapperUpload>
          <div className="title">
            <h1>Image Upload</h1>
            <p>最大可上传 5.00 MB 的图片，单次同时可选择 20 张。</p>
          </div>
          <UploadImg listType="picture-card">
            {Stores.isUpLoading ? (
              <div>上传中</div>
            ) : (
              <div>
                <img src={add} style={{ height: 50, width: 50 }} />
                <div style={{ fontSize: 14, fontWeight: 345 }}>
                  点击或拖拽文件,即可完成上传!
                </div>
              </div>
            )}
          </UploadImg>
        </WrapperUpload>
      )}
    </>
  );
});

export default Home;
