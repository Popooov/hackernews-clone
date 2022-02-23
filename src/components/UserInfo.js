import queryString from 'query-string'
import useFetchUser from '../hooks/useFetchUser'
import Loading from './Loading'
import Story from './Story'
import { useLocation } from "react-router-dom"
import { timeConverter } from '../utils/api'

export default function UserInfo() {

    const { id } = queryString.parse(useLocation().search)
    const { user, userStories, isLoading, storiesLoading, isError } = useFetchUser(id)
    const { about, created, karma } = user
    const date = timeConverter(created)

    if(isError) return <p className='error'>Error</p>
    if(isLoading) return <Loading text='Fetching User'/>

    return (
        <div>
            <Story
                id={id}
                date={date}
                karma={karma}
                about={about}
            />
            <div>
                <h2>Posts</h2>

                {
                    storiesLoading ? <Loading text='Fetching Stories' />
                 : 
                    (userStories.length === 0 
                        && 
                    <p style={{textAlign: 'center', fontSize: '1.5em'}}>
                        This user hasn't posted yet
                    </p>)
                 }

                <ul>
                    {userStories.map(({ url, by, id, time, title, type, descendants }) => {

                        const date = timeConverter(time)

                        return (
                            <li key={id}>
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
            </div>
        </div>
    )
}