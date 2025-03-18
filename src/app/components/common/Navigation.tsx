import { Nav, Box, ResponsiveContext, Button, Text } from 'grommet'
import { Home, Clock, Organization, User as UserIcon, SettingsOption } from 'grommet-icons'
import { useAuth } from '../../../context/AuthContext'
import Link from 'next/link'
import React from 'react'

export default function AppNavigation() {
    const { user } = useAuth()
    const size = React.useContext(ResponsiveContext)
    const isMobile = size === 'small'

    const commonLinks = [
        { label: 'Home', icon: <Home />, href: '/dashboard' },
        { label: 'Shifts', icon: <Clock />, href: '/history' },
    ]

    const careWorkerLinks = [
        { label: 'Clock In', icon: <UserIcon />, href: '/clock-in' },
    ]

    const managerLinks = [
        { label: 'Staff', icon: <Organization />, href: '/manage' },
        { label: 'Settings', icon: <SettingsOption />, href: '/manage/geofence' },
    ]

    return (
        <Box
            background="light-2"
            width={!isMobile ? '250px' : undefined}
            height={isMobile ? '60px' : undefined}
            flex={false}
        >
            <Nav
                direction={isMobile ? 'row' : 'column'}
                justify="between"
                pad={isMobile ? 'small' : 'medium'}
                gap="small"
            >
                {(user ? [
                    ...commonLinks,
                    ...(user.role === 'careworker' ? careWorkerLinks : managerLinks)
                ] : commonLinks).map((link) => (
                    <Link key={link.href} href={user ? link.href : '/login'} passHref>
                        <Button
                            icon={link.icon}
                            label={!isMobile && link.label}
                            hoverIndicator
                            tip={isMobile ? link.label : undefined}
                        />
                    </Link>
                ))}
            </Nav>
        </Box>
    )
}