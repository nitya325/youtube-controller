function getVideo(){
    return document.querySelector("video")
}

function lockScreen(){
    if(document.getElementById("yt-lock-overlay")) return
    const overlay=document.createElement("div")
    overlay.id="yt-lock-overlay"
    overlay.style.position="fixed"
    overlay.style.top="0"
    overlay.style.left="0"
    overlay.style.width="100%"
    overlay.style.height="100%"
    overlay.style.backgroundColor="rgb(0, 0, 0)"
    overlay.style.zIndex="999999"
    overlay.innerHTML="<h1 style='color:white; text-align:center; margin-top:40vh;'>YouTube is locked</h1>"
    document.body.appendChild(overlay)
}

function blockScreen(channelName){
    if(document.getElementById("yt-block-overlay")) return
    const overlay=document.createElement("div")
    overlay.id="yt-block-overlay"
    overlay.style.position="fixed"
    overlay.style.top="0"
    overlay.style.left="0"
    overlay.style.width="100%"
    overlay.style.height="100%"
    overlay.style.backgroundColor="rgb(0, 0, 0)"
    overlay.style.zIndex="999999"
    overlay.innerHTML=`<h1 style='color:white; text-align:center; margin-top:40vh;'>This channel is blocked: ${channelName}</h1>`
    document.body.appendChild(overlay)
}

function removeBlockScreen(){
    const overlay=document.getElementById("yt-block-overlay")
    if(overlay) overlay.remove()
}

function getVideoStatus(){
    const video = getVideo()
    const title = document.querySelector("h1.ytd-watch-metadata yt-formatted-string")
    const channel = document.querySelector("#channel-name a")

    return {
        title: title ? title.textContent.trim() : "Unknown",
        channel: channel ? channel.textContent.trim() : "Unknown",
        isPlaying: video ? !video.paused : false,
        currentTime: video ? Math.floor(video.currentTime) : 0
    }
}

// ---- Persistent blocklist handling ----

function getBlockList(callback){
    chrome.storage.local.get(["blockedChannels"], function(result){
        callback(result.blockedChannels || [])
    })
}

function saveBlockList(list){
    chrome.storage.local.set({blockedChannels: list})
}

function addToBlockList(channelName){
    getBlockList(function(list){
        if(!list.includes(channelName)){
            list.push(channelName)
            saveBlockList(list)
        }
        enforceBlockCheck() // re-check immediately after blocking
    })
}

function removeFromBlockList(channelName){
    getBlockList(function(list){
        const updated = list.filter(name => name !== channelName)
        saveBlockList(updated)
        enforceBlockCheck() // re-check immediately after unblocking
    })
}

// ---- Core enforcement logic ----

function enforceBlockCheck(){
    const status = getVideoStatus()
    const video = getVideo()

    getBlockList(function(blockedChannels){
        const isBlocked = blockedChannels.some(function(name){
            return status.channel.includes(name)
        })

        if(isBlocked){
            if(video) video.pause()
            blockScreen(status.channel)
        } else {
            removeBlockScreen()
        }
    })
}

// ---- Message listener (commands from backend) ----

chrome.runtime.onMessage.addListener(function(message){
    const video = getVideo()

    if(message.action==="mute"){
        if(video) video.muted=true
    }
    else if(message.action==="unmute"){
        if(video) video.muted=false
    }
    else if(message.action==="pause"){
        if(video) video.pause()
    }
    else if(message.action==="play"){
        if(video) video.play()
    }
    else if(message.action==="volume_up"){
        if(video) video.volume = Math.min(1, video.volume + 0.1)
    }
    else if(message.action==="volume_down"){
        if(video) video.volume = Math.max(0, video.volume - 0.1)
    }
    else if(message.action==="seek"){
        if(video) video.currentTime=message.time
    }
    else if(message.action==="lock_youtube"){
        if(video) video.pause()
        lockScreen()
    }
    else if(message.action==="unlock_youtube"){
        const overlay=document.getElementById("yt-lock-overlay")
        if(overlay) overlay.remove()
        if(video) video.play()
    }
    else if(message.action==="block_channel"){
        addToBlockList(message.channel_name)
    }
    else if(message.action==="unblock_channel"){
        removeFromBlockList(message.channel_name)
    }
})

// ---- Periodic status report (existing) ----

setInterval(function(){
    const status = getVideoStatus()
    chrome.runtime.sendMessage({
        type: "video_status",
        data: status
    })
    enforceBlockCheck() // continuously enforce block on a timer too
}, 5000)

// ---- Catch YouTube's SPA navigation (video changes without full reload) ----

document.addEventListener("yt-navigate-finish", function(){
    // Small delay to let the new channel/title elements render
    setTimeout(enforceBlockCheck, 500)
})