import { apiURL } from '@utils/api-url';
import Image, { ImageProps } from 'next/image';

type BackendImageProps = Omit<ImageProps, 'src'> & {
  src?: string | null;
};

export const BackendImage = ({ src, alt, ...props }: BackendImageProps) => {
  if (!src) {
    return null;
  }

  return <Image {...props} src={apiURL(src)} alt={alt} unoptimized />;
};
