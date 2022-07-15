import { makeAutoObservable, runInAction } from "mobx";
import { Auth, Uploader } from "../models/index";
import { message } from "antd";

class Stores {
  currentUser = null;
  isUpLoading = false;
  serverFile = null;
  newHistoryList = [];
  isHistoryLoading = false;
  constructor() {
    makeAutoObservable(this);
  }
  pullUser() {
    this.currentUser = Auth.getCurrentUser();
  }
  resetUser() {
    this.currentUser = null;
    this.serverFile = null;
  }
  uploadImg(file, filename) {
    this.action(this.isUpLoading, true);
    this.serverFile = null;
    return new Promise((resolve, reject) => {
      Uploader.add(file, filename)
        .then((serverFile) => {
          runInAction(() => {
            this.serverFile = serverFile;
          });
          resolve(serverFile);
        })
        .catch((err) => {
          console.log("失败2");
          reject(err);
        })
        .finally(() => {
          this.action(this.isUpLoading, false);
        });
    });
  }

  findHistory() {
    this.action(this.isHistoryLoading, true);
    Uploader.find({ page: this.historyPage, limit: this.historyLimit })
      .then((newList) => {
        runInAction(() => {
          this.newHistoryList = this.newHistoryList.concat(newList);
        }); //只能在 action 中赋值
      })
      .catch((error) => {
        message.error("加载数据失败");
        console.log(error);
      })
      .finally(() => {
        this.action(this.isHistoryLoading, false);
      });
  }
  resetHistory() {
    this.newHistoryList = [];
  }
  resetServerFile() {
    this.serverFile = null;
  }
  action(name, newValue) {
    runInAction(() => (name = newValue));
  }
}

window.Stores = new Stores();
export default new Stores();
