import http from "http"
//תרגיל 1
// const server = http.createServer((request,responce) =>{
//     if(request.url ==="/morning"){
//         responce.end("good morning")
//     }
//     else if (request.url === "/Evening"){
//         responce.end("Good evening")
//     }

    
// })

// server.listen(3000,()=>{
//     console.log("Hello from my server")
// })
// תרגיל 2
// const server = http.createServer((request,responce) =>{
//     responce.setHeader("Content-Type","text/plain")
//     if (request.url === "/"){
//         responce.end("Home Page")
//     }
//     else if (request.url === "/about"){
//         responce.end("About Page")
//     }
//     else if (request.url === "/contanct"){
//         responce.end("contact Page")
//     }
//     else{
//         responce.statusCode = 404
//         responce.end("not found")
//     }
// })
// server.listen(3000,() =>{
//     console.log()
// })

// תרגיל 3
const server = http.createServer((request,responce) =>{
    if (request.url === "/users"){
        if (request.method === "GET"){
            responce.end("Users list")
        }
        else if (request.method === "POST"){
             responce.end("User created")
        }
    }
    else{
        responce.statusCode = 404
        responce.end("not found")
    }

    }
)

server.listen(3000,() =>{
    console.log("server starter")
})
