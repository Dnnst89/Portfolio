import { GET_BRANDS_BY_AGE_RANGE } from "../src/graphQl/queries/getBrandsByAgeRange";
import { useLazyQuery } from "@apollo/client";

/**
 * @param {Number} minAge - Start Age
 * @param {Number} maxAge - End Age
 * @returns the brands between two ages
 */
const useBrandsByAgeRange = (minAge, maxAge) => {
  const [getBrandsByAge, { loading, data }] = useLazyQuery(
    GET_BRANDS_BY_AGE_RANGE,
    {
      variables: {
        initialAge: minAge,
        finalAge: maxAge,
      },
    }
  );
  return { loading, data, getBrandsByAge };
};

export default useBrandsByAgeRange;
