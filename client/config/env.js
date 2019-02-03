const DEV = "development";
const PROD = "production";

const ENV = {
  [DEV]: {
    PATH: "http://localhost:8000"
  },
  [PROD]: {
    PATH: "https://XXX.jp"
  }
};

// const environment = process.env.NODE_ENV === "development" ? DEV : PROD;
// export default ENV[environment]

export default ENV[DEV]
