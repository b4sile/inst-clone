import React from 'react';
import cn from 'classnames';
import s from './style.module.scss';
import Skeleton from 'react-loading-skeleton';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  isProfileImage?: boolean;
}

export const Image = ({
  src,
  className,
  alt,
  decoding,
  isProfileImage,
  ...rest
}: ImageProps) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [paddingBottom, setPaddingBottom] = React.useState('');

  const onLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    setPaddingBottom(
      `${(e.currentTarget.naturalHeight * 100) / e.currentTarget.naturalWidth}%`
    );
  };

  return (
    <div
      style={{
        paddingBottom: `${
          isProfileImage && !isLoading ? '100%' : paddingBottom
        }`,
      }}
      className={cn(s.container, className)}
    >
      {isLoading && (
        <Skeleton
          style={{
            width: '100%',
            height: `${isProfileImage ? '293px' : '500px'}`,
          }}
        />
      )}
      <img
        style={isLoading ? { display: 'none' } : {}}
        decoding="auto"
        onLoad={onLoad}
        src={src}
        {...rest}
        alt={alt}
      />
    </div>
  );
};
