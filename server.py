#!/usr/bin/env python
# -*- coding: utf-8 -*-
from bottle import get,post,route,run,request,response,static_file,HTTPResponse;
from app.models.posts import Posts;
from app.models.chats import Chats;
import json;

@route('/')
def index():
	return static_file("index.html",root="./static");

@route('/static/<filepath:path>')
def static(filepath):
	return static_file(filepath,root="./static");

@get('/mygocci/api/find')
def find_collections():
	sended_data = {"data": []};
	insert_dict = {"id": None,"user_id": None, "rest_id": None, "movie": None};
	id = request.query.id;
	
	if isinstance(object, dict):
		parse_id = json.loads(id);
	else :
		parse_id= {"id": id};
			
	#postsをDBから取得しレスポンスボディ用の変数に代入
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

@post("/mygocci/api/add_message")
def add_message () :
	value = request.forms.message;
	db = Chats();
	db._id = Chats.objects.count() + 1;
	db.chat_room_id = 0;
	db.message = value;
	db.save();
	sended_data = {
		"status": "success",
		"message": "post successfully added message"
	}

	res = HTTPResponse(status=200,body=sended_data);
	res.set_header("Content-Type","application/json; charset=8");
	res.set_header("Content-Language","js-JP");
	return res;

run(host='localhost', port=1234,debug=True,reloader=True);