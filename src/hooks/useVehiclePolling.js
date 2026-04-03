import { useEffect, useRef, useState } from 'react';
import { API_BASE_URL, POLL_INTERVAL_MS } from '../utils/constants';

export function useVehiclePolling(routeId = null, vehicleType = null) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        let url = `${API_BASE_URL}/locations`;
        const params = new URLSearchParams();
        if (routeId) params.append('routeId', routeId);
        if (vehicleType) params.append('type', vehicleType);
        if ([...params].length > 0) url += `?${params.toString()}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setVehicles(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations(); // immediate call
    const interval = setInterval(fetchLocations, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [routeId, vehicleType]);

  return { vehicles, loading, error };
}