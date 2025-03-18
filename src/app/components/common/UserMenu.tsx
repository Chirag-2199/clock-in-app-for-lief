import { Menu, Box, Button, Avatar, Text } from 'grommet'
import { Logout, UserSettings } from 'grommet-icons'
import { useAuth } from '..//../../context/AuthContext'
import router from 'next/router'

export default function UserMenu() {
    const { user, logout } = useAuth()

    return (
        <Menu
            dropProps={{ align: { top: 'bottom', right: 'right' } }}
            items={[
                {
                    label: 'Profile',
                    icon: <UserSettings />,
                    onClick: () => router.push('/profile')
                },
                {
                    label: 'Logout',
                    icon: <Logout />,
                    onClick: logout
                }
            ]}
        >
            <Button hoverIndicator>
                <Box direction="row" align="center" gap="small">
                    <Avatar src={user?.picture} background="brand">
                        {user?.name?.[0]}
                    </Avatar>
                    <Text weight="bold">{user?.name}</Text>
                </Box>
            </Button>
        </Menu>
    )
}