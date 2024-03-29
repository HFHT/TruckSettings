import { useEffect, useMemo, useRef, useState } from 'react';
import { find_id } from '../../helpers';
import { MiscIcons } from '../../icons';
import './templates.css';
import { Button, Tiles } from '../../components';

interface IDownloads {
    isOpen: boolean
    isAdmin: boolean
    dbSettings: any
    mutateDB: Function
    // dbSched: any
}

export const Templates = ({ isOpen, isAdmin, dbSettings, mutateDB/* dbTrack, dbSched */ }: IDownloads) => {
    if (!isOpen) return (<></>)
    const uIdx = find_id('_id', 'email', dbSettings)
    const [theTemplates, setTheTemplates] = useState(dbSettings[uIdx])
    const [theTemplate, setTheTemplate] = useState<any>()
    const [theEmailType, setTheEmailType] = useState('')
    const [editorState, setEditorState] = useState('')
    const [canSave, setCanSave] = useState(false)
    const emailTypes: any = useMemo(() => {
        let retval: string[] = []
        Object.entries(theTemplates.templates).forEach((theTemplate: any, i: number) => {
            console.log(theTemplate[0])
            retval.push(theTemplate[0])
        })
        return retval
    }, [])
    console.log(theTemplates, uIdx, theTemplates.templates)
    console.log(Object.entries(theTemplates.templates), emailTypes)
    function setEmail(t: string) {
        setTheEmailType(t)
        // setValue(theTemplates.templates[t].body)
        setTheTemplate(theTemplates.templates[t])
        setEditorState(theTemplates.templates[t].body)
        setCanSave(false)
    }
    function saveBody() {
        if (!editorState) {
            console.log('nothing to save')
            return
        }
        const thisTemplate = { ...theTemplates }
        thisTemplate.templates[theEmailType].body = editorState
        setTheTemplates(thisTemplate)
        mutateDB(theTemplates, dbSettings, false)
        setEditorState('')
        setCanSave(false)
    }
    function cancelBody() {
        const thisTemplate = JSON.parse(JSON.stringify(theTemplates.templates[theEmailType]))
        setTheTemplate(null)
        console.log(thisTemplate)
        setEditorState('')
        setTheEmailType('')
        setCanSave(false)
    }
    function onSubjectChange(thisSubject: any) {
        console.log(thisSubject)
        const thisTemplate = { ...theTemplates }
        thisTemplate.templates[theEmailType].subject = thisSubject.subject
        setTheTemplates(thisTemplate)
        mutateDB(theTemplates, dbSettings, false)
    }
    return (
        <>
            <h2>email Templates</h2>
            <Tiles tiles={emailTypes} title={''} onClick={(e) => setEmail(e)} />
            {theEmailType !== '' &&
                <div className='templatediv'>
                    <div className='templatebtn'>
                        <Button disabled={!canSave} onClick={() => saveBody()}>&nbsp;&nbsp;&nbsp;Save&nbsp;&nbsp;&nbsp;</Button>
                        <Button disabled={!canSave} onClick={() => cancelBody()}>Cancel</Button>
                    </div>
                    <label className='templatesubject'>Subject
                        <input disabled={!isAdmin} type={'text'} value={theTemplate.subject} title={'Subject'} onChange={(e: any) => onSubjectChange({ ...theTemplate, subject: e.target.value })} />
                    </label>
                    <label className='templatebody'>Body
                        {isAdmin ?
                            <textarea value={editorState} spellCheck onChange={(e: any) => { setCanSave(true); setEditorState(e.target.value) }} />
                            :
                            <p className='templatetext'>{editorState}</p>
                        }
                    </label>
                </div>
            }
        </>
    )
}
