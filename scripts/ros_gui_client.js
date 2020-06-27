// Updated X, Y, and Z values from Odometry, list of Odometry Topics, ros connection variable
var x;
var y;
var z;
var odomtopics = [];
var ip = 'localhost';
var odometrytopic = '/odometry/filtered';
var ros;
var odomCapClient;
var clearMarkersClient;
var moveToMarkersClient;
var odomsub;
var viewer;
var tfClient;
var odometry;
var urdfClient;
var markerClient;

// ROS setup
function init() {

  ros = new ROSLIB.Ros({
    url : 'ws://' + ip + ':9090'
  });

  updateOdomTopics();
  
  odomCapClient = new ROSLIB.ActionClient({
    ros : ros,
    serverName : '/ros_gui_server/odom_capture',
    actionName : 'ros_gui_server/OdomCaptureAction'
  });

  clearMarkersClient = new ROSLIB.ActionClient({
    ros : ros,
    serverName : '/ros_gui_server/odom_clear',
    actionName : 'ros_gui_server/OdomClearAction'
  });

  moveToMarkersClient = new ROSLIB.ActionClient({
    ros : ros,
    serverName : '/ros_gui_server/move_to_markers',
    actionName : 'ros_gui_server/MoveToMarkersAction'
  });

  odomsub = new ROSLIB.Topic({
    ros : ros,
    name : odometrytopic,
    messageType : 'nav_msgs/Odometry'
  });

  viewer = new ROS3D.Viewer({
    divID : 'markers',
    displayPanAndZoomFrame : false,
    width : '1280',
    height : '720',
    antialias : true,
    background : '#949699'
  });

  // Add a grid.
  viewer.addObject(new ROS3D.Grid({num_cells : 30}));

  tfClient = new ROSLIB.TFClient({
    ros : ros,
    fixedFrame : '/odom',
    angularThres : 0.01,
    transThres : 0.01
  });

  odometry = new ROS3D.Odometry({
    ros: ros,
    topic: odometrytopic,
    tfClient: tfClient,
    rootObject: viewer.scene,
    color: 0xe62222,
    keep: 5
  });

  urdfClient = new ROS3D.UrdfClient({
    ros : ros,
    tfClient : tfClient,
    path : 'http://' + ip + '/urdf',
    frameID : '/base_link',
    rootObject : viewer.scene,
    loader : ROS3D.COLLADA_LOADER_2
  });

  // Setup the marker client.
  markerClient = new ROS3D.MarkerClient({
    ros : ros,
    tfClient : tfClient,
    topic : '/ros_gui_server/marker_server',
    rootObject : viewer.scene
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

  // Reconnect Handler
  document.getElementById("connectButton").onclick = function(){

    ip = document.getElementById("url-box").value;

    // Severe ROS connection
    ros.close()

    // Reinitialize the GUI
    reinit()

  }

  // Odometry Topic Select Handler
  document.getElementById("selectOdometry").onclick = function(){
    
    var select = document.getElementById("odomtopics");
    var i = select.selectedindex;
    var selectedTopic = select.options.item(i).text;

    // Severe ROS connection
    odomCapClient.dispose();
    clearMarkersClient.dispose();
    moveToMarkersClient.dispose();
    odomsub.unsubscribe();
    odometry.unsubscribe();
    tfClient.dispose();
    ros.close()

    // Reinitialize the GUI
    reinit()


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

    goal.send()
  }

  // Clear Markers Handler
  document.getElementById("clearButton").onclick = function(){

    var goal = new ROSLIB.Goal({
      actionClient : clearMarkersClient,
      goalMessage : {
        delete : true
      }
    });
    
    goal.on('feedback', function(feedback) {
      console.log('Feedback: ' + feedback.percent_complete);
    });
    
    goal.on('result', function(result) {
      console.log('Final Result: ' + result.exit_status);
    });

    goal.send()
  }

  // Move to Markers Handler
  document.getElementById("moveButton").onclick = function(){

    var goal = new ROSLIB.Goal({
      actionClient : moveToMarkersClient,
      goalMessage : {
        move : true
      }
    });
    
    goal.on('feedback', function(feedback) {
      console.log('Feedback: ' + feedback.percent_complete);
    });
    
    goal.on('result', function(result) {
      console.log('Final Result: ' + result.exit_status);
    });

    goal.send()
  }

  // odomsub Callback handler
  odomsub.subscribe(function(message) {
    x = message.pose.pose.position.x;
    y = message.pose.pose.position.y;
    z = message.pose.pose.position.z;
    document.getElementById("captureTextX").innerHTML = "X: " + x.toFixed(9);
    document.getElementById("captureTextY").innerHTML = "Y: " + y.toFixed(9);
    document.getElementById("captureTextZ").innerHTML = "Z: " + z.toFixed(9);
  });
}

// ROS setup
function reinit() {

  ros = new ROSLIB.Ros({
    url : 'ws://' + ip + ':9090'
  });

  updateOdomTopics();
  
  odomCapClient = new ROSLIB.ActionClient({
    ros : ros,
    serverName : '/ros_gui_server/odom_capture',
    actionName : 'ros_gui_server/OdomCaptureAction'
  });

  clearMarkersClient = new ROSLIB.ActionClient({
    ros : ros,
    serverName : '/ros_gui_server/odom_clear',
    actionName : 'ros_gui_server/OdomClearAction'
  });

  moveToMarkersClient = new ROSLIB.ActionClient({
    ros : ros,
    serverName : '/ros_gui_server/move_to_markers',
    actionName : 'ros_gui_server/MoveToMarkersAction'
  });

  odomsub = new ROSLIB.Topic({
    ros : ros,
    name : odometrytopic,
    messageType : 'nav_msgs/Odometry'
  });

  // Add a grid.
  viewer.addObject(new ROS3D.Grid({num_cells : 30}));

  tfClient = new ROSLIB.TFClient({
    ros : ros,
    fixedFrame : '/odom',
    angularThres : 0.01,
    transThres : 0.01
  });

  odometry = new ROS3D.Odometry({
    ros: ros,
    topic: odometrytopic,
    tfClient: tfClient,
    rootObject: viewer.scene,
    color: 0xe62222,
    keep: 5
  });

  urdfClient = new ROS3D.UrdfClient({
    ros : ros,
    tfClient : tfClient,
    path : 'http://' + ip + '/urdf',
    frameID : '/base_link',
    rootObject : viewer.scene,
    loader : ROS3D.COLLADA_LOADER_2
  });

  // Setup the marker client.
  markerClient = new ROS3D.MarkerClient({
    ros : ros,
    tfClient : tfClient,
    topic : '/ros_gui_server/marker_server',
    rootObject : viewer.scene
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
}

// updates the Odometry Topic drop-down list
function updateOdomTopics()
{
  var i;

  // Update Odometry Topic list
  ros.getTopicsForType('nav_msgs/Odometry', function(topics) {
      
    odomtopics = Object.values(topics);

    console.log('Returned Odometry Topics: ' + odomtopics);

    var select = document.getElementById("odomtopics");

    // Add the new elements
    for (i = 0; i < odomtopics.length; i++)
    {
      var addtopic = document.createElement("option");

      addtopic.text = odomtopics[i];
      addtopic.value = odomtopics[i];
    
        select.options.add(addtopic, i);
    }

  });
  
}