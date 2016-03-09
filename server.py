#!/usr/bin/env python
# -*- coding: utf-8 -*-
from bottle import get,post,route,run,request,response,static_file,HTTPResponse;
from app.models.posts import Posts;
import json;

@route('/')
def index():
	return static_file("index.html",root="./view");

@route('/static/<filepath:path>')
def static(filepath):
	return static_file(filepath,root="./static");

@get('/mygocci/api/find')
def find_collections():
	sended_data = {"data": []};
	insert_dict = {"id": None,"user_id": None, "rest_id": None, "movie": None};
	id = request.query.id;
	parse_id = json.loads(id);

	for i in parse_id["id"]:
		get_document = Posts.objects(_id=i);
		insert_dict["id"] = get_document[0]._id;
		insert_dict["user_id"] = get_document[0].post_user_id;
		insert_dict["rest_id"] = get_document[0].post_rest_id;
		insert_dict["movie"] = get_document[0].movie;
		sended_data["data"].append(insert_dict);

	conversion_sended_data = json.dumps(sended_data);
	res = HTTPResponse(status=200,body=conversion_sended_data);
	res.set_header("Content-Type","application/json; charset=utf-8");
	res.set_header("Content-Language","js-JP");
	return res;

run(host='localhost', port=1234,debug=True,reloader=True);