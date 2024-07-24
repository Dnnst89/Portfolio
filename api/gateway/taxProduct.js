import { getAccessToken } from "@/helpers";
import formatTaxData from "./formatProduct";
import { facturationInstace } from "@/src/axios/algoliaIntance/config";

const taxProduct = async (variant) => {
  try {
    const token = await getAccessToken();
    const formatedItem = formatTaxData(unitaryPrice, qty, cabys);

    const body = {
      serviceDetail: {
        lineDetails: [formatedItem],
      },
    };
    const { data } = await facturationInstace.post(
      `/utils/get-detail-line?access_token=${token}`,
      body
    );

    return data;
  } catch (error) {
    console.error("Error getting taxes:", error);
    throw error;
  }
};
export { taxProduct };
