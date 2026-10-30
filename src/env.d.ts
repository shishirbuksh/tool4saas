/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_ADSENSE_CLIENT?: string;
  readonly PUBLIC_FUNDING_CHOICES_ID?: string;
  readonly PUBLIC_GA_ID?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_AUTHOR_URL?: string;
  readonly PUBLIC_SAME_AS?: string;
  readonly PUBLIC_GSC_VERIFICATION?: string;
  readonly PUBLIC_BING_VERIFICATION?: string;

  // Legacy Next.js-era names, still supported during migration.
  readonly NEXT_PUBLIC_SITE_URL?: string;
  readonly NEXT_PUBLIC_ADSENSE_CLIENT?: string;
  readonly NEXT_PUBLIC_FUNDING_CHOICES_ID?: string;
  readonly NEXT_PUBLIC_GA_ID?: string;
  readonly NEXT_PUBLIC_CONTACT_EMAIL?: string;
  readonly NEXT_PUBLIC_AUTHOR_URL?: string;
  readonly NEXT_PUBLIC_SAME_AS?: string;
  readonly NEXT_PUBLIC_GSC_VERIFICATION?: string;
  readonly NEXT_PUBLIC_BING_VERIFICATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
