const SERVER_URL = "https://youtube-controller.onrender.com"

const socket = io(SERVER_URL, {
    transports: ["websocket"]
})

socket.on("connect", function(){
    document.getElementById("status").innerHTML = "🟢 Connected"
    document.getElementById("status").style.color = "green"
})

socket.on("disconnect", function(){
    document.getElementById("status").innerHTML = "⚫ Disconnected"
    document.getElementById("status").style.color = "white"
})

function sendCommand(action){
    socket.emit(action, {action: action})
    console.log("Command sent: " + action)
}

function blockChannel(){
    const channelName = document.getElementById("channelInput").value
    if(channelName){
        socket.emit("block_channel", {channel_name: channelName})
        console.log("Blocked: " + channelName)
        // Optimistically refresh the list shortly after
        setTimeout(loadBlockedList, 500)
    }
}

function unblockChannel(){
    const channelName = document.getElementById("channelInput").value
    if(channelName){
        socket.emit("unblock_channel", {channel_name: channelName})
        console.log("Unblocked: " + channelName)
        setTimeout(loadBlockedList, 500)
    }
}

// ---- Now Playing (live updates via socket) ----

socket.on("now_playing", function(data){
    document.getElementById("nowPlayingTitle").innerText = data.title || "Unknown"
    document.getElementById("nowPlayingChannel").innerText = data.channel
        ? "Channel: " + data.channel
        : ""
})

// ---- Blocked Channels list (fetched from backend) ----

function loadBlockedList(){
    fetch(SERVER_URL + "/blocklist")
        .then(function(res){ return res.json() })
        .then(function(channels){
            const list = document.getElementById("blockedList")
            list.innerHTML = ""
            if(channels.length === 0){
                list.innerHTML = "<li style='opacity:0.6;'>No channels blocked</li>"
                return
            }
            channels.forEach(function(c){
                const li = document.createElement("li")
                li.textContent = c.channel_name
                list.appendChild(li)
            })
        })
        .catch(function(err){
            console.log("Failed to load blocklist:", err)
        })
}

// ---- Watch History list (fetched from backend) ----

function loadHistory(){
    fetch(SERVER_URL + "/history")
        .then(function(res){ return res.json() })
        .then(function(history){
            const list = document.getElementById("historyList")
            list.innerHTML = ""
            if(history.length === 0){
                list.innerHTML = "<li style='opacity:0.6;'>No history yet</li>"
                return
            }
            history.forEach(function(h){
                const li = document.createElement("li")
                li.textContent = h.video_title + " — " + h.channel_name + " (" + h.watched_at + ")"
                list.appendChild(li)
            })
        })
        .catch(function(err){
            console.log("Failed to load history:", err)
        })
}

// ---- Initial load + periodic refresh ----

loadBlockedList()
loadHistory()
setInterval(loadBlockedList, 15000)
setInterval(loadHistory, 15000)