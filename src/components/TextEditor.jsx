import { useRef, useEffect, useState } from "react"
import ReactQuill from "react-quill"
import {setDoc, doc, getDoc, onSnapshot} from "firebase/firestore"
import { db } from "../config/firebase-config"
import "react-quill/dist/quill.snow.css";
import "../App.css";

export default function TextEditor() {
  const quillRef = useRef(null)
  const [isEditing, setIsEditing] = useState(false)

  const isLocalChange = useRef(false)

  //creating a reference to our document
    //db: our firestore database connection
    //documents: out collection
    //sample-doc: document inside our collection
  const documentRef = doc(db, "documents", "sample-doc")

  //Saving our local changes to the db
  function saveContent() {
    if (quillRef.current && isLocalChange.current) {
      const content = quillRef.current.getEditor().getContents();
      console.log("Saving content to Firestore:", content);
      setDoc(documentRef, { content: content.ops }, { merge: true })
        .then(() => console.log("Content saved successfully"))
        .catch(console.error);
      isLocalChange.current = false; // Reset local change flag after saving
    }
  }
  

  useEffect(() => {
    if(quillRef.current){
      //Load any initial content from our db
      getDoc(documentRef)
        .then(docSnap => {
          if(docSnap.exists()){
            const saveContent =  docSnap.data().content;
            if(saveContent){
              quillRef.current.getEditor().setContents(saveContent)
            }
          } else {console.log("No doc found, starting with empty editor")}
        })
        .catch(console.error)



      //listen to firestore for any updates and update locally in realtime
      const unsubscribe = onSnapshot(documentRef, (snapshot) => {
        if(snapshot.exists()){
          const newContent = snapshot.data().content

          if(!isEditing){
            const editor = quillRef.current.getEditor()
            const currentCursorPosition = editor.getSelection()?.index || 0;

            editor.setContents(newContent, "silent");
            editor.setSelection(currentCursorPosition);
          }
        }
      })



      //listen for local text changes and save it to firestore
      const editor = quillRef.current.getEditor();
      editor.on("text-change", (delta, oldDelta, source) => {
        if(source === "user"){
          isLocalChange.current = true;
          setIsEditing(true);
          saveContent()
          setTimeout(() => setIsEditing(false), 5000)
        }
      })

      return () => {
        unsubscribe();
        editor.off("text-change");
      };

    }
  }
  , [])
  
  
  return (
    <div className="google-docs-editor">
      <ReactQuill ref={quillRef}/>
    </div>
  )
}
