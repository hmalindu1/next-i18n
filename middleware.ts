import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from '@/i18n.config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

/**
 * Determines the best matching locale for the request based on the Accept-Language header.
 * 
 * This function examines the request's Accept-Language header and matches it against the
 * available locales defined in the application. It uses the `matchLocale` function from
 * `@formatjs/intl-localematcher` to find the best match. If a match is found, it returns
 * the matching locale. If no match is found, it returns the application's default locale.
 * 
 * @param request The incoming request object from Next.js.
 * @returns The best matching locale as a string, or undefined if no match is found.
 */
function getLocale(request: NextRequest): string | undefined {
  // Convert request headers to a simple object for easier handling.
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Retrieve the list of available locales from the application's configuration.
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales

  // Use the Negotiator library to parse the Accept-Language header and filter
  // the list of potential languages based on the available locales.
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)

  // Use the matchLocale function to find the best matching locale from the list of
  // potential languages. If no match is found, the application's default locale is used.
  const locale = matchLocale(languages, locales, i18n.defaultLocale)

  return locale
}

/**
 * Middleware to enforce locale prefix in URL paths.
 * 
 * This middleware checks if the request URL path starts with a valid locale prefix.
 * If the path is missing a locale prefix, it redirects the request to the URL with
 * the best matching locale based on the request's `Accept-Language` header.
 * 
 * @param request The incoming request object from Next.js.
 * @returns A NextResponse object to redirect the request to the localized URL,
 *          or undefined to continue processing the request normally.
 */
export function middleware(request: NextRequest) {
  // Extract the pathname from the request URL.
  const pathname = request.nextUrl.pathname;

  // Check if the pathname starts with any of the available locale prefixes.
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // If the pathname is missing a locale, determine the best matching locale
  // and redirect the request to the corresponding localized URL.
  if (pathnameIsMissingLocale) {
    // Determine the best matching locale for the request.
    const locale = getLocale(request);

    // Construct the URL for the redirect response by prepending the locale
    // to the original pathname, ensuring the path starts with '/'.
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }

  // If the pathname already includes a valid locale, no action is taken,
  // allowing the request to proceed to the next middleware or handler.
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
