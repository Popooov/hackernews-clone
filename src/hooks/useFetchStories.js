import React from 'react'
import { getItems } from '../utils/api'
import PropTypes from 'prop-types'

export default function useFetchStories(url) {

    const [stories, setStories] = React.useState([])
    const [ isLoading, setIsLoading ] = React.useState(false)
    const [ isError, setIsError ] = React.useState(false)

    React.useEffect(() => {
        
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