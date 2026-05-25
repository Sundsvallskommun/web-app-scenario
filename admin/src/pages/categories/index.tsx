import { ListResources } from '@components/list-resources/list-resources';
import resources from '@config/resources';
import ListLayout from '@layouts/list-layout/list-layout.component';
import { useResource } from '@utils/use-resource';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const Categories: React.FC = () => {
  const { data, loaded } = useResource('categories');

  const properties = ['id', 'name', 'createdAt', 'updatedAt'];

  return (
    <ListLayout resource="categories" properties={properties}>
      {loaded && <ListResources resource="categories" data={data} properties={properties} />}
    </ListLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common', 'layout', 'crud', ...Object.keys(resources)])),
  },
});

export default Categories;
