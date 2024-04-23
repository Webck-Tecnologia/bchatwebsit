import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { css } from 'theme-ui';

const renderImage = (image, props, sx) => {
  // Verifica se image e image.src existem
  if (!image || !image.src) return null;

  // Verifica se a extensão da imagem é SVG
  const isSVG = image.src.extension === 'svg';
  if (isSVG) {
    return (
      <img
        src={image.src.publicURL}
        style={{
          width: image.width || `100%`,
          maxWidth: image.maxWidth || `none`
        }}
        {...props}
      />
    );
  }

  // Obtém os dados da imagem usando Gatsby Image API
  const imageData = getImage(image.src);
  // Verifica se imageData existe
  if (imageData) {
    return (
      <GatsbyImage
        image={imageData}
        alt={image.alt}
        imageEffect='fadeIn'
        css={css({
          verticalAlign: `middle`,
          borderStyle: image.border || `none`,
          borderWidth: image.border || 0,
          borderColor: `white`,
          boxShadow: `none`,
          borderRadius: image.radius || `unset`,
          ...sx
        })}
        {...props}
      />
    );
  }

  return null;
};

export default renderImage;
