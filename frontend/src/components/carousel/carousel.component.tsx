import React, { ReactNode, useRef } from 'react';
import { Button, Icon, useThemeQueries } from '@sk-web-gui/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '@sk-web-gui/next';

interface CarouselProps {
  children: ReactNode;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
}: CarouselProps) => {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const { isMinMd } = useThemeQueries();
  const scrollAmount = isMinMd ? 450 : 300;
  const { t } = useTranslation();

  const onScroll = (offSet: number) => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollLeft += offSet;
    }
  };

  return (
    <div className="w-full flex items-center justify-center relative">
      <div className="z-10 absolute blur-lg -left-72 w-[35rem] -top-24 -bottom-24 bg-gradient-to-r from-primitives-overlay-lighten-6 dark:from-primitives-overlay-darken-8 via-primitives-overlay-light-4 dark:via-primitives-overlay-darken-6 via-75% to-[rgba(255,255,255,0)] dark:to-[rgba(0,0,0,0)]"></div>
      <div className="z-10 absolute blur-lg -right-72 w-[35rem] -top-24 -bottom-24 bg-gradient-to-l from-primitives-overlay-lighten-6 dark:from-primitives-overlay-darken-8 via-primitives-overlay-light-4 dark:via-primitives-overlay-darken-6 via-75% to-[rgba(255,255,255,0)] dark:to-[rgba(0,0,0,0)]"></div>
      <Button
        className="absolute left-24 z-10"
        size="lg"
        variant="primary"
        iconButton
        leftIcon={<Icon icon={<ArrowLeft />} />}
        rounded
        onClick={() => onScroll(-scrollAmount)}
        aria-label={t('scenario:scrollLeft')}
      />

      <Card.Wrapper
        className="flex flex-row gap-48 overflow-x-scroll hidden-scrollbar scroll-smooth py-8"
        ref={scrollableRef}
      >
        <div className="lg:min-w-[20rem] min-w-[3rem]"></div>
        {children}
        <div className="lg:min-w-[20rem] min-w-[3rem]"></div>
      </Card.Wrapper>

      <Button
        className="absolute right-24 z-10"
        size="lg"
        variant="primary"
        iconButton
        leftIcon={<Icon icon={<ArrowRight />} />}
        rounded
        onClick={() => onScroll(scrollAmount)}
        aria-label={t('scenario:scrollRight')}
      />
    </div>
  );
};
