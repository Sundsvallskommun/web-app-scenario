import { EditResourceImage } from '@components/edit-resource/edit-resource-image.component';
import { Resource } from '@interfaces/resource';
import { apiURL } from '@utils/api-url';
import Image from 'next/image';
import { FieldValues, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'underscore.string';
import { EditResourceInput } from '../edit-resource/edit-resource-input.component';
import { useEffect, useState } from 'react';

interface EditImageProps {
  isNew?: boolean;
}

export const EditImage: React.FC<EditImageProps> = ({ isNew }) => {
  const [localUrl, setLocalUrl] = useState<string>('');
  const { t } = useTranslation();
  const resource = 'images';

  type CreateType = Parameters<NonNullable<Resource<FieldValues>['create']>>[0];
  type UpdateType = Parameters<NonNullable<Resource<FieldValues>['update']>>[1];
  type DataType = CreateType | UpdateType;

  const { watch, setValue } = useFormContext<DataType>();
  const formdata = watch();
  const image: File = watch('image');

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setValue('name', image.name, { shouldDirty: true });
      setLocalUrl(url);
    }
  }, [image]);

  const url = isNew ? localUrl : apiURL(formdata?.url);

  return (
    <div className="flex flex-col gap-32 grow mb-32 max-w-[60rem]">
      {isNew ?
        <EditResourceImage property="image" label={capitalize(t('images:name_one'))} />
      : <EditResourceInput property="name" required label={capitalize(t(`${resource}:properties.name`))} />}
      {url && (
        <>
          <h3>{t('images:preview')}</h3>
          <Image src={url} width="500" height="500" alt={''} className="h-auto w-auto" />
        </>
      )}
    </div>
  );
};
