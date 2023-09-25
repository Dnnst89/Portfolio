import { isAccessTokenExpired } from "./isAccessTokenExpired";

export async function refreshToken() {
  try {
    // Send credentials and request a new token
    const dataResponse = await getTilopayToken();
    console.log(
      "******************************************************************************"
    );
    console.log(dataResponse);
    // Check if the response is correct
    if (dataResponse.status === 200) {
      const accessData = await dataResponse.json();
      accessToken = accessData.access_token;
      const expirationTimestamp = Date.now() + accessData.expires_in * 1000; // Convert seconds to milliseconds
      const type_token = accessData.token_type;
      // verify if the token has expired
      if (isAccessTokenExpired(expirationTimestamp)) {
        return accessToken;
      } else {
        console.log("Token has expired...");
      }
    } else {
      console.error("An error occurred:");
    }
  } catch (error) {
    console.error("Error requesting access data:", error.message);
  }
}
