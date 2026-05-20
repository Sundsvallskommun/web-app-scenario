import { EditCategory } from '@components/edit-category/edit-category.component';
import { EditorToolbar } from '@components/editor-toolbar/editor-toolbar';
import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { defaultInformationFields } from '@config/defaults';
import resources from '@config/resources';
import { CreateCategoryDto, UpdateCategoryDto } from '@data-contracts/backend/data-contracts';
import EditLayout from '@layouts/edit-layout/edit-layout.component';
import { getFormattedFields } from '@utils/formatted-field';
import { useRouteGuard } from '@utils/routeguard.hook';
import { useCrudHelper } from '@utils/use-crud-helpers';
import { useResource } from '@utils/use-resource';
import { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSnackbar } from '@sk-web-gui/react';
import { capitalize } from 'underscore.string';

export const CategoryPage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const message = useSnackbar();

  const { id: _id } = useParams();
  const resource = 'categories';

  const { create, update, getOne, defaultValues } = resources[resource];
  const { refresh } = useResource(resource);

  const { handleGetOne } = useCrudHelper(resource);

  type CreateType = CreateCategoryDto;
  type UpdateType = UpdateCategoryDto;
  type DataType = CreateType | UpdateType;

  const form = useForm<DataType>({
    defaultValues: defaultValues,
  });
  const {
    clearErrors,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { isDirty },
  } = form;

  const id = _id === 'new' ? undefined : Number.parseInt(_id as string, 10);

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

  const isDuplicateNameError = (error: unknown) => {
    const message = (error as AxiosError<{ message?: string }>)?.response?.data?.message ?? '';
    return typeof message === 'string' && message.includes('name');
  };

  const normalizePayload = (data: DataType): DataType => ({
    ...data,
    adGroups: (data.adGroups ?? []).map((group) => group.trim()).filter((group) => group.length > 0),
  });

  const onSubmit = async (data: DataType) => {
    clearErrors('name');
    const payload = normalizePayload(data);

    try {
      switch (isNew) {
        case true:
          if (create) {
            const result = await create(payload as CreateType);
            if (result) {
              message({
                message: capitalize(t('crud:create.success', { resource: t(`${resource}:name_one`) })),
                status: 'success',
              });
              reset(result.data.data);
              setIsNew(false);
              refresh();
            }
          }
          break;
        case false:
          if (id && update) {
            const result = await update(id, payload);
            message({
              message: capitalize(t('crud:update.success', { resource: t(`${resource}:name_one`) })),
              status: 'success',
            });
            reset(result.data.data);
            refresh();
          }
          break;
      }
    } catch (error) {
      if (isDuplicateNameError(error)) {
        setError('name', {
          type: 'server',
          message: t(`${resource}:validation.nameUnique`),
        });
        return;
      }

      message({
        message: capitalize(
          t(isNew ? 'crud:create.error' : 'crud:update.error', { resource: t(`${resource}:name_one`) })
        ),
        status: 'error',
      });
    }
  };

  return !loaded || !resource ?
      <LoaderFullScreen />
    : <EditLayout
        headerInfo={
          isNew ? undefined : (
            <ul className="text-small flex gap-16">
              {defaultInformationFields.map((field, index) => (
                <li key={index + field}>
                  <strong>{capitalize(t(`common:${field}`))}: </strong>
                  {formdata?.[field]}
                </li>
              ))}
            </ul>
          )
        }
        title={
          isNew ?
            capitalize(t('common:create_new', { resource: t(`${resource}:name`, { count: 1 }) }))
          : capitalize(t('common:edit', { resource: t(`${resource}:name_one`) }))
        }
        backLink={`/${resource}`}
      >
        <FormProvider {...form}>
          <form className="flex flex-row gap-32 justify-between grow flex-wrap" onSubmit={handleSubmit(onSubmit)}>
            <EditorToolbar resource={resource} isDirty={isDirty} id={id} />
            <EditCategory />
          </form>
        </FormProvider>
      </EditLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common', 'crud', 'layout', ...Object.keys(resources)])),
  },
});

export default CategoryPage;
