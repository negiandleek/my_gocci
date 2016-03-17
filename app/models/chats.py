# -*- coding: utf-8 -*-
from mongoengine.document import Document
from mongoengine import fields,connect;

connect('my_gocci_test_db');

class Chats (Document):
	_id = fields.SequenceField(required=True);
	chat_room_id = fields.IntField(required=True);
	message = fields.StringField(required=True);