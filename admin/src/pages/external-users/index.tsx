import { ListResources } from '@components/list-resources/list-resources';
import resources from '@config/resources';
import ListLayout from '@layouts/list-layout/list-layout.component';
import { useResource } from '@utils/use-resource';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

export const ExternalUsers: React.FC = () => {
  const { data, loaded } = useResource('externalUsers');

  const properties = ['id', 'name', 'org', 'createdAt', 'updatedAt'];

  return (
    <ListLayout resource="externalUsers" properties={properties}>
      {loaded && <ListResources resource={'externalUsers'} data={data} properties={properties} />}
    </ListLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common', 'layout', 'crud', ...Object.keys(resources)])),
  },
});

export default ExternalUsers;
