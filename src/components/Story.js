import { useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ThemeContext from '../contexts/theme'

export default function Story({ by, about, date, karma, descendants, id, storyID, url, title, type, text, comment, author }) {

    const theme = useContext(ThemeContext)

    return (
        <>
            {url && type === 'story' ?
                <div className={`story-info-${theme} story-info`}>
                    <a 
                        href={url} 
                        className={`title-link title-link-${theme}`} 
                        dangerouslySetInnerHTML={{__html: `<p>${title}</p>`}} 
                    />
                    <div className='user-data'>
                        <span>by </span> 
                            <Link className={`link-${theme}`} to={{
                                pathname: '/user',
                                search: `?id=${by}`
                            }}>
                                {by}
                            </Link>
                        <span> on {date} </span>
                        <span>with </span>
                            <Link className={`link-${theme}`} to={{
                                pathname:'/story',
                                search: `?id=${storyID}`
                            }}>
                                {descendants}
                            </Link>
                        <span> comments</span>
                    </div>
                </div>
                :
                (!karma && type !== 'comment' 
                    &&
                    <div className={`story-info-${theme} story-info`}>
                            <Link className={`link-${theme}`} to={{
                                pathname: '/story',
                                search: `?id=${storyID}`
                            }}>
                                <div 
                                    className={`title-link title-link-${theme}`}
                                    dangerouslySetInnerHTML={{__html: `<p>${title}</p>`}}
                                />
                            </Link>
                        <div className='user-data'>
                            <span>by </span> 
                                <Link className={`link-${theme}`} to={{
                                    pathname: '/user',
                                    search: `?id=${by}`
                                }}>
                                    {by}
                                </Link>
                            <span>{` on ${date} `}</span>
                            <span>with </span>
                                <Link className={`link-${theme}`} to={{
                                    pathname:'/story',
                                    search: `?id=${storyID}`
                                }}>
                                    {descendants === false ? '0' : descendants}
                                </Link>
                            <span> comments</span>
                        </div>
                        {text && <div className={`comment-text comment-text-${theme}`} dangerouslySetInnerHTML={{__html: `<p'>${text}</p>`}} />}
                    </div>
                )
            }

            {karma && (
                <div className='user-info'>
                    <h1 className='user-name'>{id}</h1>
                    <p className='user-data'>
                        <span>Joined <b>{date}</b></span>
                        <span> has <b>{karma}</b> karma</span>
                    </p>
                    {about && <div className='about' dangerouslySetInnerHTML={{__html: `<p>${about}</p>`}} />}
                </div>
            )}

            {type === 'comment' && (
                <div className={`comment comment-${theme}`}>
                    <p className='user-data'>
                        <span>by </span> 
                            <Link className={`comment-link-${theme}`} to={{
                                pathname: '/user',
                                search: `?id=${author}`
                            }}>
                                {author}
                            </Link>
                        <span>{` on ${date} `}</span>
                    </p>
                    <div className={`comment-text comment-text-${theme}`} dangerouslySetInnerHTML={{__html: `<p>${comment}</p>`}} />
                </div>
            )}
        </>
    )
}

Story.propTypes = {
    by: PropTypes.string,
    about: PropTypes.string,
    date: PropTypes.string,
    karma: PropTypes.number,
    descendants: PropTypes.number,
    id: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    storyID: PropTypes.any,
    type: PropTypes.string,
    text: PropTypes.string,
    comment: PropTypes.string,
    author: PropTypes.string
}