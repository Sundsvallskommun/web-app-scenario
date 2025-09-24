import { EditImage } from '@components/edit-image/edit-image.component';
import resources from '@config/resources';
import { Image } from '@data-contracts/backend/data-contracts';
import { Button, Modal, Tabs } from '@sk-web-gui/react';
import { apiURL } from '@utils/api-url';
import { useCrudHelper } from '@utils/use-crud-helpers';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'underscore.string';

interface AddImageModalProps {
  open: boolean;
  onClose: (image?: Image) => void;
}

export const AddImageModal: React.FC<AddImageModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { handleGetMany } = useCrudHelper('images');
  const [images, setImages] = useState<Image[]>([]);
  const form = useForm<{ image: File }>();
  const { watch, reset } = form;
  const newImage = watch('image');

  const getAndSetImages = () => {
    handleGetMany(() => resources.images.getMany()).then((res) => {
      if (res) {
        setImages(res);
      }
    });
  };
  useEffect(() => {
    getAndSetImages();
  }, []);
  const { create } = resources['images'];
  const { handleCreate } = useCrudHelper('images');

  const handleSaveNewImage = () => {
    if (newImage && create) {
      handleCreate(() => create({ image: newImage })).then((res) => {
        if (res) {
          onClose(res);
        }
      });
      reset();
      getAndSetImages();
    }
  };

  return (
    <Modal show={open} onClose={onClose} label={capitalize(t('common:add_image'))} className="w-[80rem] max-w-[95vw]">
      <Modal.Content>
        <Tabs>
          <Tabs.Item>
            <Tabs.Button>{capitalize(t('common:browse'))}</Tabs.Button>
            <Tabs.Content>
              <div className="grid grid-cols-6 gap-8">
                {images?.map((image) => (
                  <button
                    type="button"
                    key={image.url}
                    className="focus:ring ring-ring rounded-button"
                    onClick={() => onClose(image)}
                  >
                    <figure className="flex flex-col justify-between items-center gap-2">
                      <NextImage src={apiURL(image?.url)} width="100" height="100" alt="" />
                      <caption>{image.name}</caption>
                    </figure>
                  </button>
                ))}
              </div>
            </Tabs.Content>
          </Tabs.Item>
          <Tabs.Item>
            <Tabs.Button>{capitalize(t('common:upload'))}</Tabs.Button>
            <Tabs.Content>
              <FormProvider {...form}>
                <EditImage isNew />
                {!!newImage && (
                  <Button color="vattjom" onClick={() => handleSaveNewImage()}>
                    {t('images:save_and_select')}
                  </Button>
                )}
              </FormProvider>
            </Tabs.Content>
          </Tabs.Item>
        </Tabs>
      </Modal.Content>
    </Modal>
  );
};
