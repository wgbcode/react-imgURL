import { makeAutoObservable, runInAction } from "mobx";
import { Auth, Uploader } from "../models/index";
import { message } from "antd";

class Stores {
  constructor() {
    makeAutoObservable(this);
  }
  currentUser = null;
  isLoading = false;
  serverFile = null;
  newHistoryList = [];
  historyPage = 1;
  historyLimit = 10;
  isHistoryLoading = false;
  hasMoreHistory = true;
  pullUser() {
    this.currentUser = Auth.getCurrentUser();
  }
  resetUser() {
    this.currentUser = null;
    this.serverFile = null;
  }
  uploadImg(file, filename) {
    this.isUpoading = true;
    this.serverFile = null;
    return new Promise((resolve, reject) => {
      Uploader.add(file, filename)
        .then((serverFile) => {
          this.serverFile = serverFile;
          resolve(serverFile);
        })
        .catch((err) => {
          console.log("失败2");
          reject(err);
        })
        .finally(() => {
          this.isUpoading = false;
        });
    });
  }

  findHistory() {
    this.isHistoryLoading = true;
    Uploader.find({ page: this.historyPage, limit: this.historyLimit })
      .then((newList) => {
        console.log("newList", newList);
        runInAction(() => {
          this.newHistoryList = this.newHistoryList.concat(newList);
        }); //只能在 action 中赋值
        this.historyPage++;
        if (newList.length < this.historyLimit) {
          this.hasMoreHistory = false;
        }
      })
      .catch((error) => {
        message.error("加载数据失败");
        console.log(error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
  resetHistory() {
    this.newHistoryList = [];
  }
}

window.Stores = new Stores();
export default new Stores();
