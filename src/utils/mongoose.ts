import { connect, connection } from "mongoose";

const con = {
    isConnected: false
}

export async function runDB() {
    if (con.isConnected) return

    const db = await connect(process.env.MONNDODB_URL || 'mongodb://localhost:27017/musalasofttestdb2')
    con.isConnected = true
}

connection.on('connected', () => {
    console.log('Database connected')
})