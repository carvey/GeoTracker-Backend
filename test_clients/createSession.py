import time

from MeteorClient import MeteorClient

client = MeteorClient('ws://127.0.0.1:3000/websocket', debug=True)
client.connect()

client.subscribe('SessionsList')
name = time.strftime("%I:%M:%S")
time.sleep(1)

client.insert('Sessions', {'title': name})
time.sleep(1)

# confirm that a publication was started based on the session name passed in
client.subscribe(name)
time.sleep(1)
