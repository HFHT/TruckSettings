
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { find_id } from "../helpers";
import { useState } from "react";

interface IuseDB {
    key: string
    mongoDB: string
    theDB: string
    _id?: string | null
    interval?: number
}
//useDb({key:'schedule', theDB: 'Schedule', _id: null, interval:4})
export function useDb({ key, mongoDB, theDB, _id = null, interval = 4 }: IuseDB) {
    const [isFetching, setIsFetching] = useState(false)
    const theKey = [key, mongoDB, theDB]
    _id && theKey.push(_id)
    const { data: retDB, refetch }: any = useQuery<any>({ queryKey: theKey, queryFn: fetchDB, refetchInterval: 1000 * 60 * interval, refetchOnWindowFocus: false })
    const queryClient = useQueryClient();

    const updateItems = useMutation<any, any, { item: any, mongoDB: string, db: string, insert: boolean }>(
        ({ item, mongoDB, db, insert }) => updateDB({ item, mongoDB, db, insert }),
        {
            onSuccess: (i: any) => {
                console.warn(i, i._id);
                queryClient.setQueryData([key, theDB, i._id], i);
                queryClient.invalidateQueries({ queryKey: [key] })
                setIsFetching(false)
            }
        }
    );

    function doMutation(newRecord: any, db: any, insert: boolean = false) {
        if (!newRecord) return
        setIsFetching(true)
        let rdx = find_id('_id', newRecord._id, db)
        if (rdx < 0) {
            newRecord && updateItems.mutate({ item: { ...newRecord }, mongoDB: mongoDB, db: theDB, insert: true });
        } else {
            newRecord && updateItems.mutate({ item: { ...newRecord }, mongoDB: mongoDB, db: theDB, insert: insert });
        }
    }

    function update(curRecord: any | undefined, insert = false) {
        setIsFetching(true)
        curRecord && updateItems.mutate({ item: { ...curRecord }, mongoDB: mongoDB, db: theDB, insert: insert });
        return
    }

    return [retDB, doMutation, update, isFetching, refetch] as const;
}

type Group = { id: number }
const baseURL = `${import.meta.env.VITE_MONGO_URL}`;

export async function fetchDB({ queryKey }: any): Promise<Group[]> {
    const [_key, mongoDB, db, _id] = queryKey;
    console.log(queryKey);
    let find = _id ? { _id: _id } : null;
    return (
        fetch(`${baseURL}?req=${encodeURIComponent(JSON.stringify({ method: 'find', db: mongoDB, collection: db, find: find }))}`, { method: "GET", headers: new Headers() })
            .then(response => {
                console.log(response);
                if (response.ok) return response.json()
                alert('Problem fetching scheduling data (fetchDB), try again later.')
                return null
            })
            .then(data => { return data })
            .catch(error => { console.log(error); /*alert(`Could not get the Schedule from the Database. `);*/ return [] })
    )
}
export async function updateDB({ item, insert, mongoDB, db }: any): Promise<Group> {
    console.warn('updateDB', item, insert, db);
    const header: any = { method: "POST", headers: new Headers() };
    let method = 'updateOne';
    let find: any = { _id: item._id }
    if (insert) {
        method = 'insertOne';
        find = {}
        //delete item._id;
    }

    header.body = JSON.stringify({ method: method, db: mongoDB, collection: db, data: { ...item }, find: find })

    return (
        fetch(`${import.meta.env.VITE_MONGO_URL}`, header)
            .then(response => response.json())
            .then(data => { return data })
            .catch(error => console.log(error))
        //  if (!(dbData.hasOwnProperty('acknowledged') && dbData.acknowledged)) {    
    )
}