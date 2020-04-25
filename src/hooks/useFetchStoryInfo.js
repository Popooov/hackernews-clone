import React from 'react'
import { fetchItem, getUserItems } from '../utils/api'

export default function useFetchStoryrInfo(item) {
    const [ story, setStory ] = React.useState([])
    const [ comments, setComments ] = React.useState([])
    const [ commentsLoading, setCommentsLoading ] = React.useState(false)
    const [ isLoading, setIsLoading ] = React.useState(false)
    const [ isError, setIsError ] = React.useState(false)

    React.useEffect(() => {

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