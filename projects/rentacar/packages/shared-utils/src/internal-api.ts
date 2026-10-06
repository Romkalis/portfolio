/** Header for service-to-service calls to protected internal endpoints. */
export const INTERNAL_API_KEY_HEADER = 'x-internal-api-key';

export function internalApiKeyHeaders(
  extra: Record<string, string> = {},
): Record<string, string> {
  const key = process.env.INTERNAL_API_KEY;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...extra,
  };
  if (key) {
    headers[INTERNAL_API_KEY_HEADER] = key;
  }
  return headers;
}
