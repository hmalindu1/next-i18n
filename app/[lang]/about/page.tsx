import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

/**
 * Asynchronously fetches the dictionary for a given language and displays the "About" page content.
 * 
 * This function component retrieves localized content based on the provided language parameter
 * and renders the "About" page with a title and description fetched from the dictionary.
 * 
 * @param {Object} props The component props.
 * @param {Object} props.params Contains the parameters passed to the component.
 * @param {Locale} props.params.lang The language in which to fetch and display the page content.
 * @returns {JSX.Element} The "About" page component with localized content.
 */
export default async function About({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  // Fetch the dictionary for the specified language
  const { page } = await getDictionary(lang)

  // Render the "About" page content using the fetched dictionary data
  return (
    <section className='py-24'>
      <div className='container'>
        {/* Page title */}
        <h1 className='text-3xl font-bold'>{page.about.title}</h1>
        {/* Page description */}
        <p className='text-gray-500'>{page.about.description}</p>
      </div>
    </section>
  )
}
