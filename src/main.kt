import kotlin.browser.*
import kotlin.dom.*
import kotlin.js.Json
import kotlin.js.json

external class ROSLIB{
    class Ros(json: Json)
    class TFClient(json: Json)
}

external class ROS3D{
    class Viewer(json: Json)
    class InteractiveMarkerClient(json: Json)
}

fun init(args: Array<String>): Int {
    val ros = ROSLIB.Ros(
            json(
                    "url" to "ws://rosbox.local:9090"
            )
    )
    val viewer = ROS3D.Viewer(
            json(
                    "divID" to "markers",
                    "width" to 400,
                    "height" to 400,
                    "antialias" to true
            )
    ).asDynamic()
    val tfClient = ROSLIB.TFClient(
            json(
                    "ros" to ros,
                    "angularThres" to 0.01,
                    "rate" to 10.0,
                    "fixedFrame" to "/rotating_frame"
            )
    )
    val imClient = ROS3D.InteractiveMarkerClient(
            json(
                    "ros" to ros,
                    "tfClient" to tfClient,
                    "topic" to "/basic_controls",
                    "camera" to viewer.camera,
                    "rootObject" to viewer.selectableObjects
            )
    )

    return 0
}
