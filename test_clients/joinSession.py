import time

from MeteorClient import MeteorClient

client = MeteorClient('ws://127.0.0.1:3000/websocket', debug=True)
client.connect()

client.subscribe('SessionsList')

time.sleep(1)

sessions = client.find('sessions')
session_to_join = sessions[0]

client.subscribe(session_to_join['title']) # GPS data should follow this
time.sleep(1)
