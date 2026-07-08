import URL from "url"
// תרגיל 1
function extractId(url){
    const parts = url.split("/")
    return parts[2]
}
console.log(extractId("/users/42"))

// תרגיל 2
function parseQuery(url){
    const qs = url.split("?")[1] || ""
    const pairs = qs.split("&")
    const query = {}
    for (const pair of pairs){
        const [key,value] = pair.split("=")
        query[key] = value

    }
    return query
    
}

console.log(parseQuery("/users?role=admin&page=2"))

// תרגיל 3
function getQueryParams(rawUrl){
    const parsed = new URL(rawUrl,"http://localhost")
    

}
