
// ROS setup
function init() {

  // Updated X, Y, and Z values from Odometry
  var x;
  var y;
  var z;

  var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
  });
    
  var odomCapClient = new ROSLIB.ActionClient({
    ros : ros,
    serverName : '/odom_capture',
    actionName : 'ros_gui_server/OdomCaptureAction'
  });

  var odomsub = new ROSLIB.Topic({
    ros : ros,
    name : '/odometry/filtered',
    messageType : 'nav_msgs/Odometry'
  });

  var viewer = new ROS3D.Viewer({
    divID : 'markers',
    displayPanAndZoomFrame : false,
    width : '1280',
    height : '720',
    antialias : true,
    background : '#949699'
  });

  // Add a grid.
  viewer.addObject(new ROS3D.Grid({num_cells : 30}));

  var tfClient = new ROSLIB.TFClient({
    ros : ros,
    fixedFrame : '/odom',
    angularThres : 0.01,
    transThres : 0.01
  });

  var odometry = new ROS3D.Odometry({
    ros: ros,
    topic: '/odometry/filtered',
    tfClient: tfClient,
    rootObject: viewer.scene,
    color: 0xe62222,
    keep: 5
  });

  var urdfClient = new ROS3D.UrdfClient({
    ros : ros,
    tfClient : tfClient,
    path : 'http://127.0.1.1/',
    frameID : '/base_link',
    rootObject : viewer.scene,
    loader : ROS3D.COLLADA_LOADER_2
  });

  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });
    
  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });
    
  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });

  // odomsub Callback handler
  odomsub.subscribe(function(message) {
    x = message.pose.pose.position.x;
    y = message.pose.pose.position.y;
    z = message.pose.pose.position.z;
    document.getElementById("captureTextX").innerHTML = "X: " + x.toFixed(9);
    document.getElementById("captureTextY").innerHTML = "Y: " + y.toFixed(9);
    document.getElementById("captureTextZ").innerHTML = "Z: " + z.toFixed(9);
  });

  // Reconnect Handler
  document.getElementById("connectButton").onclick = function(){

    ros.connect(document.getElementById("url-box").value);

  }

  // Capture Handler
  document.getElementById("captureButton").onclick = function(){

    var goal = new ROSLIB.Goal({
      actionClient : odomCapClient,
      goalMessage : {
        samples : 1
      }
    });
    
    goal.on('feedback', function(feedback) {
      console.log('Feedback: ' + feedback.percent_complete);
    });
    
    goal.on('result', function(result) {
      console.log('Final Result: ' + result.exit_status);
    });

    goal.on('status', function(status) {
      console.log('Status: ' + status.status)
    });

    goal.send()

    // Setting up markers
  }

}