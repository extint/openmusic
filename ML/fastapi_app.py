# fastapi_app.py

import uvicorn

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi.templating import Jinja2Templates
from helper import *

app = FastAPI()

# app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
   return templates.TemplateResponse('index.html', {"request": request})

def gen_frames():  
    # argument ######################################################################
    args = get_args()

    cap_device = args.device
    cap_width = args.width
    cap_height = args.height

    max_num_faces = args.max_num_faces
    min_detection_confidence = args.min_detection_confidence
    min_tracking_confidence = args.min_tracking_confidence

    # Camera preparation ################################################################
    cap = cv.VideoCapture(0)
    cap.set(cv.CAP_PROP_FRAME_WIDTH, cap_width)
    cap.set(cv.CAP_PROP_FRAME_HEIGHT, cap_height)

    # Model load ###############################################################
    face_mesh = FaceMesh(
        max_num_faces,
        min_detection_confidence,
        min_tracking_confidence,
    )
    iris_detector = IrisLandmark()

    # FPS Measurement Module ############################################### ##########
    cvFpsCalc = CvFpsCalc(buffer_len=10)

    count=0
    # left_center_list=[]
    # left_radius_list=[]
    flag=0
    with mp_hands.Hands(
    model_complexity=0,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5) as hands:
        a=" "
        while True:
            # if a!="NEXT SONG" or a!="PREVIOUS SONG" or a!="PLAY/ PAUSE":
            #     a=" "
            # count+=1
            display_fps = cvFpsCalc.get()

            # Camera capture ################################################ ######
            ret, image = cap.read()
            if not ret:
                break
            image = cv.flip(image, 1) # mirror display
            debug_image = copy.deepcopy(image)

            # Detection ################################################ ###############
            # Face Mesh detection
            face_results = face_mesh(image)
            if(len(face_results)==0):
                    flag=1
                    count=0
            # ************************

            for face_result in face_results:
                # Calculate bounding box around eyes
                count+=1
                if(flag==1 and len(face_result)==468 and count==int(0.5*display_fps)):
                    
                # this function interacts with facemesh.py
                    left_eye, right_eye = face_mesh.calc_around_eye_bbox(face_result)
                
                # baai_aakh,daai_aakh=face_mesh.get_eyes(face_result)

                # Iris detection
                    left_iris, right_iris = detect_iris(image, iris_detector, left_eye,
                                                    right_eye)

                # Calculate the circumcircle of the iris
                    left_center, left_radius = calc_min_enc_losingCircle(left_iris)
                    right_center, right_radius = calc_min_enc_losingCircle(right_iris)

                # debug drawing
                    debug_image = draw_debug_image(
                        debug_image,
                        left_iris,
                        right_iris,
                        left_center,
                        left_radius,
                        right_center,
                        right_radius,
                    )

                    
                    if abs(left_center[0]-face_result[33][0])-abs(left_center[0]-face_result[173][0])>7:
                        a="NEXT SONG"
                    elif abs(left_center[0]-face_result[33][0])-abs(left_center[0]-face_result[173][0])<=-4:
                        a="PREVIOUS SONG"
                    else:
                        a="PLAY/ PAUSE"
                        print(a)
                    flag=0
            cv.putText(debug_image, a, (15,50), cv.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), thickness=2)

            music_volume=0
            results = hands.process(image)
            if results.multi_hand_landmarks:
                for hand_landmarks in results.multi_hand_landmarks:
                    thumb=(hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP].x*image.shape[0],hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP].y*image.shape[1])
                    index_finger=(hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].x*image.shape[0],hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].y*image.shape[1])
                    tip_distance=math.dist(thumb,index_finger)
                    curr_volume=alter_music_volume(tip_distance)
                    print("volume: ",curr_volume)
                    cv.putText(debug_image, "VOL:"+str(curr_volume), (int(index_finger[0]),int(index_finger[1])), cv.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), thickness=2)
                    
            # Key processing (ESC: end) 
            
            ret1, buffer = cv.imencode('.jpg', debug_image)
            debug_image = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + debug_image + b'\r\n')


@app.get('/video_feed', response_class=HTMLResponse)
async def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return  StreamingResponse(gen_frames(),
                    media_type='multipart/x-mixed-replace; boundary=frame')


if __name__ == "__main__":
    print('stop: ctrl+c')
    uvicorn.run(app, host="0.0.0.0", port=8100)