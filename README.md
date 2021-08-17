# Newsifier Test

[View live demo](https://newsifier.vercel.app/)

## PageSpeed Insights Score
- 98 for Mobile
- 100 for Desktop

## Installation
```bash
yarn install
yarn build
yarn start
```

## Technologies
- Next.js (JavaScript)
- Tailwind CSS

## Additional Info
- All articles and comments for the first 3 pages are generated statically at build time and revalidated every 1 minute
- Article listings for third page and beyond will be called upon request, article content is generated in the background
- Images for article listings are lazy loaded
