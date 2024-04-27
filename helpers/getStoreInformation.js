import { useQuery } from '@apollo/client';
import GET_STORE_INFO from '@/src/graphQl/queries/getStoreInformation';

const useStoreInformation = (id) => {
  const { loading, error, data: storeInformation } = useQuery(GET_STORE_INFO, {
    variables: {
      id: id,
    },
  });

  if (loading || error) {
    return null; 
  }

  return storeInformation;
};

export default useStoreInformation;
