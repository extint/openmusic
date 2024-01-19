import cv2
import mediapipe as mp
import math
from utils import CvFpsCalc
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_hands = mp.solutions.hands
import argparse

def alter_music_volume(tip_distance):
  if( int(0.362318841*(abs(tip_distance)-14))>100):
    return 100
#   if( int(0.362318841*(tip_distance-14))<0):
#     return 0
  return int(0.362318841*abs(abs(tip_distance)-14))

def get_args():
    parser = argparse.ArgumentParser()

    parser.add_argument("--device", type=int, default=0)
    parser.add_argument("--width", help='cap width', type=int, default=960)
    parser.add_argument("--height", help='cap height', type=int, default=540)

    parser.add_argument("--max_num_faces", type=int, default=1)
    parser.add_argument("--min_detection_confidence",
                        help='min_detection_confidence',
                        type=float,
                        default=0.7)
    parser.add_argument("--min_tracking_confidence",
                        help='min_tracking_confidence',
                        type=int,
                        default=0.7)

    args = parser.parse_args()

    return args

args = get_args()
cvFpsCalc = CvFpsCalc(buffer_len=10)
cap_device = args.device
# For webcam input:
cap = cv2.VideoCapture(cap_device)
with mp_hands.Hands(
    model_complexity=0,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5) as hands:
  while cap.isOpened():
    success, image = cap.read()
    if not success:
      print("Ignoring empty camera frame.")
      # If loading a video, use 'break' instead of 'continue'.
      continue
    
    # To improve performance, optionally mark the image as not writeable to
    # pass by reference.
    display_fps = cvFpsCalc.get()

    image.flags.writeable = False
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = hands.process(image)
    # 480 heightt
    # 640 width
    image_height,image_width=image.shape[0],image.shape[1]
    # Draw the hand annotations on the image.
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    music_volume=0

    if results.multi_hand_landmarks:
      for hand_landmarks in results.multi_hand_landmarks:
      #   print(hand_landmarks)
      #   print(
      #     f'Index finger tip coordinates: (',
      #     f'{hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].x}, '
      #     f'{hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].y})'
      #   ) 
        thumb=[hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP].x*image.shape[0],hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP].y*image.shape[1]]
        index_finger=[hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].x*image.shape[0],hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].y*image.shape[1]]
        tip_distance=math.dist(thumb,index_finger)
        curr_volume=alter_music_volume(tip_distance)
        # for i in range(4):
        #   thumb_indexfinger_distance_list.append(thumb_indexfinger_distance) 
          
        thumb_indexfinger_distance=int(hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP].y*image.shape[1]-hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].y*image.shape[1])
        print("Volume: ",curr_volume)

        

    # Flip the image horizontally for a selfie-view display.
    cv2.imshow('MediaPipe Hands', cv2.flip(image, 1))
        
    if cv2.waitKey(5) & 0xFF == 27:
      break
cap.release()

# mp_drawing.draw_landmarks(
        #     image,
        #     hand_landmarks,
        #     mp_hands.HAND_CONNECTIONS,
        #     mp_drawing_styles.get_default_hand_landmarks_style(),
        #     mp_drawing_styles.get_default_hand_connections_style())   

#   WRIST = 0
#   THUMB_CMC = 1
#   THUMB_MCP = 2
#   THUMB_IP = 3
#   THUMB_TIP = 4
#   INDEX_FINGER_MCP = 5
#   INDEX_FINGER_PIP = 6
#   INDEX_FINGER_DIP = 7
#   INDEX_FINGER_TIP = 8
#   MIDDLE_FINGER_MCP = 9
#   MIDDLE_FINGER_PIP = 10
#   MIDDLE_FINGER_DIP = 11
#   MIDDLE_FINGER_TIP = 12
#   RING_FINGER_MCP = 13
#   RING_FINGER_PIP = 14
#   RING_FINGER_DIP = 15
#   RING_FINGER_TIP = 16
#   PINKY_MCP = 17
#   PINKY_PIP = 18
#   PINKY_DIP = 19
#   PINKY_TIP = 20