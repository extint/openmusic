#!/usr/bin/env python
# -*- coding: utf-8 -*-
# CVFPSCALC IS OPTIONAL     
# LINE 163 to be commented

import copy
import argparse

import cv2 as cv
import numpy as np

from utils import CvFpsCalc
from face_mesh.face_mesh import FaceMesh
from iris_landmark.iris_landmark import IrisLandmark
import mediapipe as mp
import matplotlib.pyplot as plt
import itertools
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

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


def main():
    # argument ################################################ ######################
    args = get_args()

    cap_device = args.device
    cap_width = args.width
    cap_height = args.height

    max_num_faces = args.max_num_faces
    min_detection_confidence = args.min_detection_confidence
    min_tracking_confidence = args.min_tracking_confidence

    # Camera preparation ################################################ ################
    cap = cv.VideoCapture(cap_device)
    cap.set(cv.CAP_PROP_FRAME_WIDTH, cap_width)
    cap.set(cv.CAP_PROP_FRAME_HEIGHT, cap_height)

    # Model load ################################################ ###############
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
    while True:
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
        # flag=0
        # print(np.asarray(face_results).shape)
        # print(" ")
        # print(face_results)
        if(len(face_results)==0):
                flag=1
                count=0
        # *************************
    # !wget -q -O image.jpg https://storage.googleapis.com/mediapipe-tasks/hand_landmarker/woman_hands.jpg

    # # STEP 2: Create an HandLandmarker object.
    #         base_options = python.BaseOptions(model_asset_path='hand_landmarker.task')
    #         options = vision.HandLandmarkerOptions(base_options=base_options,
    #                                     num_hands=2)
    #         detector = vision.HandLandmarker.create_from_options(options)

    # # STEP 3: Load the input image.
    #         handframe = image
    #         # image= mp.
    # # STEP 4: Detect hand landmarks from the input image.
    #         detection_result = detector.detect(handframe)
    #         print(len(detection_result))
    # # STEP 5: Process the classification result. In this case, visualize it.
    #         # annotated_image = draw_landmarks_on_image(image.numpy_view(), detection_result)
    #         # cv2_imshow(cv2.cvtColor(annotated_image, cv2.COLOR_RGB2BGR))

        # *************************


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
                    print("right ")
                elif abs(left_center[0]-face_result[33][0])-abs(left_center[0]-face_result[173][0])<=-4:
                    print("left ")
                else:
                    print("open and centre")

                flag=0
            
        # Key processing (ESC: end) ############################################ #######
        key = cv.waitKey(1)
        if key == 27:  # ESC
            break

        # Screen reflection ################################################# ###############
        cv.imshow('Iris(tflite) Demo', debug_image)

    cap.release()
    cv.destroyAllWindows()

    return


def detect_iris(image, iris_detector, left_eye, right_eye):
    image_width, image_height = image.shape[1], image.shape[0]
    input_shape = iris_detector.get_input_shape()

    # left eye
    # Crop the image around the eyes
    left_eye_x1 = max(left_eye[0], 0)
    left_eye_y1 = max(left_eye[1], 0)
    left_eye_x2 = min(left_eye[2], image_width)
    left_eye_y2 = min(left_eye[3], image_height)
    left_eye_image = copy.deepcopy(image[left_eye_y1:left_eye_y2,
                                         left_eye_x1:left_eye_x2])
    # Iris detection
    eye_contour, iris = iris_detector(left_eye_image)
    # convert coordinates from relative to absolute
    left_iris = calc_iris_point(left_eye, eye_contour, iris, input_shape)

    # right eye
    # Crop the image around the eyes
    right_eye_x1 = max(right_eye[0], 0)
    right_eye_y1 = max(right_eye[1], 0)
    right_eye_x2 = min(right_eye[2], image_width)
    right_eye_y2 = min(right_eye[3], image_height)
    right_eye_image = copy.deepcopy(image[right_eye_y1:right_eye_y2,
                                          right_eye_x1:right_eye_x2])
    # Iris detection
    eye_contour, iris = iris_detector(right_eye_image)
    # convert coordinates from relative to absolute
    right_iris = calc_iris_point(right_eye, eye_contour, iris, input_shape)

    return left_iris, right_iris


def calc_iris_point(eye_bbox, eye_contour, iris, input_shape):
    iris_list = []
    for index in range(5):
        point_x = int(iris[index * 3] *
                      ((eye_bbox[2] - eye_bbox[0]) / input_shape[0]))
        point_y = int(iris[index * 3 + 1] *
                      ((eye_bbox[3] - eye_bbox[1]) / input_shape[1]))
        point_x += eye_bbox[0]
        point_y += eye_bbox[1]

        iris_list.append((point_x, point_y))

    return iris_list


def calc_min_enc_losingCircle(landmark_list):
    center, radius = cv.minEnclosingCircle(np.array(landmark_list))
    center = (int(center[0]), int(center[1]))
    # radius = float(radius)

    return center, round(radius,1)


def draw_debug_image(
    debug_image,
    left_iris,
    right_iris,
    left_center,
    left_radius,
    right_center,
    right_radius,
):
    # Rainbow: circumscribed yen
    cv.circle(debug_image, left_center, int(left_radius), (0, 255, 0), 2)
    cv.circle(debug_image, right_center, int(right_radius), (0, 255, 0), 2)

    # iris: landmark
    for point in left_iris:
        cv.circle(debug_image, (point[0], point[1]), 1, (0, 0, 255), 2)
    for point in right_iris:
        cv.circle(debug_image, (point[0], point[1]), 1, (0, 0, 255), 2)

    # iridescence: radius
    cv.putText(debug_image, 'r:' + str(left_radius) + 'px',
               (left_center[0] + int(left_radius * 1.5),
                left_center[1] + int(left_radius * 0.5)),
               cv.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 1)
    cv.putText(debug_image, 'r:' + str(right_radius) + 'px',
               (right_center[0] + int(right_radius * 1.5),
                right_center[1] + int(right_radius * 0.5)),
               cv.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 1)

    return debug_image


if __name__ == '__main__':
    main()
