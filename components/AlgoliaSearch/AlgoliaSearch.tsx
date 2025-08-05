'use client'

import React, { Ref, forwardRef } from 'react'
import { Configure, Highlight, Hits, SearchBox, useHits, useSearchBox } from 'react-instantsearch'
import { InstantSearchNext } from 'react-instantsearch-nextjs'

import { liteClient as algoliasearch } from 'algoliasearch/lite'
import clsx from 'clsx'

// Initialize Algolia search client
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || ''
)

type Props = {
  className?: string
}

// Custom SearchBox component with better styling
const CustomSearchBox = () => {
  const { query, refine } = useSearchBox()
  const [inputValue, setInputValue] = React.useState(query)

  React.useEffect(() => {
    setInputValue(query)
  }, [query])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    setInputValue(value)
    refine(value)
  }

  return (
    <div className="relative mb-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="h-5 w-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="search"
        className="block w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
        placeholder="Search..."
        value={inputValue}
        onChange={handleInputChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </div>
  )
}

// Custom Hit component to display search results
const CustomHit = ({ hit }: { hit: any }) => {
  return (
    <div className="mb-4 rounded-lg border border-gray-200 p-4 transition-shadow duration-200 hover:shadow-md">
      <h3 className="mb-2 text-lg font-semibold text-gray-900">
        <Highlight attribute="title" hit={hit} />
      </h3>
      {hit.description && (
        <p className="mb-2 text-gray-600">
          <Highlight attribute="description" hit={hit} />
        </p>
      )}
      {hit.content && (
        <p className="line-clamp-3 text-sm text-gray-500">
          <Highlight attribute="content" hit={hit} />
        </p>
      )}
      {hit.url && (
        <a
          href={hit.url}
          className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          View →
        </a>
      )}
    </div>
  )
}

// Custom Hits component with empty state
const CustomHits = () => {
  const { results } = useHits()

  if (!results) {
    return (
      <div className="py-8 text-center">
        <div className="animate-pulse">
          <div className="mx-auto mb-4 h-4 w-3/4 rounded bg-gray-200"></div>
          <div className="mx-auto mb-4 h-4 w-1/2 rounded bg-gray-200"></div>
          <div className="mx-auto h-4 w-2/3 rounded bg-gray-200"></div>
        </div>
      </div>
    )
  }

  if (results.hits.length === 0) {
    return (
      <div className="py-12 text-center">
        <svg
          className="mx-auto mb-4 h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-3v3m3 4.5a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mb-2 text-lg font-medium text-gray-900">No results found</h3>
        <p className="text-gray-500">Try adjusting your search terms or check your spelling.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600">
        {results.nbHits} result{results.nbHits !== 1 ? 's' : ''} found
        {results.processingTimeMS && ` in ${results.processingTimeMS}ms`}
      </div>
      <Hits hitComponent={CustomHit} />
    </div>
  )
}

export const AlgoliaSearch = forwardRef(function AlgoliaSearch(
  { className }: Props,
  ref: Ref<HTMLDivElement>
) {
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'your_index_name'

  // Check if required environment variables are set
  if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || !process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY) {
    return (
      <div
        className={clsx(
          'rounded-lg border-2 border-dashed border-gray-300 p-6 text-center',
          className
        )}
        ref={ref}
      >
        <div className="mb-2 text-yellow-600">
          <svg
            className="mx-auto mb-2 h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c.77.833 1.732 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-900">Algolia Configuration Required</h3>
        <p className="mb-4 text-sm text-gray-600">Please set up your environment variables:</p>
        <ul className="mx-auto max-w-md text-left text-sm text-gray-500">
          <li>• NEXT_PUBLIC_ALGOLIA_APP_ID</li>
          <li>• NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY</li>
          <li>• NEXT_PUBLIC_ALGOLIA_INDEX_NAME (optional)</li>
        </ul>
      </div>
    )
  }

  return (
    <div className={clsx('mx-auto w-full max-w-4xl', className)} ref={ref}>
      <InstantSearchNext
        searchClient={searchClient}
        indexName={indexName}
        future={{
          preserveSharedStateOnUnmount: true,
        }}
      >
        <Configure hitsPerPage={10} />
        <CustomSearchBox />
        <CustomHits />
      </InstantSearchNext>
    </div>
  )
})

export default AlgoliaSearch
