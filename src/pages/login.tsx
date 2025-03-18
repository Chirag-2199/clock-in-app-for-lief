import { Box, Button, Heading, Main } from 'grommet'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
    const { login } = useAuth()

    return (
        <Box fill>
            <Main pad="large" align="center" justify="center">
                <Box gap="medium" width="medium">
                    <Heading level="1">Lief Care Login</Heading>
                    <Button
                        primary
                        label="Login as Care Worker"
                        onClick={() => login('careworker')}
                    />
                    <Button
                        label="Login as Manager"
                        onClick={() => login('manager')}
                    />
                </Box>
            </Main>
        </Box>
    )
}