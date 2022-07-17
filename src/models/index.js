import AV from "leancloud-storage";

AV.init({
  appId: "itWl2eh5wy3fdbGo6i8RFSMe-MdYXbMMI",
  appKey: "4hzHzkjpIokCLH6wxcPTbc4y",
  serverURL: "https://itwl2eh5.api.lncldglobal.com",
});

const Auth = {
  register(username, password) {
    const user = new AV.User();
    user.setUsername(username);
    user.setPassword(password);
    return new Promise((resolve, reject) =>
      user.signUp().then(
        (user) => resolve(user),
        (error) => reject(error)
      )
    );
  },
  login(username, password) {
    return new Promise((resolve, reject) =>
      AV.User.logIn(username, password).then(
        (user) => resolve(user),
        (error) => reject(error)
      )
    );
  },
  logout() {
    AV.User.logOut();
  },
  getCurrentUser() {
    return AV.User.current();
  },
};
const Uploader = {
  add(file, filename) {
    const item = new AV.Object("Image");
    const avFile = new AV.File(filename, file);
    item.set("owner", AV.User.current());
    item.set("filename", filename);
    item.set("url", avFile);
    return new Promise((resolve, reject) => {
      item.save().then(
        (serverFile) => {
          resolve(serverFile);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  find() {
    const query = new AV.Query("Image");
    query.include("owner");
    query.descending("createdAt");
    query.equalTo("owner", AV.User.current());
    return new Promise((resolve, reject) => {
      query
        .find()
        .then((results) => {
          resolve(results);
        })
        .catch((error) => reject(error));
    });
  },
};

window.Auth = Auth;
window.Uploader = Uploader;
export { Auth, Uploader };
