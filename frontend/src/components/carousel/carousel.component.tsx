import React, { ReactNode, useRef } from 'react';
import { Button, Icon, useThemeQueries } from '@sk-web-gui/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CarouselProps {
  children: ReactNode;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
}: CarouselProps) => {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const { isMinMd } = useThemeQueries();
  const scrollAmount = isMinMd ? 450 : 300;

  const onScroll = (offSet: number) => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollLeft += offSet;
    }
  };

  return (
    <div className="w-full flex items-center">
      <Button
        className="absolute left-24 z-10"
        variant="tertiary"
        iconButton
        leftIcon={<Icon icon={<ArrowLeft />} />}
        rounded
        onClick={() => onScroll(-scrollAmount)}
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
        className="absolute right-24"
        variant="tertiary"
        iconButton
        leftIcon={<Icon icon={<ArrowRight />} />}
        rounded
        onClick={() => onScroll(scrollAmount)}
      />
    </div>
  );
};
