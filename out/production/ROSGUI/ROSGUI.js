if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'ROSGUI'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'ROSGUI'.");
}var ROSGUI = function (_, Kotlin) {
  'use strict';
  var to = Kotlin.kotlin.to_ujzrz7$;
  var json = Kotlin.kotlin.js.json_pyyo18$;
  var ROSLIB$Ros = ROSLIB.Ros;
  var ROS3D$Viewer = ROS3D.Viewer;
  var ROSLIB$TFClient = ROSLIB.TFClient;
  var ROS3D$InteractiveMarkerClient = ROS3D.InteractiveMarkerClient;
  var Unit = Kotlin.kotlin.Unit;
  function init(args) {
    var tmp$, tmp$_0;
    var ros = new ROSLIB$Ros(json([to('url', 'ws://rosbox.local:9090')]));
    var viewer = new ROS3D$Viewer(json([to('divID', 'markers'), to('width', 400), to('height', 400), to('antialias', true)]));
    var tfClient = new ROSLIB$TFClient(json([to('ros', ros), to('angularThres', 0.01), to('rate', 10.0), to('fixedFrame', '/rotating_frame')]));
    var imClient = new ROS3D$InteractiveMarkerClient(json([to('ros', ros), to('tfClient', tfClient), to('topic', '/basic_controls'), to('camera', viewer.camera), to('rootObject', viewer.selectableObjects)]));
    (tmp$ = document.getElementById('markers')) != null ? (tmp$.setAttribute('border-style', 'solid'), Unit) : null;
    (tmp$_0 = document.getElementById('markers')) != null ? (tmp$_0.setAttribute('border-style', 'solid'), Unit) : null;
    return 0;
  }
  _.init_kand9s$ = init;
  Kotlin.defineModule('ROSGUI', _);
  return _;
}(typeof ROSGUI === 'undefined' ? {} : ROSGUI, kotlin);
