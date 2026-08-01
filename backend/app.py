from flask import Flask, jsonify
import sqlite3

app =  Flask(__name__)

conn = sqlite3.connect("verto.db")
conn.row_factory = sqlite3.Row
conn.execute("PRAGMA foreign_keys = ON")
cursor = conn.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT, created_at DATETIME)") #db for users
cursor.execute("CREATE TABLE IF NOT EXISTS routes (id INTEGER PRIMARY KEY, name TEXT, map_data JSON, created_by INTEGER, FOREIGN KEY (created_by) REFERENCES users(id))") #db for routes
cursor.execute("CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY, user_id INTEGER, route_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (route_id) REFERENCES routes(id))") #db for favorites
cursor.execute("CREATE TABLE IF NOT EXISTS challenges (id INTEGER PRIMARY KEY, from_user_id INTEGER, to_user_id INTEGER, route_id INTEGER, status TEXT, FOREIGN KEY (from_user_id) REFERENCES users(id), FOREIGN KEY (to_user_id) REFERENCES users(id), FOREIGN KEY (route_id) REFERENCES routes(id))") #db for challenges
cursor.execute("CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY, user_id INTEGER, title TEXT, type TEXT, distance FLOAT, duration INTEGER, route_id INTEGER, created_at DATETIME, FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (route_id) REFERENCES route(id))") #db for workouts


conn.commit()
conn.close()

### all tables created 

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Flask API!"})



if __name__ == '__main__':
    app.run(debug=True)