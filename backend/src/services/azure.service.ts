import { AZURE_REGION, AZURE_SUBSCRIPTION_KEY } from '@/config';
import { logger } from '@/utils/logger';
import axios from 'axios';
import { HttpError } from 'routing-controllers';

export const getToken = async () => {
  if (!AZURE_REGION || !AZURE_SUBSCRIPTION_KEY) {
    logger.error('Missing Azure credentials');
    throw new HttpError(400, 'Missing credentials');
  }
  try {
    const url = `https://${AZURE_REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken`;
    const headers = {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': AZURE_SUBSCRIPTION_KEY,
    };

    const token = await axios({ method: 'POST', url, headers });

    if (token) {
      logger.info('Azure Token received');
      return token.data;
    } else {
      logger.error('Something went wrong when fetching Azure Token');
      throw new Error('Something went wrong when fetching Azure Token');
    }
  } catch (e) {
    logger.error('Error getting Azure Token', e);
    throw new HttpError(501, 'Error getting Azure Token');
  }
};
