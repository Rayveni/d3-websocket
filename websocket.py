import asyncio
import websockets
import json 
import time

# create handler for each connection
async def handler(websocket, path):
    data = await websocket.recv()
    await websocket.send(json.dumps({'time':1}))
    #while True: time.sleep(2)
 
start_server = websockets.serve(handler, "localhost", 8000)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()