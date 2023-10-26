import { getToken } from "../moovin/getToken";

/**
 * Send the credentials to Moovin and return a response
 * with the needed token to make request
 */
const token = getToken();
console.log(token);
