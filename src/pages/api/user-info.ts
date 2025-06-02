import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Debug: check if table exists and log errors
      try {
        const userInfo = await prisma.userInfo.findFirst({ orderBy: { createdAt: 'desc' } });
        console.log('[API] GET /api/user-info result:', userInfo);
        res.status(200).json(userInfo || {});
      } catch (err) {
        console.error('[API] GET /api/user-info Prisma error:', err);
        res.status(500).json({ error: 'Prisma error', details: String(err) });
      }
    } else if (req.method === 'POST') {
      const { name, birthdate, birthplace, birthtime } = req.body;
      console.log('Received:', { name, birthdate, birthplace, birthtime });
      try {
        const userInfo = await prisma.userInfo.create({ data: { name, birthdate, birthplace, birthtime } });
        console.log('Saved:', userInfo);
        res.status(200).json(userInfo);
      } catch (err) {
        console.error('[API] POST /api/user-info Prisma error:', err);
        res.status(500).json({ error: 'Prisma error', details: String(err) });
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: String(error) });
  }
}
