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
    if (!categoryId || !id) {
      setData(null);
      setLoaded(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    getCategoryScenario(categoryId, id)
      .then((res) => {
        setData(res.data);
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(true);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId, id]);

  return { data, loading, loaded };
};

export const useScenarios = (categoryId: number) => {
  const [data, setData] = useState<PublicScenario[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!categoryId) {
      setData(null);
      setLoaded(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    getCategoryScenarios(categoryId)
      .then((res) => {
        setData(res.data);
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(true);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
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
