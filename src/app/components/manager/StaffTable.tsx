import { Box, Text } from 'grommet';
import { useClock } from '../../../context/ClockContext';

export default function StaffTable() {
    const { shifts } = useClock();

    return (
        <Box pad="medium">
            <Text size="large" weight="bold" margin={{ bottom: 'medium' }}>
                Staff Shifts
            </Text>
            <Box direction="column" gap="small">
                {/* Header */}
                <Box direction="row" gap="medium" pad="small" background="light-2">
                    <Text weight="bold" width="200px">Time</Text>
                    <Text weight="bold" width="200px">Location</Text>
                    <Text weight="bold" width="200px">Status</Text>
                </Box>

                {/* Rows */}
                {shifts.map(shift => (
                    <Box
                        key={shift.id.toString()}
                        direction="row"
                        gap="medium"
                        pad="small"
                        border={{ side: 'bottom' }}
                    >
                        <Box width="200px">
                            {new Date(shift.start).toLocaleTimeString()} -{' '}
                            {shift.end ? new Date(shift.end).toLocaleTimeString() : 'Now'}
                        </Box>
                        <Box width="200px">{shift.location}</Box>
                        <Box width="200px">
                            <Text color={shift.end ? 'status-ok' : 'status-critical'}>
                                {shift.end ? 'Completed' : 'In Progress'}
                            </Text>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}