import React, { ReactNode, useRef } from 'react';
import { Button, Icon, useThemeQueries } from '@sk-web-gui/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
    <div className="w-full flex items-center justify-center">
      <Button
        className="absolute left-24 z-10"
        size="lg"
        variant="tertiary"
        iconButton
        leftIcon={<Icon icon={<ArrowLeft />} />}
        rounded
        onClick={() => onScroll(-scrollAmount)}
        aria-label={t('scenario:scrollLeft')}
      />

      <div
        className="flex flex-row gap-48 overflow-x-scroll hidden-scrollbar scroll-smooth"
        ref={scrollableRef}
      >
        <div className="lg:min-w-[20rem] min-w-[3rem]"></div>
        {children}
        <div className="lg:min-w-[20rem] min-w-[3rem]"></div>
      </div>

      <Button
        className="absolute right-24 z-10"
        size="lg"
        variant="tertiary"
        iconButton
        leftIcon={<Icon icon={<ArrowRight />} />}
        rounded
        onClick={() => onScroll(scrollAmount)}
        aria-label={t('scenario:scrollRight')}
      />
    </div>
  );
};
