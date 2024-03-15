/**
 *
 * These styles are solely for adding [background images] or
 * [background colors] to blocks.
 *
 */

import heroBg from './assets/hexagonal.png';

const blockStyles = {
  heroContainer: {
    position: `relative`,
    pt: [5, 6],
    '::before, ::after': {
      position: `absolute`,
      content: `" "`,
      width: [`full`, `90%`],
      height: `80%`,
      top: [`-10%`, 0],
      right: `50%`,
      transform: `translate(50%, 0)`,
      zIndex: -1
    },
    '::before': {
      borderRadius: `xl`,
      background: t => `linear-gradient(
          180deg,
          ${t.colors.omegaLighter} 0%,
          ${t.colors.omegaLight} 100%
        )`
    },
    '::after': {
      backgroundSize: `50%`,
      opacity: 0.1,
      border: "1px solid #404040", /* Cor da borda */
      background: "linear-gradient(rgba(255, 255, 255, 0.9), rgba(235, 241, 250, 0.9))", /* Gradiente */
      pointerEvents: "none" /* Para garantir que o componente não capture eventos de mouse */
    }
  },
  featuresContainer: {
    position: `relative`,
    py: [5, 6],
    '::before': {
      position: `absolute`,
      content: `" "`,
      size: `full`,
      top: 0,
      right: `50%`,
      transform: `translate(50%, 0)`,
      zIndex: -1,
      borderRadius: `xl`,
      background: t => `linear-gradient(
          150deg,
          ${t.colors.omegaLighter} 80%,
          ${t.colors.omegaLight} 100%
        )`
    }
  },
  testimonialsContainer: {
    position: `relative`,
    py: [5, 6],
    '::before, ::after': {
      position: `absolute`,
      content: `" "`,
      width: [`full`, `90%`],
      height: `80%`,
      top: 0,
      right: `50%`,
      transform: `translate(50%, 0)`,
      zIndex: -1
    },
    '::before': {
      borderRadius: `xl`,
      background: t => `linear-gradient(
          150deg,
          ${t.colors.omegaLighter} 50%,
          ${t.colors.omegaLight} 100%
        )`
    },
    '::after': {
      transform: `scaleX(-1)`,
      background: `url(${heroBg}) no-repeat left top`,
      backgroundSize: `50%`,
      opacity: 0.1
    }
  }
};

export default blockStyles;
