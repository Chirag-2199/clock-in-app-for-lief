import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/router'
import { Box, Spinner } from 'grommet'

export default function Callback() {
    const { handleRedirectCallback } = useAuth0()
    const router = useRouter()

    useEffect(() => {
        const handleAuth = async () => {
            await handleRedirectCallback()
            router.push('/dashboard')
        }
        handleAuth()
    }, [handleRedirectCallback, router])

    return (
        <Box fill align="center" justify="center">
            <Spinner size="medium" />
        </Box>
    )
}