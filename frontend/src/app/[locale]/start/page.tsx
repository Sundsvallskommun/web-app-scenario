'use client';

import { useTranslation } from 'react-i18next';
import { Card } from '@sk-web-gui/next';
import React, { useEffect, useState } from 'react';
import { SettingsMenu } from '@components/settings-menu/settings-menu.component';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { useScenarios } from '@services/scenario-service/use-scenario.hook';
import { Carousel } from '@components/carousel/carousel.component';
import { PickScenarioModal } from '@components/pick-scenario-modal/pick-scenario-modal.component';
import { apiURL } from '@utils/api-url';
import { cx, useThemeQueries } from '@sk-web-gui/react';

export default function Start() {
  const [opacity, setOpacity] = useState<number>(0);
  const [showBackground, setShowBackground] = useState<boolean>(false);
  const transitionDuration = 1000;
  const { t } = useTranslation();
  const { data: scenarios } = useScenarios();

  const { isMaxMediumDevice, isMaxLargeDevice } = useThemeQueries();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scenarioId, setScenarioId] = useState<number>(0);

  useEffect(() => {
    setShowBackground(true);
    setTimeout(() => {
      setOpacity(1);
    }, transitionDuration);
  }, []);

  const handleScenarioPick = (scenarioId: number) => {
    if (scenarioId) {
      setScenarioId(scenarioId);
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const getImageSize = (): { width: number; height: number } => {
    if (isMaxMediumDevice) {
      return { width: 200, height: 150 };
    }
    if (isMaxLargeDevice) {
      return { width: 300, height: 225 };
    }
    return { width: 400, height: 300 };
  };

  return (
    <DefaultLayout
      transitionDuration={transitionDuration}
      showBackground={showBackground}
    >
      <SettingsMenu />
      <div
        className="flex flex-col w-full gap-24 text-center justify-center items-center transition-opacity"
        style={{ opacity, transitionDuration: `${transitionDuration}ms` }}
      >
        <h1 className="text-h-1-sm md:text-display-1-sm lg:text-display-1-md xl:text-display-1-lg m-0">
          {t('common:app_name')}
        </h1>

        {scenarios?.length ?
          <Carousel>
            {scenarios?.map((scenario) => {
              return (
                <Card.Wrapper key={scenario.id} className="shrink-0">
                  <Card
                    onClick={() => handleScenarioPick(scenario.id)}
                    onKeyDown={(event: KeyboardEvent) => {
                      if (event.key === 'Enter') {
                        handleScenarioPick(scenario.id);
                      }
                    }}
                    className={cx(
                      'cursor-pointer focus-visible:ring',
                      'w-[20rem] lg:w-[30rem] xl:w-[40rem]'
                    )}
                    data-cy={`card-${scenario.id}`}
                    role="button"
                    tabIndex={0}
                  >
                    <Card.Image
                      {...getImageSize()}
                      src={
                        scenario?.image?.url ?
                          apiURL(scenario?.image?.url)
                        : apiURL('/files/default.jpg')
                      }
                      alt=""
                    />
                    <Card.Body>
                      <Card.Header className="text-left">
                        <h2 className="!text-h5-sm sm:!text-h4-sm lg:!text-h3-sm xl:!text-h3-md">
                          {scenario.name}
                        </h2>
                      </Card.Header>
                    </Card.Body>
                  </Card>
                </Card.Wrapper>
              );
            })}
          </Carousel>
        : null}
      </div>

      <PickScenarioModal
        scenarioId={scenarioId}
        isOpen={isOpen}
        handleClose={handleClose}
        setOpacity={setOpacity}
        setShowBackground={setShowBackground}
      />
    </DefaultLayout>
  );
}
