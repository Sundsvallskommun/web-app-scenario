import { ListResources } from '@components/list-resources/list-resources';
import resources from '@config/resources';
import { AutoTableHeader } from '@sk-web-gui/react';
import ListLayout from '@layouts/list-layout/list-layout.component';
import { useResource } from '@utils/use-resource';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { capitalize } from 'underscore.string';

export const ExternalUsers: React.FC = () => {
  const { t } = useTranslation();
  const { data, loaded } = useResource('externalUsers');

  const properties = ['id', 'name', 'org', 'categories', 'createdAt', 'updatedAt'];

  const headers: AutoTableHeader[] = [
    { property: 'id', label: t('externalUsers:properties.id') },
    { property: 'name', label: t('externalUsers:properties.name') },
    { property: 'org', label: t('externalUsers:properties.org') },
    {
      property: 'categories',
      label: capitalize(t('externalUsers:properties.categories.DEFAULT_many')),
      renderColumn: (value) => (
        <span>
          {Array.isArray(value) && value.length > 0 ? value.map((category) => category.name).join(', ') : '-'}
        </span>
      ),
      isColumnSortable: false,
    },
    { property: 'createdAt', label: t('externalUsers:properties.createdAt') },
    { property: 'updatedAt', label: t('externalUsers:properties.updatedAt') },
  ];

  return (
    <ListLayout resource="externalUsers" properties={properties}>
      {loaded && <ListResources resource={'externalUsers'} data={data} headers={headers} properties={properties} />}
    </ListLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common', 'layout', 'crud', ...Object.keys(resources)])),
  },
});

export default ExternalUsers;
