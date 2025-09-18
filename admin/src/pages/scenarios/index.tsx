import { ListResources } from '@components/list-resources/list-resources';
import resources from '@config/resources';
import ListLayout from '@layouts/list-layout/list-layout.component';
import { useResource } from '@utils/use-resource';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const Scenarios: React.FC = () => {
  const { data, loaded } = useResource('scenarios');

  const properties = ['id', 'name', 'createdAt', 'updatedAt', 'published'];

  return (
    <ListLayout resource="scenarios" properties={properties}>
      {loaded && <ListResources resource={'scenarios'} data={data} properties={properties} />}
    </ListLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout', 'crud', ...Object.keys(resources)])),
  },
});

export default Scenarios;
