import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { db } from '../../../firebase'
import { FirebaseAdapter } from '@next-auth/firebase-adapter'

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        // ...add more providers here
    ],
    // this wil store all the users signin in our app,all current active sessions in our firebase database
    adapter: FirebaseAdapter(db),

    // A database is optional, but required to persist accounts in a database
    // database: process.env.DATABASE_URL,
})