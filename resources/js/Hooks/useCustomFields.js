import { useState, useEffect } from "react";
import axios from "axios";

const useCustomFields = (location) => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get(`/api/meta-fields/${location}`);
        setFields(response.data);
      } catch (error) {
        console.error("Error fetching custom fields:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, [location]);

  return { fields, loading };
};

export default useCustomFields;
