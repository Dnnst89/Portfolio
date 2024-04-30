import { useQuery } from '@apollo/client';
import GET_STORE_INFO from '@/src/graphQl/queries/getStoreInformation';

const useStoreInformation = (id) => {
  const { data, error, loading } = useQuery(GET_STORE_INFO, {
    variables: { id },
  });

  return { storeInformation: data, storeInformationError: error, loading };
};

export default useStoreInformation;
