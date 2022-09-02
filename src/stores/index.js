import { makeAutoObservable, runInAction } from "mobx";
import { Auth, Uploader } from "../models/index";

class Stores {
  currentUser = null;
  isUpLoading = false;
  serverFile = null;
  newHistoryList = [];
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
    runInAction(() => {
      this.isUpLoading = true;
    });
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
          runInAction(() => {
            this.isUpLoading = false;
          });
        });
    });
  }

  findHistory() {
    Uploader.find({ page: this.historyPage, limit: this.historyLimit })
      .then((newList) => {
        runInAction(() => {
          this.newHistoryList = this.newHistoryList.concat(newList);
        }); //只能在 action 中赋值
      })
      .catch((error) => {
        console.log(error);
      });
  }
  resetHistory() {
    this.newHistoryList = [];
  }
  resetServerFile() {
    this.serverFile = null;
  }
}

window.Stores = new Stores();
export default new Stores();
