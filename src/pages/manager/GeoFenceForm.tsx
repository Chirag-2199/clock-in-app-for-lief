import { Box, Form, TextInput, Button, Text } from 'grommet'
import { Location } from 'grommet-icons'
import { useClock } from '../../context/ClockContext'

export default function GeoFenceForm() {
    const { geofence, updateGeofence } = useClock()

    return (
        <Box width="large">
            <Form
                value={geofence}
                onSubmit={({ value }) => {
                    if (value && updateGeofence) {
                        updateGeofence(value)
                    }
                }}
            >
                <Box gap="medium">
                    <Text weight="bold">Set Clinic Location</Text>

                    <TextInput
                        name="address"
                        placeholder="Clinic Address"
                        icon={<Location />}
                    />

                    <Box direction="row" gap="small">
                        <TextInput
                            name="lat"
                            placeholder="Latitude"
                            type="number"
                            step="0.0001"
                        />
                        <TextInput
                            name="lng"
                            placeholder="Longitude"
                            type="number"
                            step="0.0001"
                        />
                    </Box>

                    <TextInput
                        name="radius"
                        placeholder="Radius (meters)"
                        type="number"
                        min="100"
                    />

                    <Button type="submit" primary label="Save Geofence" />
                </Box>
            </Form>
        </Box>
    )
}