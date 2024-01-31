import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import { useState, useEffect } from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { convertFromHTML, convertToHTML } from "draft-convert";

interface IEditor {
    html: string                        // contains the HTML string to be edited
    setter: Function                    // used by Parent to save changes as they occur
}
export function TextEditor({ html, setter }: IEditor) {
    const [editorState, setEditorState] = useState(() => {
        if (!html) {
          return EditorState.createEmpty()
        } else {
          return EditorState.createWithContent(convertFromHTML(html))
        }
      })
    const onEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState)
        setter(convertToHTML(editorState.getCurrentContent()))
    };
    useEffect(() => {
        console.log('TextEditor-useEffect', html)
        if (!html) return
        setEditorState(EditorState.createWithContent(convertFromHTML(html)))
    }, [html])

    return (
        <div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
            />
            <textarea
                disabled
                title='Raw HTML'
                value={convertToHTML(editorState.getCurrentContent())}
            ></textarea>
        </div>
    );
}