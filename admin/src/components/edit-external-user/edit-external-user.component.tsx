import resources from '@config/resources';
import { Category } from '@data-contracts/backend/data-contracts';
import { Button, Checkbox, FormControl, FormLabel } from '@sk-web-gui/react';
import { useCrudHelper } from '@utils/use-crud-helpers';
import { useEffect, useMemo, useState } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'underscore.string';
import { EditResourceInput } from '../edit-resource/edit-resource-input.component';

export const EditExternalUser: React.FC = () => {
  const { t } = useTranslation();
  const { handleGetMany } = useCrudHelper('categories');
  const [categories, setCategories] = useState<Category[]>([]);
  const resource = 'externalUsers';

  const { watch, setValue } = useFormContext<FieldValues>();
  const formdata = watch();
  const selectedCategoryIds = useMemo<number[]>(
    () =>
      Array.isArray(formdata?.categoryIds) ? formdata.categoryIds.filter((value) => typeof value === 'number') : [],
    [formdata?.categoryIds]
  );

  useEffect(() => {
    handleGetMany(() => resources.categories.getMany()).then((res) => {
      if (res) {
        setCategories(res);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleCategory = (categoryId: number, checked: boolean) => {
    const nextCategoryIds =
      checked ?
        [...selectedCategoryIds, categoryId]
      : selectedCategoryIds.filter((currentId) => currentId !== categoryId);

    setValue(
      'categoryIds',
      Array.from(new Set(nextCategoryIds)).sort((left, right) => left - right),
      { shouldDirty: true }
    );
  };

  const clearCategories = () => {
    setValue('categoryIds', [], { shouldDirty: true });
  };

  return (
    <div className="flex flex-col gap-32 grow mb-32 max-w-[60rem]">
      <EditResourceInput property="name" required label={capitalize(t(`${resource}:properties.name`))} />
      <EditResourceInput property="org" label={capitalize(t(`${resource}:properties.org`))} />
      <EditResourceInput
        property="personNumber"
        required
        label={capitalize(t(`${resource}:properties.personNumber`))}
      />

      <FormControl className="w-full">
        <div className="flex items-center justify-between gap-12">
          <FormLabel>{capitalize(t(`${resource}:properties.categories.DEFAULT_many`))}</FormLabel>
          <Button
            size="sm"
            variant="tertiary"
            onClick={() => clearCategories()}
            disabled={selectedCategoryIds.length === 0}
            data-cy="edit-categoryIds-clear"
          >
            {capitalize(t(`${resource}:clear_categories`))}
          </Button>
        </div>

        {categories.length > 0 ?
          <div className="flex flex-col gap-12" data-cy="edit-categoryIds-list">
            {categories.map((category) => (
              <Checkbox
                key={category.id}
                checked={selectedCategoryIds.includes(category.id)}
                onChange={(event) => toggleCategory(category.id, event.target.checked)}
                data-cy={`edit-categoryIds-${category.id}`}
              >
                {category.name}
              </Checkbox>
            ))}
          </div>
        : <p>{capitalize(t('common:no_resources', { resources: t('categories:name_many') }))}</p>}

        <p className="text-small text-dark-secondary">{capitalize(t(`${resource}:category_access_description`))}</p>
      </FormControl>
    </div>
  );
};
