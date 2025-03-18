export interface Coordinate {
    lat: number
    lng: number
}

export function checkInBounds(point: Coordinate, geofence: Coordinate & { radius: number }): boolean {
    if (!geofence) return false

    const R = 6371e3 // Earth radius in meters
    const φ1 = point.lat * Math.PI / 180
    const φ2 = geofence.lat * Math.PI / 180
    const Δφ = (geofence.lat - point.lat) * Math.PI / 180
    const Δλ = (geofence.lng - point.lng) * Math.PI / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const distance = R * c
    return distance <= geofence.radius
}

export function getCurrentLocation(): Promise<Coordinate> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }),
            error => reject(error)
        )
    })
}