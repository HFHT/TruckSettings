// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// import { useState, useEffect } from 'react';
// import { EditorState, convertToRaw, ContentState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import { convertFromHTML, convertToHTML } from "draft-convert";

// export default function TextEditor({ html, setter }) {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty())
//   const onEditorStateChange = editorState => {
//     setEditorState(editorState);
//     setter(convertToHTML(editorState.getCurrentContent()));
//   };
//   useEffect(() => {
//     if (!html) return
//     setEditorState(EditorState.createWithContent(convertFromHTML(html)))
//   }, [html])

//   return (
//     <div>
//       <Editor
//         editorState={editorState}
//         toolbarClassName="toolbarClassName"
//         wrapperClassName="wrapperClassName"
//         editorClassName="editorClassName"
//         onEditorStateChange={onEditorStateChange}
//       />
//       <textarea
//         disabled
//         value={convertToHTML(editorState.getCurrentContent())}
//       ></textarea>
//     </div>
//   );
// }