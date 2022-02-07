import React from 'react'
import PropTypes from 'prop-types'

const styles = {
    content: {
      fontSize: '1.25em',
      fontWeight: 'bold',
      position: 'absolute',
      left: '0',
      right: '0',
      marginTop: '5em',
      textAlign: 'center',
    }
}

Loading.propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number
}

export default function Loading({ text = 'Loading', speed = 300 }) {
    const [ content, setContent ] = React.useState(text)

    React.useEffect(() => {
        const id = window.setInterval(() => {
            setContent((content) => {
                return content === `${text}...` 
                    ? text
                    : `${content}.`
            })
        }, speed)

        return () => window.clearInterval(id)
    }, [text, speed])

    return (
        <p style={styles.content}>
            {content}
        </p>
    )
}

