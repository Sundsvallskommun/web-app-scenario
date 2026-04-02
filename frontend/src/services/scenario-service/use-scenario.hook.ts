import {
  PublicScenario,
  PublicScenarioIntroText,
} from '@data-contracts/backend/data-contracts';
import { useEffect, useState } from 'react';
import { getScenario, getScenarioIntroTexts, getScenarios } from './scenario.service';

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

export const useScenarios = () => {
  const [data, setData] = useState<PublicScenario[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoading(true);
    getScenarios()
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
  }, []);

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
