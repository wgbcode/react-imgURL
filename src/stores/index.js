import { makeAutoObservable } from "mobx";
import { Auth } from "../models/index";

class Stores {
  constructor() {
    makeAutoObservable(this);
  }
  currentUser = null;
  pullUser() {
    this.currentUser = Auth.getCurrentUser();
  }
  resetUser() {
    this.currentUser = null;
  }
}

export default new Stores();
