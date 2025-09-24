import { EditImage } from '@components/edit-image/edit-image.component';
import { EditorToolbar } from '@components/editor-toolbar/editor-toolbar';
import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { defaultInformationFields } from '@config/defaults';
import resources from '@config/resources';
import { Image, Scenario, UpdateImageDto } from '@data-contracts/backend/data-contracts';
import EditLayout from '@layouts/edit-layout/edit-layout.component';
import { List } from '@sk-web-gui/react';
import { getFormattedFields } from '@utils/formatted-field';
import { useRouteGuard } from '@utils/routeguard.hook';
import { useCrudHelper } from '@utils/use-crud-helpers';
import { useResource } from '@utils/use-resource';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { capitalize } from 'underscore.string';

export const ImagePage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { resource: _resource, id: _id } = useParams();
  const resource = 'images';

  const { create, update, getOne, defaultValues } = resources[resource];
  const { refresh } = useResource(resource);

  const { handleGetOne, handleCreate, handleUpdate } = useCrudHelper(resource);

  type CreateType = { image: File };
  type UpdateType = UpdateImageDto;
  type DataType = CreateType | UpdateType;

  const form = useForm<DataType & Image>({
    defaultValues: defaultValues,
  });
  const {
    handleSubmit,
    reset,
    watch,
    formState: { isDirty },
  } = form;

  const id = _id === 'new' ? undefined : parseInt(_id as string, 10);

  const [loaded, setLoaded] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(!id);
  const [navigate, setNavigate] = useState<boolean>(false);

  const formdata = getFormattedFields(watch());

  useRouteGuard(isDirty);

  useEffect(() => {
    setNavigate(false);
    if (id) {
      setIsNew(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      handleGetOne(() => getOne(id)).then((res) => {
        reset(res);
        setIsNew(false);
        setLoaded(true);
      });
    } else {
      reset(defaultValues);
      setIsNew(true);
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (navigate) {
      router.push(`/${resource}/${formdata?.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  useEffect(() => {
    if (formdata.id && isNew && !isDirty) {
      setNavigate(true);
    }
  }, [formdata?.id, isNew, isDirty]);

  const onSubmit = (data: DataType) => {
    switch (isNew) {
      case true:
        if (create) {
          handleCreate(() => create(data as CreateType)).then((res) => {
            if (res) {
              reset(res);
              refresh();
            }
          });
        }

        break;
      case false:
        if (id && update) {
          handleUpdate(() => update?.(id, data as UpdateType)).then((res) => {
            reset(res);
            refresh();
          });
        }
        break;
    }
  };

  return !loaded || !resource ?
      <LoaderFullScreen />
    : <EditLayout
        headerInfo={
          !isNew ?
            <ul className="text-small flex gap-16">
              {defaultInformationFields.map((field, index) => (
                <li key={index + field}>
                  <strong>{capitalize(t(`common:${field}`))}: </strong>
                  {formdata?.[field]}
                </li>
              ))}
            </ul>
          : undefined
        }
        title={
          isNew ?
            capitalize(t('common:create_new', { resource: t(`${resource}:name`, { count: 1 }) }))
          : capitalize(t('common:edit', { resource: t(`${resource}:name_one`) }))
        }
        backLink={`/${resource}`}
      >
        <div className="flex flew-row gap-32 flex-wrap">
          <div className="flex flex-col gap-32 grow mb-32">
            <FormProvider {...form}>
              <form className="flex flex-row gap-32 justify-between grow flex-wrap" onSubmit={handleSubmit(onSubmit)}>
                <EditorToolbar resource={resource} isDirty={isDirty} id={id} />
                <EditImage isNew={isNew} />
              </form>
            </FormProvider>
          </div>
          {formdata?.scenarios?.length > 0 && (
            <div className="flex flex-col gap-32 grow mb-32">
              <h3 className="text-h4-sm md:text-h4-md xl:text-h4-lg" id="resourcelist">
                {t('images:used_by')}
              </h3>
              <List aria-labelledby="resourcelist">
                {formdata.scenarios.map((scenario: Scenario) => (
                  <List.Item key={`image-scenario-${scenario.id}`}>
                    <List.Text>
                      <Link href={`/scenarios/${scenario.id}`}>
                        {scenario.id} - {scenario.name}
                      </Link>
                    </List.Text>
                  </List.Item>
                ))}
              </List>
            </div>
          )}
        </div>
      </EditLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'crud', 'layout', ...Object.keys(resources)])),
  },
});

export default ImagePage;
