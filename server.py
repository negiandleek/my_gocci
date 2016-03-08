from bottle import route, run,static_file;

@route('/')
def index():
	return static_file("index.html",root="./view");

@route('/static/<filepath:path>')
def static(filepath):
	return static_file(filepath,root="./static");

run(host='localhost', port=1234,debug=True,reloader=True);