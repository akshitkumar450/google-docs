import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from 'next/router'
import { db } from "../../firebase";
import { signIn, signOut, getSession, useSession } from 'next-auth/client'
import Login from "../../components/Login";
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { useEffect, useState } from "react";
import TextEditor from "../../components/TextEditor";


function DocId() {
    const router = useRouter()
    const [session] = useSession()
    if (!session) return <Login />
    // const [id, setId] = useState('')
    // getting user id from url
    const { docId } = router.query
    const [snapshot, loading] = useDocumentDataOnce(
        db
            .collection('userDocs')
            .doc(session.user.email)
            .collection('docs')
            .doc(docId)
    )
    // redirects the user if they dont have access to it
    if (!loading && !snapshot?.fileName) {
        router.replace('/')
    }
    // console.log(snapshot);
    // console.log(id);
    // useEffect(() => {
    //     db
    //         .collection('userDocs')
    //         .doc(session.user.email)
    //         .collection('docs')
    //         .doc(setId(docId))
    // }, [])
    // console.log(id);
    return (
        <div>
            <header className='flex justify-between items-center p-3 pb-1'>
                <span className='cursor-pointer' onClick={() => router.push('/')}>
                    <Icon name='description' size='5xl' color='blue' />
                </span>
                <div className='flex-1 px-2'>
                    <h2>{snapshot?.fileName}</h2>
                    <div className='flex items-center text-sm space-x-3 -ml-1 h-8 text-gray-600'>
                        <p className='option'>File</p>
                        <p className='option'>Edit</p>
                        <p className='option'>View</p>
                        <p className='option'>Insert</p>
                        <p className='option'>Format</p>
                        <p className='option'>Tools</p>
                    </div>
                </div>
                <Button
                    color='lightBlue'
                    buttonType='filled'
                    size='regular'
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple='light'
                    className='hidden md:inline-flex'
                >
                    <Icon name='people' size='md' /> Share
                </Button>
                <img
                    // inbuilt signout function
                    onClick={signOut}
                    src={session?.user?.image}
                    alt=""
                    loading='lazy'
                    className='cursor-pointer h-10 w-10 rounded-full ml-5' />
            </header>

            <TextEditor />
        </div>
    )
}

export default DocId

// getting user in the server
export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session: session
        }
    }
}