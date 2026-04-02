import { ListResources } from '@components/list-resources/list-resources';
import resources from '@config/resources';
import ListLayout from '@layouts/list-layout/list-layout.component';
import { useResource } from '@utils/use-resource';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const ScenarioIntroTexts: React.FC = () => {
  const { data, loaded } = useResource('scenarioIntroTexts');

  const properties = ['id', 'sortOrder', 'text', 'updatedAt'];

  return (
    <ListLayout resource="scenarioIntroTexts" properties={properties}>
      {loaded && <ListResources resource={'scenarioIntroTexts'} data={data} properties={properties} />}
    </ListLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common', 'layout', 'crud', ...Object.keys(resources)])),
  },
});

export default ScenarioIntroTexts;
