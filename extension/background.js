console.log("background.js is running!")
import io from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js"
const socket = io("https://youtube-controller.onrender.com", {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 3000
})

socket.on("command", function(data){
    chrome.tabs.query({url: "https://www.youtube.com/*"}, function(tabs){
        console.log("YouTube tabs found: " + tabs.length)
        tabs.forEach(function(tab){
            chrome.tabs.sendMessage(tab.id, data, function(response){
                if(chrome.runtime.lastError){
                    console.log("Tab error: " + chrome.runtime.lastError.message)
                }
            })
        })
    })
})

socket.on("connect", function(){
    console.log("Connected to Youtube Controller Server!")
})

socket.on("connect_error", function(error){
    console.log("Connection error: " + error)
})

socket.on("disconnect", function(){
    console.log("Disconnected from server!")
})

chrome.runtime.onMessage.addListener(function(message){
    if(message.type === "video_status"){
        socket.emit("video_status", message.data)
    }
    if(message.type === "sync_blocklist"){
        socket.emit("sync_blocklist", {channels: message.list})
    }
})