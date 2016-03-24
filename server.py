#!/usr/bin/env python
# -*- coding: utf-8 -*-
from bottle import get,post,route,run,request,response,static_file,HTTPResponse;
from app.models.posts import Posts;
from app.models.chats import Chats;
from app.modules.timeCalculation import date_calculation;
import json;
import re;
import pprint;
import datetime;

#variable
help_regex = re.compile("-{,2}(h$|help$)",re.I);
get_post_regex = re.compile("^(?:find|search)(\s+[0-9]+)?(\s+(?:\d+week|\d+month|\d+year))?\s*$")
space_regex = re.compile(u"\s+");

def calculate_japan_time_strings (time) :
	japan_time = time + datetime.timedelta(hours = 1);
	return japan_time.strftime("%Y/%m/%d %H:%M:%S");

@route("re:.")
def root () :
	print("ok");

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
	
	#variable of reponse;
	sended_data = {
		"status": "success",
		"message": "post successfully added message"
	}

	value = request.json["message"];
	# db = Chats();
	# db._id = Chats.objects.count() + 1;
	# db.chat_room_id = 0;
	# db.message = value;
	# db.save();

	#regex progress
	findall_get_posts = get_post_regex.findall(value);
	match_help_pattern = help_regex.match(value);
	
	#return help info
	if match_help_pattern:
		sended_data["data"] = "-h,help: use command\nmy: 自分の投稿を取得する";
		sended_data["message"] += " and help command";
	
	#return posts data
	elif findall_get_posts:
		
		#variable
		replace_matched_list = [];
		match_list_data = list(findall_get_posts[0]);
		sended_data["data"] = [];
		
		#マッチしたデータを使ってデータベースから情報を取得
		#replace_matched_list["find or search", "count","date","position"];]
		for i, string in enumerate(match_list_data):
			replace_space = space_regex.sub("",string);
			if replace_space.isdigit():
				replace_space = int(replace_space);
			elif i == 0 and not replace_space:
				replace_space = 1;
			elif not replace_space:
				replace_space = 0;

			replace_matched_list.append(replace_space);

		if replace_matched_list[1]:
			term = date_calculation(replace_matched_list[1]);
		else :
			term = datetime.datetime.now();

		get_document = Posts.objects().filter(post_user_id=1,date_time__lte=term).order_by("-_id").limit(replace_matched_list[0]);
		for i in range(get_document.count(with_limit_and_skip=True)):
			temp = get_document[i];
			insert_data = {};
			insert_data["post_id"] = temp._id;
			insert_data["user_id"] = temp.post_user_id._id;
			insert_data["id_name"] = temp.post_user_id.id_name;
			insert_data["user_name"] = temp.post_user_id.user_name;
			insert_data["rest_id"] = temp.post_rest_id._id;
			insert_data["rest_name"] = temp.post_rest_id.rest_name;
			insert_data["movie"] = temp.movie;
			insert_data["date_time"] = calculate_japan_time_strings(temp.date_time);
			sended_data["data"].append(insert_data);

		print(sended_data);
		sended_data["message"] += " and get posts";

	res = HTTPResponse(status=200,body=sended_data);
	res.set_header("Content-Type","application/json; charset=8");
	res.set_header("Content-Language","js-JP");
	return res;

run(host='localhost', port=1234,debug=True,reloader=True);
