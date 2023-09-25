const getTilopayToken = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_TILOPAY_LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      apiuser: process.env.NEXT_PUBLIC_TILOPAY_API_USER,
      password: process.env.NEXT_PUBLIC_TILOPAY_API_PASSWORD,
    }),
  });
  console.log("response: ", response);
  return response;
};
export default getTilopayToken;
