import AV from "leancloud-storage";

AV.init({
  appId: "3XYdRUVfkERSi6IqIoi2G9Rr-gzGzoHsz",
  appKey: "6WN7Az83Dtht7NyQv9QA08ec",
  serverURL: "https://3xydruvf.lc-cn-n1-shared.com",
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
  getCurrentUser() {
    return AV.User.current();
  },
};
const UpLoader = {
  add() {
    const todo = new AV.Object("string");
    todo.set("title", "马拉松报名");
    todo.set("priority", 2);
    return new Promise((resolve, reject) =>
      todo.save().then(
        (value) => resolve(value),
        (error) => reject(error)
      )
    );
  },
  find() {
    const query = new AV.Query("string");
    query.equalTo("title", "马拉松报名");
    return new Promise((resolve, reject) =>
      query.find().then(
        (value) => resolve(value),
        (error) => reject(error)
      )
    );
  },
};

export { Auth, UpLoader };
