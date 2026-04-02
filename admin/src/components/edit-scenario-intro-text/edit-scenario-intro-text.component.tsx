import { EditResourceInput } from '@components/edit-resource/edit-resource-input.component';
import { EditResourceTextarea } from '@components/edit-resource/edit-resource-textarea.component';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'underscore.string';

export const EditScenarioIntroText: React.FC = () => {
  const { t } = useTranslation();
  const resource = 'scenarioIntroTexts';

  return (
    <div className="flex flex-col gap-32 grow mb-32 max-w-[60rem]">
      <EditResourceInput
        data-cy="edit-scenarioIntroTexts-sortOrder"
        property="sortOrder"
        required
        label={capitalize(t(`${resource}:properties.sortOrder`))}
      />
      <EditResourceTextarea
        rows={6}
        data-cy="edit-scenarioIntroTexts-text"
        property="text"
        required
        label={capitalize(t(`${resource}:properties.text`))}
      />
    </div>
  );
};
