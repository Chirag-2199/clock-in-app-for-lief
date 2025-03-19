import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession(req, res)

    if (!session?.user) {
        return res.status(401).json({ error: 'Not authenticated' })
    }

    // In real implementation, fetch role from your database
    const mockRoles: { [key: string]: string } = {
        'careworker@example.com': 'careworker',
        'manager@example.com': 'manager'
    }

    const role = mockRoles[session.user.email as string] || 'careworker'

    res.status(200).json({ role })
}