import { ReactNode } from 'react';

/**
 * Data used for rendering links in the app.
 */
export interface LinkInfo {
  /**
   * URL of this link.
   */
  link: string;

  /**
   * Title of the link to use.
   */
  title: string;

  /**
   * If the link should open in a new tab.
   */
  newTab?: boolean;

  /**
   * Icon to render next to the link.
   */
  icon?: ReactNode;
}
