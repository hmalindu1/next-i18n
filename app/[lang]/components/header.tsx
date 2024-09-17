import Link from 'next/link'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import LocaleSwitcher from './locale-switcher'

// Header component that dynamically generates navigation links based on the current language.
export default async function Header({ lang }: { lang: Locale }) {
  // Fetch navigation dictionary based on the current language.
  const { navigation } = await getDictionary(lang)

  return (
    // Render the header with navigation links and a locale switcher.
    <header className='py-6'>
      <nav className='container flex items-center justify-between'>
        <ul className='flex gap-x-8'>
          {/* Navigation link to the home page */}
          <li>
            <Link href={`/${lang}`}>{navigation.home}</Link>
          </li>
          {/* Navigation link to the about page */}
          <li>
            <Link href={`/${lang}/about`}>{navigation.about}</Link>
          </li>
        </ul>
        {/* Locale switcher for changing the language */}
        <LocaleSwitcher />
      </nav>
    </header>
  )
}
