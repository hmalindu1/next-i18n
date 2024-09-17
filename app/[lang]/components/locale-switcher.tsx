'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { i18n } from '@/i18n.config'

export default function LocaleSwitcher() {
  const pathName = usePathname()

/**
 * Constructs a localized path by injecting the specified locale into
 * the current pathname. This function is used to create href values
 * for locale-switching links.
 * 
 * @param locale The locale to be injected into the pathname.
 * @returns The updated pathname with the specified locale.
 */
const redirectedPathName = (locale: string) => {
  // If the current pathname is not available, default to the root path.
  if (!pathName) return '/'

  // Split the pathname into segments to manipulate individual parts.
  const segments = pathName.split('/')

  // Replace the second segment (index 1) with the specified locale.
  // This assumes the first segment of the path is always the locale.
  segments[1] = locale

  // Reassemble and return the updated pathname.
  return segments.join('/')
}

  return (
    <ul className='flex gap-x-3'>
      {i18n.locales.map(locale => {
        return (
          <li key={locale}>
            <Link
              href={redirectedPathName(locale)}
              className='rounded-md border bg-black px-3 py-2 text-white'
            >
              {locale}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
