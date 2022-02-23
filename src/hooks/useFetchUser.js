import { useState, useEffect } from 'react'
import { getUserInfo } from '../utils/api'
import PropTypes from 'prop-types'

export default function useFetchUser(userId) {

    const [ user, setUser ] = useState([])
    const [ userStories, setUserStories ] = useState([])
    const [ storiesLoading, setStoriesLoading ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isError, setIsError ] = useState(false)
    
    useEffect(() => {

        setIsError(false)
        setIsLoading(true)

        try {
            getUserInfo(userId).then(({ data, stories }) => {
                setUser(data)

                setStoriesLoading(true)

                stories.then((res) => {
                    const userStories = res.filter((s) => s && s.type === 'story' && !s.deleted && !s.dead)
                    setUserStories(userStories)
                    setStoriesLoading(false)
                })

                setIsLoading(false)
            })
        } catch (error) {
            setIsError(true)
        }
    }, [userId])

    return { user, userStories, isLoading, storiesLoading, isError }
}

useFetchUser.propTypes = {
    userId: PropTypes.string.isRequired
}