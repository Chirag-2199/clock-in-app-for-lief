import { Box } from 'grommet'
import Header from '../app/components/common/Header';
import Navigation from '../app/components/common/Navigation'
import AuthGuard from '../app/components/common/AuthGuard'
import React, { useState } from 'react';
import ClockInOut from '@/app/components/careworker/ClockInOut';

export default function Dashboard() {
    return (
        <Box fill>
            <Header />
            <Box pad="large" align="center">
                <AuthGuard>
                    <ClockInOut />
                </AuthGuard>
            </Box>
        </Box>
    )
}