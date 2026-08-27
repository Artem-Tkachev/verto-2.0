from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import jwt
import datetime

SECRET_KEY = "123QWEASD"

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
cursor.execute("CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY, user_id INTEGER, title TEXT, type TEXT, distance FLOAT, duration INTEGER, route_id INTEGER, date DATETIME, created_at DATETIME, FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (route_id) REFERENCES route(id))") #db for workouts.
cursor.execute("CREATE TABLE IF NOT EXISTS follows (id INTEGER PRIMARY KEY, follower_id INTEGER, following_id INTEGER, created_at DATETIME, FOREIGN KEY (follower_id) REFERENCES users(id), FOREIGN KEY (following_id) REFERENCES users(id))")

conn.commit()
conn.close()

### all tables created 



@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Flask API!"})

@app.route('/api/register', methods=['POST'])
def registration():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    confPassword = data.get("confPassword")

    if not username or not password:
        return jsonify({"error": "Username and passwords are required", "fields": ["username", "password", "confPassword"]}), 400

    if password != confPassword:
        return jsonify({"error": "Passwords do not match", "fields": ["password", "confPassword"]}), 400

    conn = sqlite3.connect("verto.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute(f"SELECT * FROM users WHERE username = '{username}'")
    result = cursor.fetchone()

    if result is not None:
        conn.close()
        return jsonify({"error": "This user is already exist", "fields": ["username"]}), 409

    
    cursor.execute(f"INSERT INTO users (username, password, created_at) VALUES ('{username}', '{password}', datetime('now')) ")
        
    conn.commit()
    conn.close()
    
    return jsonify({"message": "New user registerd"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
            return jsonify({"error": "Username and password are required", "fields": ["username", "password"]}), 400
    
    conn = sqlite3.connect("verto.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute(f"SELECT * FROM users WHERE username = '{username}' ")
    result = cursor.fetchone()
    conn.close()

    if not result:
        return jsonify({"error": "This user is not exist", "fields": ["username"]}), 409
    
    if result['password'] != password:
        return jsonify({"error": "Incorrect password", "fields": ["password"]}), 401

    token = jwt.encode(
        {
            "user_id": result['id'],
            "exp": datetime.datetime.now(datetime.UTC) + datetime.timedelta(hours=3)
        },
        SECRET_KEY,
        algorithm="HS256"
    )
    
    return jsonify({"message": "User is logged in", "token": token}), 200

@app.route('/api/workouts', methods=['POST'])
def create_workout():
    data = request.get_json()
    title = data.get("workoutName")
    workout_type = data.get("workoutType")
    workout_date = data.get("workoutDate")
    distance = data.get("workoutDistance")
    duration = data.get("workoutDuration")
    distance_sql = "NULL" if distance is None else f"'{distance}'"
    #route_id = data.get("route_id")
    route_id = None

    #if not title or not workout_type 

    #todoo if Null return error

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({"error": "token is not provided"}), 401
    
    token = auth_header.split(" ")[1]

    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded["user_id"]
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "token is expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "token is invalid"}), 401
    
    
            
    conn = sqlite3.connect("verto.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute(f"INSERT INTO workouts (user_id, title, type, distance, duration, route_id, date, created_at) values ('{user_id}', '{title}', '{workout_type}', {distance_sql}, '{duration}', '{route_id}', '{workout_date}', datetime('now'))")

    conn.commit()
    conn.close()

    return jsonify({"message": "workout successfully uploaded"}), 200

@app.route('/api/workouts/mine')
def show_workouts():

    auth_header = request.headers.get("Authorization")
    
    if not auth_header:
        return jsonify({"error": "token is not provided"}), 401
    
    token = auth_header.split(" ")[1]

    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded["user_id"]
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "token is expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "token is invalid"}), 401

    conn = sqlite3.connect("verto.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute(f"SELECT * FROM workouts WHERE user_id = {user_id}")
    rows = cursor.fetchall()
    conn.close()

    workouts = [dict(row) for row in rows]
    return jsonify(workouts), 200


@app.route('/api/workouts/<int:workout_id>')
def workoutView():
    return

@app.route('/api/dashboard')
def dashboard():
    auth_header = request.headers.get("Authorization")
        
    if not auth_header:
        return jsonify({"error": "token is not provided"}), 401
    
    token = auth_header.split(" ")[1]

    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded["user_id"]
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "token is expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "token is invalid"}), 401

    conn = sqlite3.connect('verto.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute(f"SELECT * FROM users WHERE id={user_id}")
    result = cursor.fetchone()
    username = result['username']

    cursor.execute(f"SELECT * FROM workouts WHERE user_id={user_id}")
    rows = cursor.fetchall()
    conn.close()

    
    workouts = [dict(row) for row in rows]
    workouts_number = len(workouts)
    distance_number = sum(float(row["distance"] or 0) for row in workouts)


    return jsonify(workouts, username, workouts_number, distance_number), 200

if __name__ == '__main__':
    app.run(debug=True)
