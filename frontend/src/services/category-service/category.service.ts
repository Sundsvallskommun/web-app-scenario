import {
  PublicCategoriesApiResponse,
  PublicCategory,
} from '@data-contracts/backend/data-contracts';
import { ServiceResponse } from '@interfaces/services.interface';
import { __DEV__ } from '@sk-web-gui/react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { apiService } from '../api-service';

const getCategoriesRequest = () => {
  return apiService
    .get<PublicCategoriesApiResponse>('categories')
    .then((res) => ({ data: res.data.data }))
    .catch((error) => {
      throw error;
    });
};

interface State {
  categories: PublicCategory[];
  loading: boolean;
  loaded: boolean;
}

interface Actions {
  getCategories: (force?: boolean) => Promise<ServiceResponse<PublicCategory[]>>;
  reset: () => void;
}

const initialState: State = {
  categories: [],
  loading: false,
  loaded: false,
};

export const useCategoryStore = create<State & Actions>()(
  devtools(
    (set, get) => ({
      ...initialState,
      getCategories: async (force = false) => {
        const state = get();

        if (state.loaded && !force) {
          return { data: state.categories };
        }

        set(() => ({ loading: true }));

        try {
          const res = await getCategoriesRequest();
          set(() => ({ categories: res.data ?? [], loaded: true, loading: false }));

          return res;
        } catch (error) {
          set(() => ({ categories: [], loaded: true, loading: false }));
          throw error;
        }
      },
      reset: () => set(initialState),
    }),
    { enabled: __DEV__ }
  )
);
