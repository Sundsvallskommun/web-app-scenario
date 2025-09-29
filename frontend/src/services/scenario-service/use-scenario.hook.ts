import { PublicScenario } from '@data-contracts/backend/data-contracts';
import { useEffect, useState } from 'react';
import { getScenario } from './scenario.service';

export const useScenario = (id: number) => {
  const [data, setData] = useState<PublicScenario | null>(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoading(true);
    getScenario(id)
      .then((res) => {
        setData(res.data);

        setLoaded(true);
      })
      .catch(() => {
        setLoaded(false);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return { data, loading, loaded };
};
