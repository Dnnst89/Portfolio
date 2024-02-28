import coverageArea from "@/api/moovin/coverageArea";
import { MOOVIN_RESPONSE } from "@/helpers/messageTypes";
import { useEffect, useState } from "react";

const useFetchMoovinCoverageData = (lat, lng) => {
  const [moovinMessageError, setMoovinMessageError] = useState("");
  const [blockMoovin, setBlockMoovin] = useState(false);
  const [isMoovinAvailable, setIsMoovinAvailable] = useState(null);

  useEffect(() => {
    const fetchMoovinCoverageData = async () => {
      try {
        const response = await coverageArea(lat, lng);

        if (response === MOOVIN_RESPONSE.OUT_OF_COVERAGE) {
          setBlockMoovin(true);
          setMoovinMessageError(MOOVIN_RESPONSE.ERROR_OUT_OF_COVERAGE);
        } else if (response === MOOVIN_RESPONSE.DANGER_ZONE) {
          setBlockMoovin(true);
          setMoovinMessageError(MOOVIN_RESPONSE.ERROR_DANGER_ZONE);
        } else {
          setBlockMoovin(false);
          setIsMoovinAvailable(response);
        }
      } catch (error) {
        console.error(MOOVIN_RESPONSE.ERROR_DEFAULT, error);
      }
    };

    fetchMoovinCoverageData();
  }, [lat, lng]);

  // Devolvemos los valores que necesitamos
  return { blockMoovin, moovinMessageError, isMoovinAvailable };
};

export default useFetchMoovinCoverageData;
