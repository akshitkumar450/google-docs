import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { db } from '../../../firebase'
import { FirebaseAdapter } from '@next-auth/firebase-adapter'

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    adapter: FirebaseAdapter(db),

    // A database is optional, but required to persist accounts in a database
    // database: process.env.DATABASE_URL,
})