import useFetchStories from '../hooks/useFetchStories'
import Story from './Story'
import Loading from './Loading'
import { timeConverter } from '../utils/api'

const New = () =>  {

    const [ newStories, { isLoading, isError } ] = useFetchStories(`newstories`)

    if(isError) return <p className='error'>Error</p>
    if(isLoading) return <Loading />

    return (
        <ul>
            {newStories.map(({ url, by, id, time, title, type, descendants }) => {

                const date = timeConverter(time)
                
                return (
                    <li key={id} >
                            <Story
                                by={by}
                                date={date}
                                storyID={id}
                                descendants={descendants}
                                url={url}
                                title={title}
                                type={type}
                            />
                    </li>
                )
            })}
        </ul>
    )
}

export default New