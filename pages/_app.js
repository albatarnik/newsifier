import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="w-full m-auto py-10 px-10 md:px-0 prose prose-sm md:prose-md lg:prose-lg">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
