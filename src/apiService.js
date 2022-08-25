const login = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "bao@gmail.com" && password === "123") {
        resolve("1");
      } else {
        reject("0");
      }
    }, 1000);
  });
};

export { login };
