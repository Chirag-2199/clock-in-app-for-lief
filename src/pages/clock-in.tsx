import { Box, Main } from 'grommet'
import Header from '../app/components/common/Header';
import ClockInOut from '../app/components/careworker/ClockInOut'
import AuthGuard from '../app/components/common/AuthGuard'

export default function ClockInPage() {
    return (
        <Box fill>
            <Header />
            <Main pad="large" align="center">
                <AuthGuard roles={['careworker']}>
                    <ClockInOut />
                </AuthGuard>
            </Main>
        </Box>
    )
}