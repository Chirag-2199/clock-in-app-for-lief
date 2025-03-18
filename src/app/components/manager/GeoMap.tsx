// components/manager/GeoMap.tsx
import { Box, Text } from 'grommet'
import { GoogleMap, Marker, Circle } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '400px'
}

export default function GeoMap() {
    const { geofence } = useClock()
    const [map, setMap] = useState<google.maps.Map | null>(null)

    return (
        <Box fill>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={geofence || { lat: 0, lng: 0 }}
                zoom={15}
                onLoad={(map: google.maps.Map) => setMap(map)}
            >
                {geofence && (
                    <>
                        <Marker position={geofence} />
                        <Circle
                            center={geofence}
                            radius={geofence.radius}
                            options={{
                                strokeColor: '#228BE6',
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: '#228BE6',
                                fillOpacity: 0.35
                            }}
                        />
                    </>
                )}
            </GoogleMap>
            {!geofence && (
                <Box fill align="center" justify="center">
                    <Text color="dark-4">No geofence configured</Text>
                </Box>
            )}
        </Box>
    )
}

function useClock(): { geofence: any } {
    throw new Error('Function not implemented.')
}


function useState<T>(arg0: null): [any, any] {
    throw new Error('Function not implemented.')
}
