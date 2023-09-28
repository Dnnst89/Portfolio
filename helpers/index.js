import axios from "axios";
const url =
  "https://lemur-5.cloud-iam.com/auth/realms/centauro/protocol/openid-connect";
const tokenIntance = axios.create({
  baseURL: url,
  timeout: 10000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache",
    "Postman-Token": "02efe61c-57fc-482b-99f1-13d19062e78b",
  },
});


const body = {
    mode: "urlencoded",
    urlencoded: [
      { key: "grant_type", value: "client_credentials", disabled: false },
      { key: "client_id", value: "detecno_api", disabled: false },
      {
        key: "client_secret",
        value: "5NEaFVYvxxwHIMSVGeBpzYWIWVzOsFS0",
        disabled: false,
      },
      { key: "scope", value: "openid profile email", disabled: false },
    ],
}
const getAccessToken = async () => {
  const data = await tokenIntance.post("/token", body);
  console.log(data)
};
// const echoPostRequest = {
//   url: "https://lemur-5.cloud-iam.com/auth/realms/centauro/protocol/openid-connect/token",
//   method: "POST",
//   header: {
//     "Content-Type": "application/x-www-form-urlencoded",
//     "cache-control": "no-cache",
//     "Postman-Token": "02efe61c-57fc-482b-99f1-13d19062e78b",
//   },
//   body: {
//     mode: "urlencoded",
//     urlencoded: [
//       { key: "grant_type", value: "client_credentials", disabled: false },
//       { key: "client_id", value: "detecno_api", disabled: false },
//       {
//         key: "client_secret",
//         value: "5NEaFVYvxxwHIMSVGeBpzYWIWVzOsFS0",
//         disabled: false,
//       },
//       { key: "scope", value: "openid profile email", disabled: false },
//     ],
//   },
// };
// pm.sendRequest(echoPostRequest, function (err, res) {
//   console.log(err ? err : res.json());
//   if (err === null) {
//     console.log("Saving the token and expiry date");
//     var responseJson = res.json();
//     pm.environment.set("access_token", responseJson.access_token);
//   }
// });
export { getAccessToken }