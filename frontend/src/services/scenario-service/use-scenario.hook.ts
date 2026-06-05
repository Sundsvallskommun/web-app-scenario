import {
  PublicScenario,
  PublicScenarioIntroText,
} from '@data-contracts/backend/data-contracts';
import { useEffect, useState } from 'react';
import { getCategoryScenario, getCategoryScenarios, getScenarioIntroTexts } from './scenario.service';

export const useScenario = (categoryId: number, id: number) => {
  const [data, setData] = useState<PublicScenario | null>(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setData(null);
    setLoaded(false);
    setLoading(true);

    if (!categoryId || !id) {
      setLoaded(true);
      setLoading(false);
      return;
    }

    getCategoryScenario(categoryId, id)
      .then((res) => {
        if (cancelled) {
          return;
        }

        setData(res.data);
        setLoaded(true);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setLoaded(true);
        setData(null);
      })
      .finally(() => {
        if (cancelled) {
          return;
        }

        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [categoryId, id]);

  return { data, loading, loaded };
};

export const useScenarios = (categoryId: number) => {
  const [data, setData] = useState<PublicScenario[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setData(null);
    setLoaded(false);
    setLoading(true);

    if (!categoryId) {
      setLoaded(true);
      setLoading(false);
      return;
    }

    getCategoryScenarios(categoryId)
      .then((res) => {
        if (cancelled) {
          return;
        }

        setData(res.data);
        setLoaded(true);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setLoaded(true);
        setData(null);
      })
      .finally(() => {
        if (cancelled) {
          return;
        }

        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  return { data, loading, loaded };
};

export const useScenarioIntroTexts = () => {
  const [data, setData] = useState<PublicScenarioIntroText[]>([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoading(true);
    getScenarioIntroTexts()
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        setData([]);
      })
      .finally(() => {
        setLoaded(true);
        setLoading(false);
      });
  }, []);

  return { data, loading, loaded };
};
