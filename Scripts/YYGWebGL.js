const defaultObjectName = "WebGLManager";
function YYGSendMessageToUnity(msg)
{
	if(window.unityInstance)
	{
		window.unityInstance.SendMessage(defaultObjectName,"Dispatcher",msg);
	}
}

function YYGSendMessageToUnityCustom(objectName, functionName, msg)
{
	if(window.unityInstance)
	{
		window.unityInstance.SendMessage(objectName, functionName, msg);
	}
}

function YYGOnOrientationChanged(orientation)
{
	if(window.unityInstance)
	{
		window.unityInstance.SendMessage(defaultObjectName,"OnOrientationChanged", orientation);
	}
}

function YYGOnGameSizeChanged()
{
	if(window.unityInstance)
	{
		window.unityInstance.SendMessage(defaultObjectName,"OnSizeChanged");
	}
}

//binding web event
screen.orientation.addEventListener("change", (event) => {
  const type = event.target.type;
  YYGOnOrientationChanged(type);
});

window.addEventListener("resize", YYGOnGameSizeChanged);
