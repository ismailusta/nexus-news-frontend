export async function fetchPayload<T>(endpoint: string): Promise<T> {
  const serverURL = process.env.NEXT_PUBLIC_PAYLOAD_URL;

  if (!serverURL) {
    throw new Error('NEXT_PUBLIC_PAYLOAD_URL is not defined in .env.local');
  }

  const res = await fetch(`${serverURL}${endpoint}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
  }

  return res.json();
}