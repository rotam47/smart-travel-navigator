import React from 'react';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  fluid?: boolean;
}

export function ResponsiveContainer({
  children,
  className,
  as: Component = 'div',
  fluid = false,
}: ResponsiveContainerProps) {
  return (
    <Component
      className={cn(
        fluid ? 'w-full px-4 sm:px-6 lg:px-8' : 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      {children}
    </Component>
  );
}

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
}

export function ResponsiveGrid({
  children,
  className,
  columns = { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 },
  gap = 'gap-4 sm:gap-6 lg:gap-8',
}: ResponsiveGridProps) {
  const { xs = 1, sm = 2, md = 3, lg = 4, xl = 4 } = columns;
  
  const gridCols = [
    `grid-cols-${xs}`,
    `sm:grid-cols-${sm}`,
    `md:grid-cols-${md}`,
    `lg:grid-cols-${lg}`,
    `xl:grid-cols-${xl}`,
  ].join(' ');
  
  return (
    <div className={cn('grid', gridCols, gap, className)}>
      {children}
    </div>
  );
}

interface ResponsiveFlexProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: boolean;
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  items?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  gap?: string;
  responsive?: {
    sm?: Partial<{
      direction: 'row' | 'column' | 'row-reverse' | 'column-reverse';
      justify: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
      items: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    }>;
    md?: Partial<{
      direction: 'row' | 'column' | 'row-reverse' | 'column-reverse';
      justify: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
      items: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    }>;
    lg?: Partial<{
      direction: 'row' | 'column' | 'row-reverse' | 'column-reverse';
      justify: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
      items: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    }>;
  };
}

export function ResponsiveFlex({
  children,
  className,
  direction = 'row',
  wrap = false,
  justify = 'start',
  items = 'start',
  gap = 'gap-4',
  responsive,
}: ResponsiveFlexProps) {
  const directionClass = `flex-${direction}`;
  const wrapClass = wrap ? 'flex-wrap' : 'flex-nowrap';
  const justifyClass = `justify-${justify}`;
  const itemsClass = `items-${items}`;
  
  // Build responsive classes
  const responsiveClasses = [];
  
  if (responsive?.sm) {
    if (responsive.sm.direction) responsiveClasses.push(`sm:flex-${responsive.sm.direction}`);
    if (responsive.sm.justify) responsiveClasses.push(`sm:justify-${responsive.sm.justify}`);
    if (responsive.sm.items) responsiveClasses.push(`sm:items-${responsive.sm.items}`);
  }
  
  if (responsive?.md) {
    if (responsive.md.direction) responsiveClasses.push(`md:flex-${responsive.md.direction}`);
    if (responsive.md.justify) responsiveClasses.push(`md:justify-${responsive.md.justify}`);
    if (responsive.md.items) responsiveClasses.push(`md:items-${responsive.md.items}`);
  }
  
  if (responsive?.lg) {
    if (responsive.lg.direction) responsiveClasses.push(`lg:flex-${responsive.lg.direction}`);
    if (responsive.lg.justify) responsiveClasses.push(`lg:justify-${responsive.lg.justify}`);
    if (responsive.lg.items) responsiveClasses.push(`lg:items-${responsive.lg.items}`);
  }
  
  return (
    <div className={cn(
      'flex',
      directionClass,
      wrapClass,
      justifyClass,
      itemsClass,
      gap,
      responsiveClasses.join(' '),
      className
    )}>
      {children}
    </div>
  );
}

interface ResponsiveTextProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  align?: 'left' | 'center' | 'right' | 'justify';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  responsive?: {
    sm?: Partial<{
      align: 'left' | 'center' | 'right' | 'justify';
      size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    }>;
    md?: Partial<{
      align: 'left' | 'center' | 'right' | 'justify';
      size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    }>;
    lg?: Partial<{
      align: 'left' | 'center' | 'right' | 'justify';
      size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    }>;
  };
}

export function ResponsiveText({
  children,
  className,
  as: Component = 'p',
  align = 'left',
  size = 'base',
  responsive,
}: ResponsiveTextProps) {
  const alignClass = `text-${align}`;
  const sizeClass = `text-${size}`;
  
  // Build responsive classes
  const responsiveClasses = [];
  
  if (responsive?.sm) {
    if (responsive.sm.align) responsiveClasses.push(`sm:text-${responsive.sm.align}`);
    if (responsive.sm.size) responsiveClasses.push(`sm:text-${responsive.sm.size}`);
  }
  
  if (responsive?.md) {
    if (responsive.md.align) responsiveClasses.push(`md:text-${responsive.md.align}`);
    if (responsive.md.size) responsiveClasses.push(`md:text-${responsive.md.size}`);
  }
  
  if (responsive?.lg) {
    if (responsive.lg.align) responsiveClasses.push(`lg:text-${responsive.lg.align}`);
    if (responsive.lg.size) responsiveClasses.push(`lg:text-${responsive.lg.size}`);
  }
  
  return (
    <Component className={cn(
      alignClass,
      sizeClass,
      responsiveClasses.join(' '),
      className
    )}>
      {children}
    </Component>
  );
}

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export function ResponsiveImage({
  src,
  alt,
  className,
  width,
  height,
  sizes = '100vw',
  priority = false,
  objectFit = 'cover',
}: ResponsiveImageProps) {
  const { t } = useI18n();
  
  return (
    <div className={cn(
      'overflow-hidden',
      className
    )}>
      <img
        src={src}
        alt={alt || t('common.imageAlt')}
        width={width}
        height={height}
        className={cn(
          'w-full h-auto',
          objectFit === 'contain' && 'object-contain',
          objectFit === 'cover' && 'object-cover',
          objectFit === 'fill' && 'object-fill',
          objectFit === 'none' && 'object-none',
          objectFit === 'scale-down' && 'object-scale-down',
        )}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
}

interface ResponsiveVideoProps {
  src: string;
  className?: string;
  poster?: string;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '9/16';
}

export function ResponsiveVideo({
  src,
  className,
  poster,
  controls = true,
  autoPlay = false,
  muted = true,
  loop = false,
  aspectRatio = '16/9',
}: ResponsiveVideoProps) {
  return (
    <div className={cn(
      'relative w-full overflow-hidden',
      aspectRatio === '16/9' && 'aspect-w-16 aspect-h-9',
      aspectRatio === '4/3' && 'aspect-w-4 aspect-h-3',
      aspectRatio === '1/1' && 'aspect-w-1 aspect-h-1',
      aspectRatio === '9/16' && 'aspect-w-9 aspect-h-16',
      className
    )}>
      <video
        src={src}
        poster={poster}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}

export function ResponsiveHidden({
  children,
  hideOn,
}: {
  children: React.ReactNode;
  hideOn: ('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl')[];
}) {
  const classes = hideOn.map(size => {
    switch (size) {
      case 'xs': return 'hidden';
      case 'sm': return 'sm:hidden';
      case 'md': return 'md:hidden';
      case 'lg': return 'lg:hidden';
      case 'xl': return 'xl:hidden';
      case '2xl': return '2xl:hidden';
      default: return '';
    }
  }).join(' ');
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
}

export function ResponsiveVisible({
  children,
  showOn,
}: {
  children: React.ReactNode;
  showOn: ('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl')[];
}) {
  const classes = showOn.map(size => {
    switch (size) {
      case 'xs': return 'block';
      case 'sm': return 'hidden sm:block';
      case 'md': return 'hidden md:block';
      case 'lg': return 'hidden lg:block';
      case 'xl': return 'hidden xl:block';
      case '2xl': return 'hidden 2xl:block';
      default: return '';
    }
  }).join(' ');
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
}
