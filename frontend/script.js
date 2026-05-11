const socket = io("http://localhost:5000", {
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
    }
}

function unblockChannel(){
    const channelName = document.getElementById("channelInput").value
    if(channelName){
        socket.emit("unblock_channel", {channel_name: channelName})
        console.log("Unblocked: " + channelName)
    }
}