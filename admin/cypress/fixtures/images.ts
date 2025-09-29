import { ImageApiResponse, ImagesApiResponse } from '../../src/data-contracts/backend/data-contracts';

export const image1 = {
  id: 1,
  name: 'image1.png',
  filename: 'image1.png',
  url: '/files/image1.png',
  createdAt: '2025-09-10T14:24:46.527Z',
  updatedAt: '2025-09-20T14:24:46.527Z',
};
export const image2 = {
  id: 2,
  name: 'image2.png',
  filename: 'image2.png',
  url: '/files/image2.png',
  createdAt: '2025-09-11T14:24:46.527Z',
  updatedAt: '2025-09-16T14:24:46.527Z',
};
export const image3 = {
  id: 3,
  name: 'image3.png',
  filename: 'image3.png',
  url: '/files/image3.png',
  createdAt: '2025-09-12T14:24:46.527Z',
  updatedAt: '2025-09-18T14:24:46.527Z',
};
export const image4 = {
  id: 4,
  name: 'image4.png',
  filename: 'image4.png',
  url: '/files/image4.png',
  createdAt: '2025-09-22T14:24:46.527Z',
  updatedAt: '2025-09-22T14:24:46.527Z',
};

const image1WithScenarions = {
  ...image1,
  scenarios: [
    {
      id: 1,
      assistantId: '1234-2345-3456-4567',
      name: 'Scenario 1',
      description: '',
      published: true,
      imageId: 1,
      createdAt: '2025-09-10T14:33:13.035Z',
      updatedAt: '2025-09-18T07:32:02.619Z',
      image: image1,
    },

    {
      id: 2,
      assistantId: '4234-2345-3456-4567',
      name: 'Scenario 2',
      description: '',
      published: true,
      imageId: 1,
      createdAt: '2025-09-11T14:33:13.035Z',
      updatedAt: '2025-09-16T07:32:02.619Z',
      image: image1,
    },
  ],
};
export const oneImage: ImageApiResponse = {
  message: 'success',
  data: image1WithScenarions,
};

export const newImage: ImageApiResponse = {
  message: 'success',
  data: image4,
};

export const images: ImagesApiResponse = {
  data: [image1, image2, image3],
  message: 'success',
};

export const imagesWithNew: ImagesApiResponse = {
  data: [image1, image2, image3, image4],
  message: 'success',
};

export default images;
