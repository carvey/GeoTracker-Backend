import time

from MeteorClient import MeteorClient

client = MeteorClient('ws://127.0.0.1:3000/websocket', debug=True)
client.connect()

client.subscribe('SessionsList')

time.sleep(1)

sessions = client.find('sessions')

for session in sessions:
    if session['title'] != "Test Session": # keep one around if we need
        client.remove('Sessions', {'_id': session['_id']})

time.sleep(2)

sessions = client.find('sessions')
print(sessions)
