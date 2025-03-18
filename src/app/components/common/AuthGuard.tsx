import { Box, Text, Button, Heading, Spinner } from 'grommet'
import { useRouter } from 'next/router'
import { useAuth } from '../../../context/AuthContext'

export default function AuthGuard({ children, roles }: {
    children: React.ReactNode
    roles?: Array<'careworker' | 'manager'>
}) {
    const { user, isLoading } = useAuth()
    const router = useRouter()

    if (isLoading) {
        return (
            <Box fill align="center" justify="center">
                <Spinner size="medium" />
            </Box>
        )
    }

    if (!user) {
        router.push(`/login?redirect=${router.pathname}`)
        return null
    }

    if (roles && !roles.includes(user.role)) {
        return (
            <Box align="center" justify="center" pad="large" fill>
                <Heading level="2">Unauthorized Access</Heading>
                <Text margin={{ bottom: 'medium' }}>
                    You don't have permission to view this page
                </Text>
                <Button label="Return to Dashboard" href="/dashboard" primary />
            </Box>
        )
    }

    return <>{children}</>
}