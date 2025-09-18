import { EditResourceTextarea } from '@components/edit-resource/edit-resource-textarea.component';
import { Image } from '@data-contracts/backend/data-contracts';
import { Resource } from '@interfaces/resource';
import { Button, Icon } from '@sk-web-gui/react';
import { apiURL } from '@utils/api-url';
import { X } from 'lucide-react';
import NextImage from 'next/image';
import { useState } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'underscore.string';
import { EditResourceInput } from '../edit-resource/edit-resource-input.component';
import { AddImageModal } from './components/add-image-modal.component';

interface EditScenarioProps {
  isNew?: boolean;
}

export const EditScenario: React.FC<EditScenarioProps> = ({ isNew }) => {
  const [showAddImage, setShowAddImage] = useState<boolean>(false);
  const [pickedImage, setPickedImage] = useState<Image | null>(null);
  const { t } = useTranslation();
  const resource = 'scenarios';

  type CreateType = Parameters<NonNullable<Resource<FieldValues>['create']>>[0];
  type UpdateType = Parameters<NonNullable<Resource<FieldValues>['update']>>[1];
  type DataType = CreateType | UpdateType;

  const { watch, setValue } = useFormContext<DataType>();
  const formdata = watch();

  const handleCloseAddImage = (image?: Image) => {
    if (image) {
      setPickedImage(image);
      setValue('imageId', image.id, { shouldDirty: true });
    }
    setShowAddImage(false);
  };
  const handleRemoveImage = () => {
    setPickedImage(null);
    setValue('imageId', null, { shouldDirty: true });
    if (formdata?.image?.id) {
      setValue('image', null);
    }
  };
  const imageUrl = pickedImage ? pickedImage.url : formdata?.image?.url;
  return (
    <>
      <div className="flex flex-col gap-32 grow mb-32 max-w-[60rem]">
        <EditResourceInput property="name" required label={capitalize(t(`${resource}:properties.name`))} />
        <EditResourceTextarea
          rows={5}
          property="description"
          label={capitalize(t(`${resource}:properties.description`))}
        />
        <EditResourceInput
          property="assistantId"
          required
          label={capitalize(t(`${resource}:properties.assistantId`))}
        />
        <EditResourceInput property="published" label={capitalize(t(`${resource}:properties.published`))} />
      </div>
      <div className="flex flex-col gap-32 grow mb-32">
        <h3 className="text-h4-sm md:text-h4-md xl:text-h4-lg">{capitalize(t(`${resource}:properties.image`))}</h3>
        {imageUrl ?
          <div className="relative w-500 max-w-full">
            <Button
              className="absolute top-8 right-8"
              onClick={() => handleRemoveImage()}
              aria-label={t(`common:add_image`)}
              rounded
              variant="primary"
              color="error"
              iconButton
            >
              <Icon color="error" icon={<X />} />
            </Button>
            <NextImage src={apiURL(imageUrl)} width="500" height="500" alt={''} className="h-auto w-full max-w-full" />
          </div>
        : <Button onClick={() => setShowAddImage(true)}>{capitalize(t(`common:add_image`))}</Button>}
        <AddImageModal open={showAddImage} onClose={handleCloseAddImage} />
      </div>
    </>
  );
};
