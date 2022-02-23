const hackerNewsURI = `https://hacker-news.firebaseio.com/v0/`
const hackerNewsItems = `${hackerNewsURI}item/`
const hackerNewsUsers = `${hackerNewsURI}user/`
const pretty = '.json?print=pretty'

function fetchStories(stories) {
    return fetch(`${hackerNewsURI}${stories}${pretty}`)
}

// fetchItem can fetch Story or Comment
export async function fetchItem(item) {
    const res = await fetch(`${hackerNewsItems}${item}${pretty}`)
    const data = await res.json()

    return data
}

function fetchUser(user) {
    return fetch(`${hackerNewsUsers}${user}${pretty}`)
}

export async function getUserInfo(id) {

    const res = await fetchUser(id)
    const data = await res.json()
    const { submitted } = data
    let sliced = submitted.slice(0, 31)
    const stories = getUserItems(sliced)
    return { data, stories }
}

export async function getUserItems(userItems) {

    let fetched = userItems.map( async (i) => {
        const data = await fetchItem(i)
        return data
    })

    return Promise.all(fetched)
}

async function get50items(items) {
    let fetched = items.map( async (i) => {
        const data = await fetchItem(i)
        return data
    })
    
    return Promise.all(fetched)
}

export async function getItems(item) {

    const res = await fetchStories(item)
    const data = await res.json()
    const items = data.slice(0, 50)

    return get50items(items)
}

export function timeConverter(time) {
    
    const milliseconds = time * 1000
    const dateObject = new Date(milliseconds)
    const date = dateObject.toLocaleString("en-US", {timeZone: "UTC"})

    return date
}