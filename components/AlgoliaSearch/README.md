# AlgoliaSearch Component

A modern, responsive search component built with Algolia InstantSearch and integrated with Makeswift.

## Features

- **Real-time search**: Instant search results as you type
- **Responsive design**: Works great on all device sizes
- **Customizable styling**: Supports Makeswift's className prop
- **Error handling**: Graceful fallbacks and loading states
- **Accessibility**: Keyboard navigation and screen reader support
- **TypeScript support**: Fully typed for better development experience

## Setup

### 1. Environment Variables

Add the following environment variables to your `.env.local` file:

```env
NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id_here
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=your_search_only_api_key_here
NEXT_PUBLIC_ALGOLIA_INDEX_NAME=your_index_name_here
```

**Important**: Only use your **Search-Only API Key** for the client-side environment variable, never your Admin API Key.

### 2. Algolia Index Setup

Your Algolia index should contain documents with the following recommended structure:

```json
{
  "objectID": "unique_id",
  "title": "Document Title",
  "description": "Brief description",
  "content": "Full content text",
  "url": "https://example.com/page"
}
```

### 3. Adding to Makeswift

The component is automatically registered and will appear in the Makeswift builder under **Custom / Algolia Search**.

## Component Props

- `className` - CSS classes for styling the component container

## Customization

The component uses Tailwind CSS classes and can be customized by:

1. **Styling**: Use the `className` prop in Makeswift to add custom styles
2. **Search behavior**: Modify the `Configure` component props in the source code
3. **Hit template**: Customize the `CustomHit` component to change how results are displayed

## Troubleshooting

### "Algolia Configuration Required" Message

This appears when environment variables are not properly set. Ensure all required variables are in your `.env.local` file and restart your development server.

### No Search Results

1. Verify your index name matches the one in your Algolia dashboard
2. Check that your index contains data
3. Ensure your Search-Only API Key has the correct permissions

### Styling Issues

The component uses Tailwind CSS. Make sure Tailwind is properly configured in your project.

## Best Practices

1. **Index Structure**: Keep your searchable attributes consistent across all documents
2. **Performance**: Use Algolia's `Configure` component to limit results per page
3. **SEO**: Consider implementing server-side rendering for better SEO
4. **Analytics**: Implement Algolia Insights for search analytics

## API Reference

Built with:

- [Algolia InstantSearch](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/)
- [react-instantsearch-nextjs](https://www.npmjs.com/package/react-instantsearch-nextjs)
- [Next.js App Router](https://nextjs.org/docs/app)
