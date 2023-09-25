// Function to check if the access token is expired
export const isAccessTokenExpired = (expirationTimestamp) => {
  if (expirationTimeStamp === null) {
    return true;
  }
  const currentTimestamp = Date.now(); // Get the current timestamp in milliseconds
  //const date = new Date(expirationTimestamp);

  // Use the Date methods to get the various components of the date
  // const year = date.getFullYear();
  // const month = date.getMonth() + 1; // Months are zero-based, so add 1
  // const day = date.getDate();
  // const hours = date.getHours();
  // const minutes = date.getMinutes();
  // const seconds = date.getSeconds();

  // // Create a readable date string
  // const dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  //console.log(dateString);
  //verifies if expirationTimeStamp is less or iqual than current day and time in miliseconds

  if (currentTimestamp >= expirationTimestamp) {
    console.log("yes*********************");
    return true;
  } else {
    return false;
  }
};
