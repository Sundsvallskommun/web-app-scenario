'use client';

import { Carousel } from '@components/carousel/carousel.component';
import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { PickScenarioModal } from '@components/pick-scenario-modal/pick-scenario-modal.component';
import { SettingsMenu } from '@components/settings-menu/settings-menu.component';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { Card } from '@sk-web-gui/next';
import { Button, cx, Icon, useThemeQueries } from '@sk-web-gui/react';
import { useCategoryStore } from '@services/category-service/category.service';
import { useScenarios } from '@services/scenario-service/use-scenario.hook';
import { apiURL } from '@utils/api-url';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

export default function CategoryPage() {
  const [opacity, setOpacity] = useState<number>(0);
  const [headerOpacity, setHeaderOpacity] = useState<number>(1);
  const [showBackground, setShowBackground] = useState<boolean>(true);
  const transitionDuration = 1000;
  const { t } = useTranslation();
  const params = useParams<{ category: string }>();
  const categoryId = Number(params.category);
  const { data: scenarios, loaded } = useScenarios(categoryId);
  const categories = useCategoryStore((state) => state.categories);
  const { isMaxMediumDevice, isMaxLargeDevice } = useThemeQueries();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scenarioId, setScenarioId] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {
    setShowBackground(true);
    const timeout = globalThis.setTimeout(() => {
      setOpacity(1);
    }, transitionDuration);

    return () => globalThis.clearTimeout(timeout);
  }, []);

  const category = useMemo(
    () => categories.find((entry) => entry.id === categoryId),
    [categories, categoryId]
  );

  const handleScenarioPick = (selectedScenarioId: number) => {
    if (selectedScenarioId) {
      setScenarioId(selectedScenarioId);
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

  const imageUrl =
    category?.image?.url ? apiURL(category.image.url) : undefined;
  return (
    <DefaultLayout
      transitionDuration={transitionDuration}
      showBackground={showBackground}
      backgroundSrc={imageUrl}
      fadeIn={false}
    >
      {categories.length > 1 && (
        <Button
          rounded
          size="sm"
          iconButton
          className="absolute m-24 top-0 left-12"
          onClick={() => router.push('/start')}
        >
          <Icon icon={<X />} />
        </Button>
      )}
      <SettingsMenu />
      <div className="flex flex-col w-full gap-24 text-center justify-center items-center ">
        <h1
          className="text-h-1-sm md:text-display-1-sm lg:text-display-1-md xl:text-display-1-lg m-0 transition-opacity"
          style={{
            opacity: headerOpacity,
            transitionDuration: `${transitionDuration}ms`,
          }}
        >
          {category?.name}
        </h1>

        {!loaded ?
          <LoaderFullScreen />
        : scenarios?.length ?
          <div
            className="transition-opacity"
            style={{ opacity, transitionDuration: `${transitionDuration}ms` }}
          >
            <Carousel>
              {scenarios.map((scenario) => (
                <Card.Wrapper key={scenario.id} className="shrink-0">
                  <Card
                    onClick={() => handleScenarioPick(scenario.id)}
                    onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
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
                          apiURL(scenario.image.url)
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
              ))}
            </Carousel>
          </div>
        : <p className="m-0 text-large">
            {t('scenario:categoryScenariosEmpty')}
          </p>
        }
      </div>

      <PickScenarioModal
        categoryId={categoryId}
        scenarioId={scenarioId}
        isOpen={isOpen}
        handleClose={handleClose}
        setOpacity={(opacity) => {
          setOpacity(opacity);
          setHeaderOpacity(opacity);
        }}
        setShowBackground={setShowBackground}
      />
    </DefaultLayout>
  );
}
