import { useState, useEffect, useCallback, useMemo } from 'react';
import { complaintsApi } from '../api/complaintsApi';

export function useComplaints({ role, citizenId, filters = {} } = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const PER_PAGE = 10;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = { ...filters, page };
      if (role === 'Citizen') params.citizen_id = citizenId;
      const res = await complaintsApi.getAll(params);
      setData(res.data.results ?? res.data);
      setTotal(res.data.count ?? res.data.length);
    } catch (err) {
      setError(err.response?.data?.message ?? err.message);
    } finally {
      setLoading(false);
    }
  }, [role, citizenId, page, JSON.stringify(filters)]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const submitComplaint = useCallback(async (payload) => {
    const res = await complaintsApi.create(payload);
    await fetchData();
    return res.data;
  }, [fetchData]);

  const updateComplaint = useCallback(async (id, updates) => {
    const res = await complaintsApi.update(id, updates);
    setData(prev => prev.map(c => c.id === id ? { ...c, ...res.data } : c));
    return res.data;
  }, []);

  const pages = Math.ceil(total / PER_PAGE);

  return {
    data, loading, error, page, setPage, total, pages,
    refetch: fetchData, submitComplaint, updateComplaint,
  };
}