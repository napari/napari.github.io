import { FilterKey } from './types';

/**
 * Labels to render for a particular meeting type.
 */
export const FILTER_LABEL_BY_KEY: Record<FilterKey, string> = {
  community: 'community meetings',
  other: 'other meetings',
  workingGroup: 'working groups',
};
