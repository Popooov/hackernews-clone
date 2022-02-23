import { useState, useEffect } from 'react'
import { getItems } from '../utils/api'
import PropTypes from 'prop-types'

export default function useFetchStories(url) {

    const [stories, setStories] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isError, setIsError ] = useState(false)

    useEffect(() => {
        
        setIsError(false)
        setIsLoading(true)

        try {
            getItems(url).then((res) => {
                const stories = res.filter((s) => s && !s.deleted && !s.dead)
                setStories(stories)
                setIsLoading(false)
            })
        } catch (error) {
            setIsError(true)
        }
        
    }, [url])

    return [ stories, { isLoading, isError } ]
}

useFetchStories.propTypes = {
    story: PropTypes.string.isRequired
}