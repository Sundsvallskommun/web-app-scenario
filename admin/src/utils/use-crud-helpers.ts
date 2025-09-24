import { ResourceResponse } from '@interfaces/resource';
import { useSnackbar } from '@sk-web-gui/react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'underscore.string';

export const useCrudHelper = (resource: string) => {
  const message = useSnackbar();
  const { t } = useTranslation();

  const handleGetOne = async <TData = unknown>(getOne: () => ResourceResponse<TData>): Promise<TData | undefined> => {
    const name = t(`${resource}:name_one`);
    try {
      const result = await getOne();
      return Promise.resolve(result.data.data);
    } catch {
      message({ message: capitalize(t('crud:get_one.error', { resource: name })), status: 'error' });
    }
  };

  const handleGetMany = async <TData = unknown>(
    getMany: () => ResourceResponse<TData[]>
  ): Promise<TData[] | undefined> => {
    const name = t(`${resource}:name_many`);
    try {
      const result = await getMany();
      return Promise.resolve(result.data.data);
    } catch {
      message({ message: capitalize(t('crud:get_one.error', { resource: name })), status: 'error' });
    }
  };

  const handleCreate = async <TData = unknown>(create: () => ResourceResponse<TData>): Promise<TData | undefined> => {
    const name = t(`${resource}:name_one`);
    try {
      const result = await create();
      if (result) {
        message({ message: capitalize(t('crud:create.success', { resource: name })), status: 'success' });
        return Promise.resolve(result.data.data);
      }
    } catch {
      message({ message: t('crud:create.error', { resource: name }), status: 'error' });
    }
  };

  const handleUpdate = async <TData = unknown>(update: () => ResourceResponse<TData>): Promise<TData | undefined> => {
    const name = t(`${resource}:name_one`);
    try {
      const result = await update();
      if (result) {
        message({ message: capitalize(t('crud:update.success', { resource: name })), status: 'success' });
        return Promise.resolve(result.data.data);
      }
    } catch {
      message({ message: capitalize(t('crud:update.error', { resource: name })), status: 'error' });
    }
  };

  const handleRemove = async <TData = unknown>(remove: () => ResourceResponse<TData>): Promise<TData | undefined> => {
    const name = t(`${resource}:name_one`);
    const the_name = t(`${resource}:the_name_one`);
    if (remove) {
      try {
        const result = await remove();
        if (result) {
          message({ message: capitalize(t('crud:remove.success', { resource: name })), status: 'success' });
          return Promise.resolve(result.data.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error?.status === 409) {
            message({
              message: `${capitalize(t('crud:remove.error_in_use', { resource: the_name }))}`,
              status: 'error',
            });
            return;
          }
        }
        message({ message: capitalize(t('crud:remove.error', { resource: name })), status: 'error' });
      }
    }
  };

  return { handleGetOne, handleGetMany, handleCreate, handleUpdate, handleRemove };
};
