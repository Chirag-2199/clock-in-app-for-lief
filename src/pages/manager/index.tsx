import { Box, Main, Tab, Tabs } from 'grommet'
import Header from '../../app/components/common/Header';
import GeoFenceForm from './GeoFenceForm'
import StaffTable from '../../app/components/manager/StaffTable'
import AuthGuard from '../../app/components/common/AuthGuard'

export default function ManagePage() {
    return (
        <Box fill>
            <Header />
            <Main pad="large">
                <AuthGuard roles={['manager']}>
                    <Tabs>
                        <Tab title="Geofence">
                            <Box pad="medium">
                                <GeoFenceForm />
                            </Box>
                        </Tab>
                        <Tab title="Staff">
                            <Box pad="medium">
                                <StaffTable />
                            </Box>
                        </Tab>
                    </Tabs>
                </AuthGuard>
            </Main>
        </Box>
    )
}