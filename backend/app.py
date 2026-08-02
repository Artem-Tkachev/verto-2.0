from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app =  Flask(__name__)
CORS(app)

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

@app.route('/registration', methods=['POST'])
def registration():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "username and password are required"}), 400

    conn = sqlite3.connect("verto.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute(f"SELECT * FROM users WHERE username = '{username}'")
    result = cursor.fetchone()

    if result is not None:
        conn.close()
        return jsonify({"error": "this user is already exist"}), 409

    
    cursor.execute(f"INSERT INTO users (username, password, created_at) VALUES ('{username}', '{password}', datetime('now')) ")
        
    conn.commit()
    conn.close()
    
    return jsonify({"message": "new user registerd"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
            return jsonify({"error": "username and password are required"}), 400
    
    conn = sqlite3.connect("verto.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute(f"SELECT * FROM users WHERE username = '{username}' ")
    result = cursor.fetchone()
    conn.close()

    if not result:
        return jsonify({"error": "this user is not exist"}), 409
    
    if result['password'] != password:
        return jsonify({"error": "incorrect password"}), 401
    
    return jsonify({"message": "user is logged in"}), 200
    

if __name__ == '__main__':
    app.run(debug=True)
