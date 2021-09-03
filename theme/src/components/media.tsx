import { createMedia } from '@artsy/fresnel';

import breakpoints from '@/breakpoints.json';

const AppMedia = createMedia({ breakpoints });

/**
 * Styles for SSG.
 */
export const mediaStyles = AppMedia.createMediaStyle();

export const {
  /**
   * This component provides an easy-to-use API for responding to media
   * queries.  This adds a wrapper div over the component with fresnel CSS
   * classes to respond to media queries.
   *
   * If you don't need the wrapper div, use the MediaFragment component
   * instead.
   */
  Media,

  /**
   * This provides context data related to the media query component.
   */
  MediaContextProvider,
} = AppMedia;
