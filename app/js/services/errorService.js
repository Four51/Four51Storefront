four51.app.factory('Error', function() {
	var defineError = function(ex) {
		var obj = {
			Message: ex.data.Message || ex.Message || '',
			Detail: ex.data.ExceptionMessage || ex.ExceptionMessage || ex.message,
			Code: { text: ex.data.ExceptionType || ex.ExceptionType || '' },
			StackTrace: ex.data.StackTrace || ex.StackTrace || ''
		}
		obj.Code.text = obj.Code.text.replace('Four51.Framework.', '').replace('DBExceptions+', '');

		if(obj.Message.indexOf("There are three distinct password security levels") !== -1){
			obj.Code.text = "PasswordSecurityException";
		}
		if(obj.Message.indexOf("Account information for that email address cannot be located") !== -1){
			obj.Code.text = "EmailNotFoundException";
		}

		obj.Code.is = function(code) {
			return obj.Code.text.indexOf(code) > -1;
		}

		return obj;
	}

	return {
		format: defineError
	}
});