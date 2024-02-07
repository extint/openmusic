from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
import base64
import helper
import time
import main_help

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# CHANGE LINE 30 AND 31 IN CASE OF DISCREPANCY, LINE 96,97

@app.websocket('/gazecontrol')  
async def get_gesture(ws: WebSocket):
    await ws.accept()
    # data = await ws.receive()
    # print(data)
    print("connection established")
    # args = helper.get_args()

    max_num_faces = 1
    min_detection_confidence = 0.7
    min_tracking_confidence = 0.7

    face_mesh = helper.FaceMesh(
        max_num_faces,
        min_detection_confidence,
        min_tracking_confidence,
    )
    iris_detector = helper.IrisLandmark()

    flag=0
    curr_volume=0
    song_command=""


    with helper.mp_hands.Hands(
    model_complexity=1,
    min_detection_confidence=0.4,
    min_tracking_confidence=0.2) as hands:
    
        while True:
            data = await ws.receive()
            print("data received")
            # count+=1
            if data['text'] != 'null':
                face_bytes = bytes(str(data['text']), 'utf-8')
                face_bytes = face_bytes[face_bytes.find(b'/9'):]
                face_img = base64.b64decode(face_bytes)
                np_img = np.frombuffer(face_img, np.uint8)
                image = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

                image = helper.cv.flip(image, 1) # mirror display
                debug_image = helper.copy.deepcopy(image)
                # Detection #
                face_results = face_mesh(image)
                if(len(face_results)==0):
                    flag=1
                    # count=0

                for face_result in face_results:
                    # Calculate bounding box around eyes
                    # count+=1
                    # print(count)  
                    # if(flag==1 and len(face_result)==468 and count==12):
                    if(len(face_result)==468):
                        
                    # this function interacts with facemesh.py
                        left_eye, right_eye = face_mesh.calc_around_eye_bbox(face_result)
                    
                    # baai_aakh,daai_aakh=face_mesh.get_eyes(face_result)

                    # Iris detection
                        left_iris, right_iris = helper.detect_iris(image, iris_detector, left_eye,
                                                        right_eye)

                    # Calculate the circumcircle of the iris
                        left_center, left_radius = helper.calc_min_enc_losingCircle(left_iris)
                        right_center, right_radius = helper.calc_min_enc_losingCircle(right_iris)
                        
                        if abs(left_center[0]-face_result[33][0])-abs(left_center[0]-face_result[173][0])>7:
                            song_command="NEXT SONG"
                        elif abs(left_center[0]-face_result[33][0])-abs(left_center[0]-face_result[173][0])<=-4:
                            song_command="PREVIOUS SONG"
                        # else:
                        #     song_command="PLAY/ PAUSE"
                        print(song_command)
                        flag=0
                        
                results = hands.process(image)
                if results.multi_hand_landmarks:
                    for hand_landmarks in results.multi_hand_landmarks:
                        thumb=(hand_landmarks.landmark[helper.mp_hands.HandLandmark.THUMB_TIP].x*image.shape[0],hand_landmarks.landmark[helper.mp_hands.HandLandmark.THUMB_TIP].y*image.shape[1])
                        index_finger=(hand_landmarks.landmark[helper.mp_hands.HandLandmark.INDEX_FINGER_TIP].x*image.shape[0],hand_landmarks.landmark[helper.mp_hands.HandLandmark.INDEX_FINGER_TIP].y*image.shape[1])
                        tip_distance=helper.math.dist(thumb,index_finger)
                        curr_volume = helper.alter_music_volume(tip_distance)
                        if curr_volume!=0:
                            main_help.lst_vol=curr_volume
                        print("volume: ",curr_volume)
                        
                else:
                    curr_volume=main_help.lst_vol

            else:
                continue

            
            obj = {'curr_volume': str(curr_volume), 'song_command': str(song_command)}
            await ws.send_json(obj)
            
            # ws.close()

# @app.on_event('shutdown')
