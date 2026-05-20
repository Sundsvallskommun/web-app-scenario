import { BackendImage } from '@components/backend-image/backend-image.component';
import { EditResourceInput } from '@components/edit-resource/edit-resource-input.component';
import { AddImageModal } from '@components/edit-scenario/components/add-image-modal.component';
import { Image } from '@data-contracts/backend/data-contracts';
import { Resource } from '@interfaces/resource';
import { Button, Chip, FormControl, FormLabel, Icon, Input } from '@sk-web-gui/react';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'underscore.string';

export const EditCategory: React.FC = () => {
  const [showAddImage, setShowAddImage] = useState<boolean>(false);
  const [pickedImage, setPickedImage] = useState<Image | null>(null);
  const [newAdGroup, setNewAdGroup] = useState<string>('');
  const { t } = useTranslation();
  const resource = 'categories';

  type CreateType = Parameters<NonNullable<Resource<FieldValues>['create']>>[0];
  type UpdateType = Parameters<NonNullable<Resource<FieldValues>['update']>>[1];
  type DataType = CreateType | UpdateType;

  const { watch, setValue } = useFormContext<DataType>();
  const formdata = watch();
  const adGroups = Array.isArray(formdata?.adGroups) ? formdata.adGroups : [];

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

  const addAdGroup = () => {
    const trimmedAdGroup = newAdGroup.trim();

    if (!trimmedAdGroup) {
      return;
    }

    setValue('adGroups', [...adGroups, trimmedAdGroup], { shouldDirty: true });
    setNewAdGroup('');
  };

  const removeAdGroup = (index: number) => {
    setValue(
      'adGroups',
      adGroups.filter((_, currentIndex) => currentIndex !== index),
      { shouldDirty: true }
    );
  };

  const imageUrl = pickedImage ? pickedImage.url : formdata?.image?.url;

  return (
    <>
      <div className="flex flex-col gap-32 grow mb-32 max-w-[60rem]">
        <EditResourceInput property="name" required label={capitalize(t(`${resource}:properties.name`))} />

        <div className="flex flex-col gap-16">
          <FormControl className="w-full">
            <FormLabel>{capitalize(t(`${resource}:properties.adGroups.DEFAULT_many`))}</FormLabel>
            <div className="flex items-end gap-12">
              <Input
                value={newAdGroup}
                onChange={(event) => setNewAdGroup(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    addAdGroup();
                  }
                }}
                data-cy="edit-category-adGroup-input"
              />
              <Button
                color="success"
                leftIcon={<Plus />}
                data-cy="edit-category-adGroup-add"
                onClick={() => addAdGroup()}
                disabled={!newAdGroup.trim()}
              >
                {capitalize(t('common:add'))}
              </Button>
            </div>
          </FormControl>
          {adGroups.length === 0 && (
            <p>
              {capitalize(t('common:no_resources', { resources: t(`${resource}:properties.adGroups.DEFAULT_many`) }))}
            </p>
          )}
          {adGroups.length > 0 && (
            <div className="flex flex-wrap gap-8" data-cy="edit-category-adGroup-list">
              {adGroups.map((adGroup, index) => (
                <Chip
                  key={`category-ad-group-${index}-${adGroup}`}
                  data-cy={`edit-category-adGroup-chip-${index}`}
                  aria-label={capitalize(
                    t('common:remove_resource', { resource: t(`${resource}:properties.adGroups.DEFAULT`) })
                  )}
                  onClick={() => removeAdGroup(index)}
                >
                  {adGroup}
                </Chip>
              ))}
            </div>
          )}
        </div>
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
              data-cy="resource-image-remove-button"
            >
              <Icon color="error" icon={<X />} />
            </Button>
            <BackendImage
              data-cy="resource-image"
              src={imageUrl}
              width={500}
              height={500}
              alt=""
              className="h-auto w-full max-w-full"
            />
          </div>
        : <Button data-cy="resource-image-add-button" onClick={() => setShowAddImage(true)}>
            {capitalize(t(`common:add_image`))}
          </Button>
        }
        <AddImageModal open={showAddImage} onClose={handleCloseAddImage} />
      </div>
    </>
  );
};
