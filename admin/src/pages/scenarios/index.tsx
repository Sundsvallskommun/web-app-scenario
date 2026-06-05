import { ListResources } from '@components/list-resources/list-resources';
import resources from '@config/resources';
import { AutoTableHeader, Icon } from '@sk-web-gui/react';
import ListLayout from '@layouts/list-layout/list-layout.component';
import { useResource } from '@utils/use-resource';
import { Check } from 'lucide-react';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { capitalize } from 'underscore.string';

export const Scenarios: React.FC = () => {
  const { t } = useTranslation();
  const { data, loaded } = useResource('scenarios');

  const properties = ['id', 'name', 'category', 'createdAt', 'updatedAt', 'published'];

  const headers: AutoTableHeader[] = [
    { property: 'id', label: t('scenarios:properties.id') },
    { property: 'name', label: t('scenarios:properties.name') },
    {
      property: 'category',
      label: capitalize(t('scenarios:properties.category')),
      renderColumn: (_value, item) => <span>{item?.category?.name ?? '-'}</span>,
      isColumnSortable: false,
    },
    { property: 'createdAt', label: t('scenarios:properties.createdAt') },
    { property: 'updatedAt', label: t('scenarios:properties.updatedAt') },
    {
      property: 'published',
      label: t('scenarios:properties.published'),
      renderColumn: (value) => <span>{value && <Icon.Padded rounded color="success" icon={<Check />} />}</span>,
      isColumnSortable: false,
    },
  ];

  return (
    <ListLayout resource="scenarios" properties={properties}>
      {loaded && <ListResources resource={'scenarios'} data={data} headers={headers} properties={properties} />}
    </ListLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common', 'layout', 'crud', ...Object.keys(resources)])),
  },
});

export default Scenarios;
