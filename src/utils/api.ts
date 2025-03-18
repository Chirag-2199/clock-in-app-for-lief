// utils/api.ts
import axios from 'axios'

type Coordinate = {
    latitude: number
    longitude: number
}

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

export const clockIn = async (data: {
    userId: string
    location: Coordinate
    note?: string
}) => {
    return api.post('/shifts/clock-in', data)
}

export const getShifts = async (userId: string) => {
    return api.get(`/shifts/${userId}`)
}