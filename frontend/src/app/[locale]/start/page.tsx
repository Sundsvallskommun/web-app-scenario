'use client';

import { useTranslation } from 'react-i18next';
import { Card } from '@sk-web-gui/react';
import React, { useEffect, useState } from 'react';
import { SettingsMenu } from '@components/settings-menu/settings-menu.component';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { useScenarios } from '@services/scenario-service/use-scenario.hook';
import { Carousel } from '@components/carousel/carousel.component';
import { PickScenarioModal } from '@components/pick-scenario-modal/pick-scenario-modal.component';
import { apiURL } from '@utils/api-url';
import Image from 'next/image';

export default function Start() {
  const [opacity, setOpacity] = useState<number>(0);
  const [showBackground, setShowBackground] = useState<boolean>(false);
  const transitionDuration = 1000;
  const { t } = useTranslation();
  const { data: scenarios } = useScenarios();

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
        <h1 className="text-display-1-sm md:text-display-1-md xl:text-display-1-lg m-0">
          {t('common:app_name')}
        </h1>

        {scenarios?.length ?
          <Carousel>
            {scenarios?.map((scenario) => {
              return (
                <Card
                  key={scenario.id}
                  onClick={() => handleScenarioPick(scenario.id)}
                  className="cursor-pointer"
                  data-cy={`card-${scenario.id}`}
                >
                  <Image
                    alt=""
                    src={
                      scenario?.image?.url ?
                        apiURL(scenario?.image?.url)
                      : '/images/background.png'
                    }
                    width={400}
                    height={300}
                    className="sk-card-image md:max-h-full md:max-w-[40rem] max-h-[15rem] max-w-[25rem]"
                  />
                  <Card.Body>
                    <Card.Header>
                      <h2>{scenario.name}</h2>
                    </Card.Header>
                  </Card.Body>
                </Card>
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
