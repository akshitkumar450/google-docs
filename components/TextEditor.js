import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { db } from "../firebase";
import { useRouter } from "next/dist/client/router";
import { convertFromRaw, convertToRaw } from "draft-js";
import { useSession } from "next-auth/client";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

// to import only on the client side not on server
const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((module) => module.Editor),
    {
        ssr: false,
    }
);

function TextEditor() {
    const [session] = useSession();
    // for storing the text we type
    // using draft js standards
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [data, setData] = useState('')

    const router = useRouter();
    const { docId } = router.query;
    // const [snapshot] = useDocumentOnce(
    //     db.collection("userDocs").doc(session.user.email).collection("docs").doc(docId)
    // );

    useEffect(() => {
        db
            .collection('userDocs')
            .doc(session.user.email)
            .collection('docs')
            .doc(docId)
            .onSnapshot((snapshot) => {
                return (
                    setData(snapshot.data())
                )
            })
    }, [])
    // console.log(data);

    // when page loads we need to get data from firebase db
    useEffect(() => {
        if (data?.editorState) {
            setEditorState(
                EditorState.createWithContent(
                    // getting the data from firebase which is stored in raw form
                    convertFromRaw(data?.editorState)
                )
            );
        }
    }, []);

    // this will run when text is written and store it in db
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);

        // saving the text written on database mapped to user
        db
            .collection("userDocs")
            .doc(session.user.email)
            .collection("docs")
            .doc(docId)
            .set(
                {    // getting current data from state and convert it to raw form(bcz it   cant be stored in json form to save in db) so that it can be stored in db
                    editorState: convertToRaw(editorState.getCurrentContent()),
                },
                {
                    merge: true,
                }
            );
    };

    return (
        <div className="bg-[#F8F9FA] min-h-screen pb-16">
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
                editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border"
            />
        </div>
    );
}

export default TextEditor;