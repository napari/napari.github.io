import { Checkbox, FormControlLabel } from '@material-ui/core';
import { set } from 'lodash';
import { useSnapshot } from 'valtio';

import { Checkbox as CheckboxIcon } from '@/components/icons';

import { useCalendar } from './context';
import { FilterKey } from './types';

/**
 * Labels to render for a particular meeting type.
 */
const FILTER_LABEL_BY_KEY: Record<FilterKey, string> = {
  community: 'community meetings',
  other: 'other meetings',
  workingGroup: 'working groups',
};

interface FilterCheckboxProps {
  filterKey: FilterKey;
}

/**
 * Wrapper component over checkboxes that are connected to the filter state by
 * the `filterKey` prop.
 */
function FilterCheckbox({ filterKey }: FilterCheckboxProps) {
  const { calendarState } = useCalendar();
  const checked = useSnapshot(calendarState).filters[filterKey];

  return (
    <FormControlLabel
      control={
        <Checkbox
          checkedIcon={<CheckboxIcon checked />}
          icon={<CheckboxIcon />}
          color="primary"
          checked={checked}
          onChange={(event) =>
            set(calendarState.filters, filterKey, event.target.checked)
          }
        />
      }
      classes={{ label: 'font-semibold' }}
      label={FILTER_LABEL_BY_KEY[filterKey]}
    />
  );
}

const ENABLED_FILTERS: FilterKey[] = ['community', 'workingGroup', 'other'];

/**
 * Component that renders the filter toolbar above the calendar. This component
 * is used for filtering events by a specific type.
 */
export function CalendarFilter() {
  return (
    <div className="flex justify-center">
      <div className="flex space-x-2">
        <p className="font-semibold">show:</p>

        {ENABLED_FILTERS.map((filterKey) => (
          <FilterCheckbox filterKey={filterKey} key={filterKey} />
        ))}
      </div>
    </div>
  );
}
