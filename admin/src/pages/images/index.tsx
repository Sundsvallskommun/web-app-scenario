import { ListResources } from '@components/list-resources/list-resources';
import resources from '@config/resources';
import ListLayout from '@layouts/list-layout/list-layout.component';
import { AutoTableHeader } from '@sk-web-gui/react';
import { apiURL } from '@utils/api-url';
import { useResource } from '@utils/use-resource';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { capitalize } from 'underscore.string';

export const Images: React.FC = () => {
  const { t } = useTranslation();

  const { data, loaded } = useResource('images');

  const properties = ['id', 'name', 'image', 'createdAt', 'updatedAt'];

  const headers: AutoTableHeader[] = properties.reduce((headers: AutoTableHeader[], property) => {
    let header: AutoTableHeader = { property, label: t(`images:properties.${property}`) };
    if (property === 'image') {
      header = {
        property,
        label: capitalize(t(`images:name_one`)),
        renderColumn: (value, item) => (
          <Image src={apiURL(item?.url)} width="75" height="75" className="h-auto" alt="" />
        ),
        isColumnSortable: false,
      };
    }
    return [...headers, header];
  }, []);

  return (
    <ListLayout resource="images" properties={properties}>
      {loaded && <ListResources resource="images" data={data} headers={headers} />}
    </ListLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout', 'crud', ...Object.keys(resources)])),
  },
});

export default Images;
