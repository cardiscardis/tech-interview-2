import { useCallback,useEffect, useState } from 'react';

export type ApiResponse = {
Brand: string;
Description: string; 
Gender: string;
Image_1: string;
Name: string;
Quantity: number;
SKU: number;
Title: string
catalog_time: string;
size: string;
supplier: string;
[key: string]: string | number;
}

const useFetch = (url: string) => {
  const [data, setData] = useState<ApiResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse[] = await response.json();
      setData(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export default useFetch;
