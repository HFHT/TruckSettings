import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import { useState, useEffect, useRef, useMemo } from 'react'
// import { EditorState } from 'draft-js'
// import { Editor, EditorProps } from 'react-draft-wysiwyg'
// import { convertFromHTML, convertToHTML } from "draft-convert";
import JoditEditor from 'jodit-react';

interface IEditor {
    html: string                        // contains the HTML string to be edited
    setter: Function                    // used by Parent to save changes as they occur
}
export function TextEditor({ html, setter }: IEditor) {
    // const [editorState, setEditorState] = useState(EditorState.createEmpty())
    // const [editorState, setEditorState] = useState(() => {
    //     if (!html) {
    //       return EditorState.createEmpty()
    //     } else {
    //       return EditorState.createWithContent(convertFromHTML(html))
    //     }
    //   })
    // const onEditorStateChange = (editorState: EditorState) => {
    //     setEditorState(editorState)
    //     setter(convertToHTML(editorState.getCurrentContent()))
    // };
    // useEffect(() => {
    //     console.log('TextEditor-useEffect', html)
    //     if (!html) return
    //     setEditorState(EditorState.createWithContent(convertFromHTML(html)))
    // }, [html])
    // const editor = useRef(null);
    const [content, setContent] = useState(html);

    // const config:any = useMemo(
    // 	{
    // 		readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    // 		placeholder: html || 'Start typings...'
    // 	},
    // 	[html]
    // );
    useEffect(() => {
        console.log('TextEditor-useEffect', html)
        if (!html) return
        setContent(html)
    }, [html])
    return (
        <div>
            <JoditEditor
                // ref={editor}
                value={content}
                // config={config}
                // tabIndex={1} // tabIndex of textarea
                // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => {console.log(newContent) }}
            />
            {/* <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                spellCheck={true}
            /> */}
            <textarea
                disabled
                title='Raw HTML'
                value={content}
            ></textarea>
        </div>
    );
}