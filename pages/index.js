import Head from 'next/head'
import Header from '../components/Header'
import CreatingDocs from '../components/CreatingDocs';
import { getSession, useSession } from 'next-auth/client'
import Login from '../components/Login';
import DocumentRow from '../components/DocumentRow';
import DocumentRows from '../components/DocumentRows';
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { useEffect, useState } from 'react';
import Button from '@material-tailwind/react/Button';
import { db } from '../firebase'
import firebase from 'firebase'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');
  // for next auth
  const [session, loading] = useSession()
  const [docs, setDocs] = useState([])

  // if user is not login
  // if (!session) return <Login />

  // getting data using  firebase webhooks
  // const [snapshot] = useCollectionOnce(
  //   db
  //     .collection('userDocs')
  //     .doc(session.user.email)
  //     .collection('docs')
  //     .orderBy('timestamp', 'desc')
  // );
  //console.log(snapshot.docs);

  // creating a new document
  const createDocument = () => {
    if (!input) return;
    // mapping the current user email with document they will have or creating
    db
      .collection('userDocs')
      .doc(session.user.email)
      .collection('docs')
      .add({
        fileName: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
    setInput('')
    setShowModal(false)
  }

  useEffect(() => {
    const unsubscribe = db
      .collection('userDocs')
      .doc(session?.user?.email)
      .collection('docs')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        return (
          setDocs(snapshot.docs.map((doc) => {
            return ({
              id: doc.id,
              data: doc.data()
            })
          }))
        )
      })

    return () => {
      unsubscribe()
    }
  }, [])
  //console.log(docs);
  const modal = (
    <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type='text'
          className='outline-none w-full'
          placeholder='enter name of document..'
          onKeyDown={(e) => e.key === 'Enter' && createDocument()}

        />
      </ModalBody>

      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={(e) => setShowModal(false)}
          ripple="dark"
        >
          Close
        </Button>

        <Button
          color="blue"
          onClick={createDocument}
          ripple="light"
        >
          create
        </Button>
      </ModalFooter>
    </Modal>
  )

  return (
    <div>
      <Head>
        <title>Google Docs</title>
        <link rel="icon" href="https://cdn4.iconfinder.com/data/icons/free-colorful-icons/360/google_docs.png" />
      </Head>
      {/**show modal */}
      {modal}
      {
        // when the use is logged in or not
        (session) ? (
          <>
            <Header />
            <CreatingDocs setShowModal={setShowModal} />
            <DocumentRow />
            {/**
            getting from db using firebase webhooks
             */}
            {/*
              snapshot?.docs.map((doc) => {
                return (
                  <DocumentRows
                    key={doc.id}
                    id={doc.id}
                    fileName={doc.data().fileName}
                    date={doc.data().timestamp}
                  />
                )
              })
            */}

            {
              docs.map(({ id, data: { fileName, timestamp } }) => {
                return (
                  <DocumentRows
                    key={id}
                    id={id}
                    fileName={fileName}
                    date={timestamp}
                  />
                )
              })
            }
          </>
        ) : (<Login />)
      }
    </div>
  )
}

// getting info from servers
// passing the session through props
// this will make all loading stuff on the server
export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session: session
    }
  }
}
