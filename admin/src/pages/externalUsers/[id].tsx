import { EditExternalUser } from '@components/edit-external-user/edit-external-user.component';
import { EditorToolbar } from '@components/editor-toolbar/editor-toolbar';
import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { defaultInformationFields } from '@config/defaults';
import resources from '@config/resources';
import {
  CategorySummary,
  CreateExternalUserDto,
  ExternalUser,
  UpdateExternalUserDto,
} from '@data-contracts/backend/data-contracts';
import EditLayout from '@layouts/edit-layout/edit-layout.component';
import { getFormattedFields } from '@utils/formatted-field';
import { useRouteGuard } from '@utils/routeguard.hook';
import { useCrudHelper } from '@utils/use-crud-helpers';
import { useResource } from '@utils/use-resource';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { capitalize } from 'underscore.string';

type ExternalUserFormData = CreateExternalUserDto &
  UpdateExternalUserDto & {
    id?: number;
    categories?: CategorySummary[];
    createdAt?: string;
    updatedAt?: string;
  };

const normalizeExternalUser = (externalUser?: Partial<ExternalUser>): ExternalUserFormData => ({
  ...externalUser,
  name: externalUser?.name ?? '',
  org: externalUser?.org ?? '',
  personNumber: externalUser?.personNumber ?? '',
  categoryIds: externalUser?.categories?.map((category) => category.id) ?? [],
  categories: externalUser?.categories ?? [],
});

export const ExternalUserPage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { id: _id } = useParams();
  const resource = 'externalUsers';

  const { create, update, getOne, defaultValues } = resources[resource];
  const { refresh } = useResource(resource);
  const { handleGetOne, handleCreate, handleUpdate } = useCrudHelper(resource);

  const form = useForm<ExternalUserFormData>({
    defaultValues: normalizeExternalUser(defaultValues),
  });
  const {
    handleSubmit,
    reset,
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
      handleGetOne<ExternalUser>(() => getOne(id)).then((res) => {
        reset(normalizeExternalUser(res));
        setIsNew(false);
        setLoaded(true);
      });
    } else {
      reset(normalizeExternalUser(defaultValues));
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

  const normalizePayload = (data: ExternalUserFormData): CreateExternalUserDto | UpdateExternalUserDto => ({
    name: data.name,
    org: data.org?.trim() ? data.org.trim() : '',
    personNumber: data.personNumber.trim(),
    categoryIds:
      Array.isArray(data.categoryIds) ?
        Array.from(new Set(data.categoryIds.filter((value): value is number => typeof value === 'number'))).sort(
          (left, right) => left - right
        )
      : [],
  });

  const onSubmit = (data: ExternalUserFormData) => {
    const payload = normalizePayload(data);

    switch (isNew) {
      case true:
        if (create) {
          handleCreate(() => create(payload as CreateExternalUserDto)).then((res) => {
            if (res) {
              reset(normalizeExternalUser(res as ExternalUser));
              setIsNew(false);
              refresh();
            }
          });
        }
        break;
      case false:
        if (id && update) {
          handleUpdate(() => update(id, payload)).then((res) => {
            if (res) {
              reset(normalizeExternalUser(res as ExternalUser));
              refresh();
            }
          });
        }
        break;
    }
  };

  return !loaded ?
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
        backLink="/external-users"
      >
        <FormProvider {...form}>
          <form className="flex flex-row gap-32 justify-between grow flex-wrap" onSubmit={handleSubmit(onSubmit)}>
            <EditorToolbar resource={resource} isDirty={isDirty} id={id} />
            <EditExternalUser />
          </form>
        </FormProvider>
      </EditLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common', 'crud', 'layout', ...Object.keys(resources)])),
  },
});

export default ExternalUserPage;
