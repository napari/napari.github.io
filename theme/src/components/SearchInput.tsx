import clsx from 'clsx';
import { useRouter } from 'next/router';
import { HTMLProps, useState } from 'react';

import { Search } from '@/components/icons';

interface Props extends HTMLProps<HTMLFormElement> {
  /**
   * Render large variant of search input with a larger font size and search icon.
   */
  large?: boolean;
}

/**
 * Search input component. This renders an input field with a underline and
 * magnifying glass icon to the right of the component. When the user submits a
 * query, it redirects them to the search page with search results for the
 * query.
 */
export function SearchInput({ large, ...props }: Props) {
  const router = useRouter();

  // Local state for query. This is used to store the current entered query string.
  const [localQuery, setLocalQuery] = useState('');

  const iconClassName = clsx(
    'h-5 w-5',

    // 22x22 pixels when root font-size is 16px
    large && 'h-[1.375rem] w-[1.375rem]',
  );

  /**
   * Performs a search query on form submission. If the user is on the search
   * page, this runs the query through the search engine. Otherwise, it
   * redirects to the search page with the query added to the URL.
   */
  async function submitForm(searchQuery: string) {
    if (!searchQuery) {
      return;
    }

    const url = {
      pathname: '/search',
      query: {
        query: searchQuery,
      },
    };
    await router.push(url);
  }

  return (
    <form
      data-testid="searchInputForm"
      className={clsx(
        // Flex layout
        'flex flex-auto items-center',

        // Borders
        'border-b-2 border-black',

        large && 'text-xl',
      )}
      onSubmit={async (event) => {
        event.preventDefault();
        await submitForm(localQuery);
      }}
      {...props}
    >
      <input
        aria-label="Search input for searching for napari plugins."
        data-testid="searchInputTextInput"
        className={clsx(
          // Flex layout
          'flex flex-auto',

          // Remove border and focus outline around input
          'border-none outline-none',

          // Remove white colored input background
          'bg-transparent',

          /*
            Inputs have a default width defined by the browser, so we have to
            set this explicitly to make the input flexible:
            https://stackoverflow.com/a/42421490
          */
          'w-0',
        )}
        onChange={(event) => {
          const { value } = event.target;
          setLocalQuery(value);
        }}
        value={localQuery}
      />

      <button
        aria-label="Submit search query"
        onClick={() => submitForm(localQuery)}
        // We use `type="button"` because `type="submit"` will first call the
        // `onClick()` handler and then the `onSubmit()` handler, regardless of
        // whether the user clicked on the button or not.
        type="button"
      >
        <Search className={iconClassName} />
      </button>
    </form>
  );
}
