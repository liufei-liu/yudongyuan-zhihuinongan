document.addEventListener( "plusready", function()
{
	var _BARCODE = 'pluginKeJiaBT',
	B = window.plus.bridge;
	var plugintest =
	{
			PluginTestFunctionArrayArgu : function (Argus, successCallback, errorCallback )
			{
				var success = typeof successCallback !== 'function' ? null : function(args)
				{
					successCallback(args);
				},
				fail = typeof errorCallback !== 'function' ? null : function(code)
				{
				errorCallback(code);
				};
				callbackID = B.callbackId(success, fail);
				return B.exec(_BARCODE, "KeJiaTestFunction", [callbackID, Argus]);
			}
	};
	window.plus.plugintest = plugintest;
}, true );
