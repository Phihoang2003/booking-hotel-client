import { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../utils/baseUrl";
const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${base_url}${url}`);
        setData(res.data);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${base_url}${url}`);
      setData(res.data);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  return { data, loading, error, reFetch };
};
export default useFetch;
