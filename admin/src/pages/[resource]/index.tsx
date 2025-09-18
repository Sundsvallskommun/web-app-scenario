import { ListResources } from '@components/list-resources/list-resources';
import resources from '@config/resources';
import { ResourceName } from '@interfaces/resource-name';
import ListLayout from '@layouts/list-layout/list-layout.component';
import { stringToResourceName } from '@utils/stringToResourceName';
import { useResource } from '@utils/use-resource';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useParams } from 'next/navigation';

export const Resources: React.FC = () => {
  const { resource: _resource } = useParams();
  const resource = stringToResourceName(
    typeof _resource === 'object' ? _resource[0] : (_resource ?? '')
  ) as ResourceName;

  const { data, loaded } = useResource(resource);

  const getProperties = () => {
    return data?.[0] ?
        Object.keys(data[0]).filter((key) => {
          const type = typeof data[0][key];
          return type === 'string' || type === 'number' || type === 'boolean';
        })
      : undefined;
  };

  return (
    <ListLayout resource={resource} properties={getProperties()}>
      {loaded && <ListResources resource={resource} data={data} />}
    </ListLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common', 'layout', 'crud', ...Object.keys(resources)])),
  },
});

export default Resources;
