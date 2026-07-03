function getVideo(){
    return document.querySelector("video")
}

function lockScreen(){
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
        const channelName=document.querySelector("#channel-name")
        if(channelName && channelName.textContent.includes(message.channel_name)){
            if(video) video.pause()
        }
    }
    else if(message.action==="unblock_channel"){
        if(video) video.play()
    }
})

setInterval(function(){
    const status = getVideoStatus()
    chrome.runtime.sendMessage({
        type: "video_status",
        data: status
    })
}, 5000)