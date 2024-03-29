import Story from './Story'
import useFetchStories from '../hooks/useFetchStories'
import Loading from './Loading'
import { timeConverter } from '../utils/api'

const Top = () => {

    const [ topStories, { isLoading, isError } ] = useFetchStories(`topstories`)
    
    if(isError) return <p className='error'>Error</p>
    if(isLoading) return <Loading />

    return (
        <ul>
            {topStories.map(({ url, by, id, time, title, type, descendants }) => {

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

export default Top