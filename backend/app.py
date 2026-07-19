from flask import Flask, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
from database import init_db, add_to_blocklist, remove_from_blocklist, get_blocklist, add_watch_history, get_watch_history, set_time_limit, get_time_limit

app=Flask(__name__)
socketio=SocketIO(app, cors_allowed_origins="*", async_mode="gevent")
CORS(app)

init_db()

@app.route("/")
def home():
    return "Youtube Controller Server is Running!"

@app.route("/blocklist")
def get_blocklist_route():
    channels = get_blocklist()
    return jsonify([dict(c) for c in channels])

@app.route("/history")
def get_history_route():
    history = get_watch_history()
    return jsonify([dict(h) for h in history])

@app.route("/timelimit")
def get_timelimit_route():
    limit = get_time_limit()
    return jsonify({"daily_limit": limit})

@socketio.on("connect")
def handle_connect(data=None):
    print("A device connected!")

@socketio.on("mute")
def handle_mute(data=None):
    print("Mute command received!")
    socketio.emit("command", {"action": "mute"})

@socketio.on("unmute")
def handle_unmute(data=None):
    print("Unmute command received!")
    socketio.emit("command", {"action": "unmute"})

@socketio.on("pause")
def handle_pause(data=None):
    print("Pause command received!")
    socketio.emit("command", {"action": "pause"})

last_logged = {"title": None}

@socketio.on("video_status")
def handle_video_status(data):
    if data.get("isPlaying") and data.get("title") != last_logged["title"]:
        add_watch_history(data["title"], data["channel"])
        last_logged["title"] = data["title"]
    socketio.emit("now_playing", data)

@socketio.on("play")
def handle_play(data=None):
    print("Play command received!")
    socketio.emit("command", {"action": "play"})

@socketio.on("volume_up")
def handle_volume_up(data=None):
    print("Volume Up command received!")
    socketio.emit("command", {"action": "volume_up"})

@socketio.on("volume_down")
def handle_volume_down(data=None):
    print("Volume Down command received!")
    socketio.emit("command", {"action": "volume_down"})

@socketio.on("seek")
def handle_seek(data):
    print("Seek command received!")
    socketio.emit("command", {"action": "seek", "time": data["time"]})

@socketio.on("lock_youtube")
def handle_lock_youtube(data=None):
    print("Youtube locked successfully!")
    socketio.emit("command", {"action": "lock_youtube"})

@socketio.on("unlock_youtube")
def handle_unlock_youtube(data=None):
    print("Youtube unlocked successfully!")
    socketio.emit("command", {"action": "unlock_youtube"})

@socketio.on("block_channel")
def handle_block_channel(data):
    print("Channel blocked successfully!")
    add_to_blocklist(data["channel_name"])
    socketio.emit("command", {"action": "block_channel", "channel_name": data["channel_name"]})

@socketio.on("sync_blocklist")
def handle_sync_blocklist(data):
    channels = data.get("channels", [])
    from database import get_db
    conn = get_db()
    conn.execute("DELETE FROM block_list")
    for name in channels:
        conn.execute("INSERT OR IGNORE INTO block_list (channel_name) VALUES (?)", [name])
    conn.commit()
    conn.close()

@socketio.on("unblock_channel")
def handle_unblock_channel(data):
    print("Channel unblocked successfully!")
    remove_from_blocklist(data["channel_name"])
    socketio.emit("command", {"action": "unblock_channel", "channel_name": data["channel_name"]})

if __name__=="__main__":
    socketio.run(app, debug=True, port=5000)