import { ListResources } from '@components/list-resources/list-resources';
import resources from '@config/resources';
import { AutoTableHeader } from '@sk-web-gui/react';
import ListLayout from '@layouts/list-layout/list-layout.component';
import { useResource } from '@utils/use-resource';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { capitalize } from 'underscore.string';

export const Categories: React.FC = () => {
  const { t } = useTranslation();
  const { data, loaded } = useResource('categories');

  const properties = ['id', 'name', 'adGroups', 'createdAt', 'updatedAt'];

  const headers: AutoTableHeader[] = [
    { property: 'id', label: t('categories:properties.id') },
    { property: 'name', label: t('categories:properties.name') },
    {
      property: 'adGroups',
      label: capitalize(t('categories:properties.adGroups.DEFAULT_many')),
      renderColumn: (value) => <span>{Array.isArray(value) && value.length > 0 ? value.join(', ') : '-'}</span>,
      isColumnSortable: false,
    },
    { property: 'createdAt', label: t('categories:properties.createdAt') },
    { property: 'updatedAt', label: t('categories:properties.updatedAt') },
  ];

  return (
    <ListLayout resource="categories" properties={properties}>
      {loaded && <ListResources resource="categories" data={data} headers={headers} properties={properties} />}
    </ListLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common', 'layout', 'crud', ...Object.keys(resources)])),
  },
});

export default Categories;
