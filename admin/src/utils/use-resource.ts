import resources from '@config/resources';
import { ResourceName } from '@interfaces/resource-name';
import 'dotenv';
import { useCallback, useEffect } from 'react';
import { useCrudHelper } from './use-crud-helpers';
import { useLocalStorage } from './use-localstorage.hook';
import { useShallow } from 'zustand/react/shallow';

export const useResource = (resource: ResourceName) => {
  const [resourceData, setData, setLoaded, setLoading] = useLocalStorage(
    useShallow((state) => [state.resourceData, state.setData, state.setLoaded, state.setLoading])
  );

  const getMany = resources?.[resource]?.getMany;
  const { handleGetMany } = useCrudHelper(resource);

  const data = resourceData[resource]?.data ?? [];
  const loaded = resourceData[resource]?.loaded ?? false;
  const loading = resourceData[resource]?.loading ?? false;

  const refresh = useCallback(() => {
    if (getMany) {
      setLoading(resource, true);
      handleGetMany(getMany)
        .then((res) => {
          if (res) {
            setData(resource, res);
            setLoaded(resource, true);
          }
          setLoading(resource, false);
        })
        .catch(() => setLoading(resource, false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  useEffect(() => {
    if (!loaded || !resourceData) {
      refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  return { data, loaded, loading, refresh };
};
