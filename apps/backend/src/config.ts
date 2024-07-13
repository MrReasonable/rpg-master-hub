import dotenv from 'dotenv'

dotenv.config()

export const port = Number.parseInt(process.env.API_PORT || '4000') || 4000
export const api = {
    url: process.env.API_URL || 'http://localhost:3000',
}
