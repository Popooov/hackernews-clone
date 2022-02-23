import useFetchStoryInfo from '../hooks/useFetchStoryInfo'
import queryString from 'query-string'
import { useLocation } from "react-router-dom"
import Loading from './Loading'
import Story from './Story'
import { timeConverter } from '../utils/api'

export default function StoryInfo() {

    const { id } = queryString.parse(useLocation().search)
    const { story, comments, isLoading, commentsLoading, isError } = useFetchStoryInfo(id)
    const { by, time, kids, text, type, descendants, url, title } = story
    const date = timeConverter(time)

    if(isError) return <p className='error'>Error</p>
    if(isLoading) return <Loading text='Fetching Story' />

    return (
        <div>
            {story && 
                <Story
                    by={by}
                    date={date}
                    storyID={id}
                    descendants={descendants}
                    text={text}
                    title={title}
                    url={url}
                    type={type}
                />
            }
            <div>
                {commentsLoading ?
                    <Loading text='Fetching Comments' />
                    : 
                    <ul>
                        {kids && comments.map(({ time, by, type, id, text }) => {
                            const date = timeConverter(time)
                            return (
                                <li key={id}>
                                    <Story
                                        author={by}
                                        date={date}
                                        comment={text}
                                        type={type}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                }
            </div>
        </div>
    )
}