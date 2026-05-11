import sqlite3
def get_db():
    conn=sqlite3.connect("youtube_controller.db")
    conn.row_factory=sqlite3.Row
    return conn
def init_db():
    conn=get_db()
    conn.execute("""
                 CREATE TABLE IF NOT EXISTS watch_history(
                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                 video_title TEXT,
                 channel_name TEXT,
                 watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                 )
                 """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS block_list(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            channel_name TEXT UNIQUE
        )
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS time_limits(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            daily_limit INTEGER DEFAULT 60
        )
    """)
    conn.commit()
    conn.close()
def add_to_blocklist(channel_name):
    conn=get_db()
    conn.execute("INSERT OR IGNORE INTO block_list (channel_name) VALUES (?)", 
                 [channel_name])
    conn.commit()
    conn.close()
def remove_from_blocklist(channel_name):
    conn=get_db()
    conn.execute("DELETE FROM block_list WHERE channel_name=?", 
                 [channel_name])
    conn.commit()
    conn.close()    
def get_blocklist():
    conn = get_db()
    channels = conn.execute("SELECT * FROM block_list").fetchall()
    conn.close()
    return channels
def add_watch_history(video_title, channel_name):
    conn = get_db()
    conn.execute("INSERT INTO watch_history (video_title, channel_name) VALUES (?,?)",
                 [video_title, channel_name])
    conn.commit()
    conn.close()
def get_watch_history():
    conn = get_db()
    history = conn.execute("SELECT * FROM watch_history ORDER BY watched_at DESC LIMIT 50").fetchall()
    conn.close()
    return history    
def set_time_limit(minutes):
    conn = get_db()
    conn.execute("DELETE FROM time_limits")
    conn.execute("INSERT INTO time_limits (daily_limit) VALUES (?)",
                 [minutes])
    conn.commit()
    conn.close()

def get_time_limit():
    conn = get_db()
    limit = conn.execute("SELECT * FROM time_limits LIMIT 1").fetchone()
    conn.close()
    return limit["daily_limit"] if limit else 60

