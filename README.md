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
