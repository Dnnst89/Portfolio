import { useEffect, useState } from "react";

const useStorage = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const { user } = JSON.parse(localStorage.getItem("userData"));
      setUser(user ?? null);
    } catch (error) {
      setUser(null);
    }
  };

  return { user };
};

export default useStorage;
