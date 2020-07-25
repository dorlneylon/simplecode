import os
from app.app_config import HOST, PORT, DEBUG, THREADED
from app import app, db, init_routes

if __name__ == "__main__":
    try:
        db.create_all()
    except:
        pass
    init_routes()
    os.system('cls')
    app.run(
        host=HOST,
        debug=DEBUG,
        port=PORT,
        threaded=THREADED
    )