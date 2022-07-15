import * as React from "react";
import { useEffect } from "react";
import Stores from "../stores/index";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import { observer } from "mobx-react";
import dayjs from "dayjs";
import styled from "styled-components";

// const Wrapper = styled.div`
//   border: 1px solid red;
//   height: 80vh;
//   width: 80vw;
// `;
const History = observer(() => {
  useEffect(() => {
    Stores.findHistory();
    return () => {
      Stores.resetHistory();
    };
  }, []);
  const getFiledName = (item) => {
    const file = item.attributes.filename;
    return file.substring(0, file.lastIndexOf("."));
  };
  const formatFileSize = (fileSize) => {
    if (fileSize < 1024) {
      return fileSize + "B";
    } else if (fileSize < 1024 * 1024) {
      var temp = fileSize / 1024;
      temp = temp.toFixed(2);
      return temp + "KB";
    } else if (fileSize < 1024 * 1024 * 1024) {
      var temp = fileSize / (1024 * 1024);
      temp = temp.toFixed(2);
      return temp + "MB";
    } else {
      var temp = fileSize / (1024 * 1024 * 1024);
      temp = temp.toFixed(2);
      return temp + "GB";
    }
  };
  const data = Stores.newHistoryList.map((item, index) => ({
    href: `${item.attributes.url.attributes.url}`,
    title: `${index + 1 + "." + getFiledName(item)}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    description: `FileName: ${item.attributes.filename} 
    Size: ${formatFileSize(item.attributes.url.attributes.metaData.size)} 
    CreatedAt:  ${dayjs(item.attributes.url.createdAt).format("YYYY-MM-DD")} 
    UpdatedAt: ${dayjs(item.attributes.url.updatedAt).format("YYYY-MM-DD")} 
    ImgURL: ${item.attributes.url.attributes.url}`,
  }));
  return (
    <>
      <List
        style={{ margin: "20px 30px" }}
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 5,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.heft}
            extra={<img width={272} alt="logo" src={item.href} />}
          >
            <List.Item.Meta
              style={{
                whiteSpace: "pre-line",
                wordBreak: "break-all",
                wordWrap: "break-word",
              }}
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </>
  );
});

export default History;
