import * as React from "react";
import { useEffect } from "react";
import Stores from "../stores/index";
import { Avatar, List, Space } from "antd";
import { observer } from "mobx-react";
import dayjs from "dayjs";

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
    <div
      style={{
        background: "grey",
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {Stores.currentUser ? (
        <List
          style={{
            margin: "10px 200px 0px 100px",
            padding: "10px 20px 20px 20px",
            boxShadow:
              "2px 2px 4px 0 rgba(0,0,0,0.1),-2px -2px 4px 0 rgba(0,0,0,0.)",
            borderRadius: "4px 4px 0 0",
            background: "white",
          }}
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 5,
            defaultCurrent: 1,
            total: `${Stores.newHistoryList.length}`,
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
      ) : (
        <List
          style={{
            background: "white",
            flexGrow: "1",
            padding: "100px",
          }}
          renderItem={(item) => <List.Item key={item.heft}></List.Item>}
        />
      )}
    </div>
  );
});

export default History;
