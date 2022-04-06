export function currencyFormatter(
  locale: string,
  currency: string
): Intl.NumberFormat {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency
  });
}

export function dateFormatter(locale: string): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(locale);
}
