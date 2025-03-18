import { Box, Button, Text, TextInput } from 'grommet'
import { useClock } from '../../../context/ClockContext'
import { useState } from 'react'

export default function ClockInOut() {
    const { isClockedIn, clockIn, clockOut } = useClock()
    const [location, setLocation] = useState('')
    const [note, setNote] = useState('')

    return (
        <Box pad="medium" gap="medium" width="medium">
            <Text size="large" weight="bold">
                {isClockedIn ? 'On Shift' : 'Clock In'}
            </Text>

            {!isClockedIn && (
                <TextInput
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                />
            )}

            <TextInput
                placeholder="Add note (optional)"
                value={note}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNote(e.target.value)}
            />

            <Button
                primary
                label={isClockedIn ? 'Clock Out' : 'Clock In'}
                onClick={() => {
                    if (isClockedIn) {
                        clockOut(note)
                    } else {
                        clockIn(location, note)
                    }
                    setNote('')
                    setLocation('')
                }}
            />
        </Box>
    )
}