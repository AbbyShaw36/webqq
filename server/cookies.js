exports.getCookies = function(req) {
	var Cookies = {};
	req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
	    var parts = Cookie.split('=');
	    Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
	});
	return Cookies;
}

exports.setCookies = function(res) {
	res.writeHead(200, {
        'Set-Cookie': 'userName=Ting',
        'Content-Type': 'text/html'
    });
    res.end("Success");
}