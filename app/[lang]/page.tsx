import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

/**
 * Home Page Component
 * 
 * Asynchronously fetches the dictionary for a given language and displays the "Home" page content.
 * 
 * This function component retrieves localized content based on the provided language parameter
 * and renders the "Home" page with a title and description fetched from the dictionary.
 * 
 * @param {Object} props The component props.
 * @param {Object} props.params Contains the parameters passed to the component.
 * @param {Locale} props.params.lang The language in which to fetch and display the page content.
 * @returns {JSX.Element} The "Home" page component with localized content.
 */
export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  // Fetch the dictionary for the specified language
  const { page } = await getDictionary(lang)

  // Render the "Home" page content using the fetched dictionary data
  return (
    <section className='py-24'>
      <div className='container'>
        {/* Page title */}
        <h1 className='text-3xl font-bold'>{page.home.title}</h1>
        {/* Page description */}
        <p className='text-gray-500'>{page.home.description}</p>
      </div>
    </section>
  )
}
