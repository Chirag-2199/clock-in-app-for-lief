import { Box } from 'grommet'
import Header from '../app/components/common/Header';
import AuthGuard from '../app/components/common/AuthGuard'
import ShiftHistory from '../app/components/careworker/ShiftHistory'

export default function HistoryPage() {
    return (
        <Box fill>
            <Header />
            <Box pad="large">
                <AuthGuard>
                    <ShiftHistory />
                </AuthGuard>
            </Box>
        </Box>
    )
}