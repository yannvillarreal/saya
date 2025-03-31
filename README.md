# Quadruped Robot Controller

This project implements a quadruped robot controller using Dynamixel XL430-W250-T servos and an OpenRB-150 controller. The robot features 4 legs with 3 servos each, controlled using inverse kinematics and stabilized using an MPU-6050 sensor.

## Hardware Requirements
- 12x Dynamixel XL430-W250-T servos
- OpenRB-150 controller
- MPU-6050 6-axis Accelerometer Gyroscope Sensor
- Power supply suitable for the servos

## Project Structure
- `src/`
  - `main.cpp`: Main program entry point
  - `robot.h` and `robot.cpp`: Robot class implementation
  - `servo.h` and `servo.cpp`: Servo control class
  - `mpu6050.h` and `mpu6050.cpp`: MPU-6050 sensor interface
  - `gait.h` and `gait.cpp`: Walking gait implementation
  - `ik.h` and `ik.cpp`: Inverse kinematics calculations

## Dependencies
- DynamixelSDK
- Wire.h (for I2C communication with MPU-6050)
- MPU6050_light library

## Setup Instructions
1. Install the required libraries
2. Connect the servos to the OpenRB-150
3. Connect the MPU-6050 to the I2C pins
4. Upload the code to the OpenRB-150

## Usage
The robot implements a stable walking gait that prioritizes body stability using the MPU-6050 for orientation feedback. 