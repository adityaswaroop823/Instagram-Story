import { useState, useEffect, useRef, useCallback } from "react";

const useFetch = <T,>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const calledOnce = useRef(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const controller = new AbortController();
    const { signal } = controller;

    try {
      const response = await fetch(url, { ...options, signal });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      if (!signal.aborted) {
        setError((err as Error).message);
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }

    return () => controller.abort();
  }, [url, options]);

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
