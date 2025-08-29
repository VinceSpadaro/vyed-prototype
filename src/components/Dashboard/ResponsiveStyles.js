import { css } from 'styled-components';

// Breakpoints for responsive design
export const breakpoints = {
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
};

// Media query helpers
export const media = {
  small: (...args) => css`
    @media (max-width: ${breakpoints.small}px) {
      ${css(...args)}
    }
  `,
  medium: (...args) => css`
    @media (max-width: ${breakpoints.medium}px) {
      ${css(...args)}
    }
  `,
  large: (...args) => css`
    @media (max-width: ${breakpoints.large}px) {
      ${css(...args)}
    }
  `,
  xlarge: (...args) => css`
    @media (max-width: ${breakpoints.xlarge}px) {
      ${css(...args)}
    }
  `,
};
