// Define Moovin authentication endpoint URL
const MOOVIN_AUTH_ENDPOINT = process.env.NEXT_PUBLIC_MOOVIN_AUTH_URL;

// Variables to store the access token and token expiration time
let accessToken = null;
let expirationDate = null;

// Function to authenticate and obtain the access token
export async function getToken() {
  try {
    if (!accessToken || isAccessTokenExpired()) {
      // Call refreshToken to refresh the token
      accessToken = await refreshToken();
    }

    return accessToken;
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
}

// Function to check if the access token is expired
export function isAccessTokenExpired() {
  return !accessToken || Date.now() >= expirationDate;
}

// Function to refresh the access token
export async function refreshToken() {
  try {
    const response = await fetch(MOOVIN_AUTH_ENDPOINT, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.NEXT_PUBLIC_MOOVIN_TOKEN,
        // Agrega cualquier otro encabezado necesario aquí
      },
      body: JSON.stringify({
        username: process.env.NEXT_PUBLIC_MOOVIN_USER,
        password: process.env.NEXT_PUBLIC_MOOVIN_PASSWORD,
      }),
    });

    console.log("Token refresh response:", response);

    if (response.ok) {
      const responseData = await response.json();
      console.log("Token refreshed successfully. Response data:", responseData);

      accessToken = responseData.token;
      const expirationDateString = responseData.expirationDate;
      expirationDate = new Date(expirationDateString);

      return accessToken;
    } else {
      console.error("Token refresh failed with status:", response.status);
      const errorResponse = await response.json(); // Obtener más información sobre el error
      console.error("Token refresh error response:", errorResponse);
      throw new Error("Token refresh failed");
    }
  } catch (error) {
    console.error("Token refresh error:", error);
    throw error;
  }
}
