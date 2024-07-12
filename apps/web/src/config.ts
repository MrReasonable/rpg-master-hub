import dotenv from 'dotenv'

dotenv.config()

export const port = process.env.WEB_PORT || 3000
export const api = {
    url: process.env.API_URL || 'http://localhost:4000',
}
