import React from 'react'
import { Box, Button, Header as GHeader, ResponsiveContext, Text } from 'grommet'
import { Menu } from 'grommet-icons'
import UserMenu from './UserMenu'
import { useAuth } from '../../../context/AuthContext'

export default function AppHeader({ toggleSidebar }: { toggleSidebar?: () => void }) {
    const { user } = useAuth()
    const size = React.useContext(ResponsiveContext)

    return (
        <GHeader background="brand" pad="medium" elevation="small">
            <Box direction="row" align="center" gap="medium">
                {size === 'small' && toggleSidebar && (
                    <Button icon={<Menu />} onClick={toggleSidebar} hoverIndicator />
                )}
                <Text size="large" weight="bold">
                    Lief Care Shifts
                </Text>
            </Box>

            {user ? <UserMenu /> : (
                <Button label="Login" primary href="/login" />
            )}
        </GHeader>
    )
}