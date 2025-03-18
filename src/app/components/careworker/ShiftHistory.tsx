import { Box, Text } from 'grommet'
import { useClock } from '../../../context/ClockContext'

export default function ShiftHistory() {
    const { shifts } = useClock()

    return (
        <Box pad="medium" gap="small">
            <Text size="large" weight="bold">Shift History</Text>
            {shifts.map(shift => (
                <Box key={shift.id} pad="small" border="bottom">
                    <Text>
                        {new Date(shift.start).toLocaleString()} -
                        {shift.end ? new Date(shift.end).toLocaleTimeString() : 'Ongoing'}
                    </Text>
                    <Text size="small">{shift.location}</Text>
                    {shift.note && <Text size="small">Note: {shift.note}</Text>}
                </Box>
            ))}
        </Box>
    )
}