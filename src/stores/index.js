import { makeAutoObservable } from "mobx";
import { Auth, UpLoader } from "../models/index";

class Stores {
  constructor() {
    makeAutoObservable(this);
  }
  currentUser = null;
  isloading = false;
  serverFile = null;
  pullUser() {
    this.currentUser = Auth.getCurrentUser();
  }
  resetUser() {
    this.currentUser = null;
  }
  upload(file, filename) {
    this.isUpoading = true;
    this.serverFile = null;
    return new Promise((resolve, reject) => {
      UpLoader.add(file, filename)
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
}

export default new Stores();
