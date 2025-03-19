import React, { ReactNode } from 'react';
import { Box, Grid, Heading } from 'grommet';
import { BarChart, PieChart, Pie, Bar, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

type Shift = {
    id: number;
    employeeId: number;
    startTime: string;
    endTime: string;
};

const sampleData = [
    { day: 'Mon', hours: 8 },
    { day: 'Tue', hours: 7.5 },
    { day: 'Wed', hours: 9 },
    { day: 'Thu', hours: 8.2 },
    { day: 'Fri', hours: 8.5 }
];

export default function AnalyticsDashboard({ shifts }: { shifts: Shift[] }) {
    return (
        <Box pad="medium" gap="medium">
            <Heading level="2">Weekly Analytics</Heading>

            <Grid columns={['1fr', '1fr']} gap="medium" {...({} as any)}>
                <Box>
                    <Box background="light-2" pad="medium" round="small">
                        <Heading level="3" margin="none">Daily Hours</Heading>
                        <BarChart width={300} height={200} data={sampleData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="hours" fill="#228BE6" />
                        </BarChart>
                    </Box>
                </Box>
                <Box>
                    <Box background="light-2" pad="medium" round="small">
                        <Heading level="3" margin="none">Attendance</Heading>
                        <PieChart width={300} height={200}>
                            <Pie
                                data={sampleData}
                                dataKey="hours"
                                nameKey="day"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#40C057"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </Box>
                </Box>
            </Grid>

        </Box>
    );
}
