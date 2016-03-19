#!/usr/bin/env python
# -*- coding: utf-8 -*-
from bottle import get,post,route,run,request,response,static_file,HTTPResponse;
from app.models.posts import Posts;
from app.models.chats import Chats;
import json;
import re;

#variable
help_pattern = re.compile("-{,2}(h$|help$)",re.I);
get_post_pattern = re.compile("^(find|search)(\s|\p{blank}+[0-9])?(\s|\p{blank}+\w*)?$")

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

@post("/mygocci/api/message")
def add_message () :
	value = request.json["message"];
	# db = Chats();
	# db._id = Chats.objects.count() + 1;
	# db.chat_room_id = 0;
	# db.message = value;
	# db.save();

	sended_data = {
		"status": "success",
		"message": "post successfully added message"
	}
	matche_get_posts = get_post_pattern.findall(value);
	match_help_pattern = help_pattern.match(value);
	if match_help_pattern:
		sended_data["data"] = "-h,help: use command\nmy: 自分の投稿を取得する";
		sended_data["message"] += " and help command";
	elif matche_get_posts:
		list_data = list(matche_get_posts[0]);
		list_replaced = [];
		space_match = re.compile(u"\s+");
		for i, str in enumerate(list_data):
			list_replaced.append(space_match.sub("",str));
		
		sended_data["message"] += " and get posts";

	res = HTTPResponse(status=200,body=sended_data);
	res.set_header("Content-Type","application/json; charset=8");
	res.set_header("Content-Language","js-JP");
	return res;

run(host='localhost', port=1234,debug=True,reloader=True);
