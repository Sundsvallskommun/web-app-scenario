'use client';

import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { SettingsMenu } from '@components/settings-menu/settings-menu.component';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { useCategoryStore } from '@services/category-service/category.service';
import { cx } from '@sk-web-gui/react';
import { apiURL } from '@utils/api-url';
import { useLocalStorage } from '@utils/use-localstorage.hook';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';

interface ExpandingCategory {
  id: number;
  name: string;
  imageUrl: string;
  href: string;
  top: number;
  height: number;
  expanded: boolean;
}

export default function Start() {
  const { t } = useTranslation();
  const router = useRouter();
  const transitionDuration = 500;
  const [hoveredCategoryId, setHoveredCategoryId] = useState<number | null>(
    null
  );
  const [expandingCategory, setExpandingCategory] =
    useState<ExpandingCategory | null>(null);
  const [categories, loaded, loading, getCategories] = useCategoryStore(
    useShallow((state) => [
      state.categories,
      state.loaded,
      state.loading,
      state.getCategories,
    ])
  );

  useEffect(() => {
    if (!loaded && !loading) {
      getCategories();
    }
  }, [getCategories, loaded, loading]);

  useEffect(() => {
    if (loaded && categories.length === 1) {
      router.replace(`/${categories[0].id}`);
    }
  }, [categories, loaded, router]);

  const categoryCards = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        imageUrl:
          category.image?.url ?
            apiURL(category.image.url)
          : apiURL('/files/default.jpg'),
        href: `/${category.id}`,
      })),
    [categories]
  );

  const handleCategoryClick = (
    event: MouseEvent<HTMLAnchorElement>,
    category: { id: number; name: string; imageUrl: string; href: string }
  ) => {
    event.preventDefault();

    const bounds = event.currentTarget.getBoundingClientRect();

    setExpandingCategory({
      id: category.id,
      name: category.name,
      imageUrl: category.imageUrl,
      href: category.href,
      top: bounds.top,
      height: bounds.height,
      expanded: false,
    });

    globalThis.requestAnimationFrame(() => {
      setExpandingCategory((current) =>
        current ? { ...current, expanded: true } : current
      );
    });

    globalThis.setTimeout(() => {
      router.push(category.href);
    }, transitionDuration);
  };

  if (!loaded) {
    return (
      <DefaultLayout transitionDuration={transitionDuration}>
        <LoaderFullScreen />
      </DefaultLayout>
    );
  }

  const getHeightClass = (catLength: number, status?: 'dimmed' | 'active') => {
    switch (catLength) {
      case 2:
        switch (status) {
          case 'dimmed':
            return '33dvh';
          case 'active':
            return '67dvh';
          default:
            return '50dvh';
        }
      case 3:
        switch (status) {
          case 'dimmed':
            return '25dvh';
          case 'active':
            return '50dvh';
          default:
            return '33dvh';
        }
      default:
        switch (status) {
          case 'dimmed':
            return '22dvh';
          case 'active':
            return '34dvh';
          default:
            return '25dvh';
        }
    }
  };

  return (
    <DefaultLayout transitionDuration={transitionDuration}>
      <SettingsMenu />
      <main className="flex w-full grow shrink min-h-0 overflow-hidden">
        {categories.length === 0 ?
          <div className="flex grow items-center justify-center px-24 text-center">
            <div className="flex max-w-[48rem] flex-col gap-16">
              <h1 className="m-0 text-h2-md md:text-h1-lg">
                {t('scenario:chooseCategory')}
              </h1>
              <p className="m-0 text-large">{t('scenario:categoryEmpty')}</p>
            </div>
          </div>
        : <div className="flex min-h-0 grow flex-col overflow-y-auto px-0">
            <h1 className="sr-only">{t('scenario:categories')}</h1>
            {categoryCards.map((category) => {
              const dimmed =
                hoveredCategoryId !== null && hoveredCategoryId !== category.id;
              const active = hoveredCategoryId === category.id;
              const catLength = categories.length;

              return (
                <div
                  key={category.id}
                  className={cx(
                    'flex shrink-0 transition-[height] duration-500 ease-out ',
                    {
                      [`h-[max(${getHeightClass(catLength, 'dimmed')},180px)]`]:
                        dimmed,
                      [`h-[max(${getHeightClass(catLength, 'active')},250px)]`]:
                        active,
                      [`h-[max(${getHeightClass(catLength)},200px)]`]:
                        !dimmed && !active,
                    }
                  )}
                >
                  <Link
                    href={category.href}
                    className={cx(
                      'group rounded-0 relative flex w-full items-center justify-center overflow-hidden text-center outline-none transition-[transform,filter] duration-500 ease-out focus-visible:z-20 focus-visible:ring-4 focus-visible:ring-white/90 focus-visible:ring-offset-0',
                      {
                        ['brightness-75']: dimmed,
                        ['z-10']: active,
                      }
                    )}
                    onMouseEnter={() => setHoveredCategoryId(category.id)}
                    onMouseLeave={() => setHoveredCategoryId(null)}
                    onFocus={() => setHoveredCategoryId(category.id)}
                    onBlur={() => setHoveredCategoryId(null)}
                    data-cy={`category-card-${category.id}`}
                    onClick={(event) => handleCategoryClick(event, category)}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out"
                      style={{ backgroundImage: `url(${category.imageUrl})` }}
                    />
                    <div
                      className={cx(
                        'absolute inset-0  transition-colors duration-500 group-hover:bg-[rgba(0,0,0,0.22)]'
                      )}
                    />
                    <span className="relative z-10 text-center font-header text-h1-sm sm:text-display-3-sm md:text-display-3-md lg:text-display-2-lg xl:text-display-1-lg m-0 text-white">
                      {category.name}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        }
      </main>

      {expandingCategory ?
        <div
          aria-hidden="true"
          className="flex justify-center items-center pointer-events-none fixed inset-x-0 z-50 overflow-hidden transition-[top,height] duration-500 ease-out"
          style={{
            top: expandingCategory.expanded ? 0 : `${expandingCategory.top}px`,
            height:
              expandingCategory.expanded ? '100dvh' : (
                `${expandingCategory.height}px`
              ),
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${expandingCategory.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.22)]" />
          <div className="flex flex-col">
            <div className="relative z-10 flex h-full items-center justify-center text-center font-header text-h1-sm sm:text-display-3-sm md:text-display-3-md lg:text-display-2-lg xl:text-display-1-lg m-0 text-white">
              {expandingCategory.name}
            </div>
            <div
              className={cx(
                'transition-[height] duration-500 ease-out',
                expandingCategory.expanded ?
                  'h-[285px] md:h-[372px] lg:h-[456px]'
                : 'h-0'
              )}
            ></div>
          </div>
        </div>
      : null}
    </DefaultLayout>
  );
}
