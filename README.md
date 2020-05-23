# ROS GUI Client

The ROS GUI Client package is the component of the ROS GUI system which runs on the target client. It includes the complete
webspage for accessing the capabilities of the ros_gui_server package such as rviz visualizations, waypoint navigation, general
telemetry, and much more.

## Configuration

The contents of this package are configured while setting up the ros_gui_server, for a description and configration instructions,
please refer to the UGA-BSAIL/ros_gui_server repository.

## Usage

Using the ros_gui_client is fairly simple, assuming you've configured the server side accordingly. First, make sure you're connected
on the same local network (router) as the target ROS system, then open a web browser tab and type http://robotip/gui 
where 'robotip' is the IP address of the target ROS system. If you're running ROS on the same machine you wish to use
the client, simply enter http://localhost/gui.

The above instructions should bring up the ROS GUI webpage, at which point you'll need to enter the IP of the robot and press 'connect'. 
After that, you'll need to select the Odometry topic you want the client to use, and press 'select Odometry', at which point, you'll be
ready to go!

#### Capture Position

The capture position button records the latest /nav_msgs/Odometry message and stores it as well as a visualization_msgs/Point
message for serving the rviz markers. The captured Odometry messages are used while executing /move_base/ actions.

#### Move to Markers

The move to markers button starts the execution loop for using the /move_base/ command to move the robot to a desired PoseStamped position. It reads from an array of the currently captured nav_msgs/Odometry messages and creates/sends a /move_base/ goal for each one, waiting for the current goal to be completed before executing the next one.

#### Clear Markers

This button simply clears the nav_msgs/Odometry array, the visialization_msgs/Point array, and publishes those changes to the client, clearing the markers from the visualization window.
