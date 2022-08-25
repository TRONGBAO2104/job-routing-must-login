const login = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "baobao@gmail.com.vn" && password === "123") {
        resolve("1");
      } else {
        reject("0");
      }
    }, 1000);
  });
};

export { login };
