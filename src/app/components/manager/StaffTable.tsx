import { Box, Table, TableHeader, TableRow, TableCell, Text } from 'grommet'
import { useClock } from '../../../context/ClockContext'

export default function StaffTable() {
    const { shifts } = useClock()

    return (
        <Box pad="medium">
            <Text size="large" weight="bold" margin={{ bottom: 'medium' }}>
                Staff Shifts
            </Text>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell scope="col" border="bottom">
                            <Text weight="bold">Time</Text>
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                            <Text weight="bold">Location</Text>
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                            <Text weight="bold">Status</Text>
                        </TableCell>
                    </TableRow>
                </TableHeader>
                <tbody>
                    {shifts.map(shift => (
                        <TableRow key={shift.id.toString()}>
                            <TableCell>
                                {new Date(shift.start).toLocaleTimeString()} -
                                {shift.end ? new Date(shift.end).toLocaleTimeString() : 'Now'}
                            </TableCell>
                            <TableCell>{shift.location}</TableCell>
                            <TableCell>
                                {shift.end ? 'Completed' : 'In Progress'}
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </Box>
    )
}