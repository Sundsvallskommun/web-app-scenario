import { UserApiResponse } from '../../src/data-contracts/backend/data-contracts';

export const me: UserApiResponse = {
  data: {
    username: 'per00per',
    name: 'Person Personsson',
  },
  message: 'success',
};

export default me;
