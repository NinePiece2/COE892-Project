import type { NextApiRequest, NextApiResponse } from 'next';
import { protectedProxyRequest } from '../../../../lib/protectedProxy';

type Data = { message?: string } | Record<string, unknown>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const API_BASE_URL = process.env.API_BASE_URL;
  if (!API_BASE_URL) {
    return res.status(500).json({ message: 'API_BASE_URL not configured' });
  }

  const url = `${API_BASE_URL}/api/auth/register`;

  try {
    const apiRes = await protectedProxyRequest(url, {
      method: 'POST',
      body: JSON.stringify(req.body)
    });
    const data = await apiRes.json();
    return res.status(apiRes.status).json(data);
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Unknown error occurred" });
  }
}
