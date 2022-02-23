import { useState, useEffect } from 'react'
import { fetchItem, getUserItems } from '../utils/api'

export default function useFetchStoryrInfo(item) {
    const [ story, setStory ] = useState([])
    const [ comments, setComments ] = useState([])
    const [ commentsLoading, setCommentsLoading ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isError, setIsError ] = useState(false)

    useEffect(() => {

        setIsError(false)
        setIsLoading(true)

        try {
            fetchItem(item).then((res) => {
                
                setStory(res)
                setIsLoading(false)

                setCommentsLoading(true)
                if(res.kids) {
                    getUserItems(res.kids).then((res) => {
                        const comments = res.filter((c) => c && c.type === 'comment' && !c.deleted && !c.dead)
                        setComments(comments)
                        setCommentsLoading(false)
                    })
                }
                else {
                    setCommentsLoading(false)
                }
            })
        } catch (error) {
            setIsError(true)
        }
    }, [item])

    return { story, comments, isLoading, commentsLoading, isError }
}