const hackerNewsURI = `https://hacker-news.firebaseio.com/v0/`
const hackerNewsItems = `${hackerNewsURI}item/`
const hackerNewsUsers = `${hackerNewsURI}user/`
const pretty = '.json?print=pretty'

const fetchStories = (stories) => fetch(`${hackerNewsURI}${stories}${pretty}`)

// fetchItem can fetch Story or Comment
export const fetchItem = async (item) => {
    const res = await fetch(`${hackerNewsItems}${item}${pretty}`)
    const data = await res.json()

    return data
}

const fetchUser = (user) => fetch(`${hackerNewsUsers}${user}${pretty}`)

export const getUserInfo = async (id) => {
    const res = await fetchUser(id)
    const data = await res.json()
    const { submitted } = data
    let sliced = submitted.slice(0, 31)
    const stories = getUserItems(sliced)
    return { data, stories }
}

export const getUserItems = async (userItems) => {
    let fetched = userItems.map( async (i) => {
        const data = await fetchItem(i)
        return data
    })

    return Promise.all(fetched)
}

const get50items = async (items) => {
    let fetched = items.map( async (i) => {
        const data = await fetchItem(i)
        return data
    })
    
    return Promise.all(fetched)
}

export const getItems = async (item) => {
    const res = await fetchStories(item)
    const data = await res.json()
    const items = data.slice(0, 50)

    return get50items(items)
}

export const timeConverter = (time) => {
    const milliseconds = time * 1000
    const dateObject = new Date(milliseconds)
    const date = dateObject.toLocaleString("en-US", {timeZone: "UTC"})

    return date
}