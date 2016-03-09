# -*- coding: utf-8 -*-
from mongoengine.document import Document
from mongoengine import fields,connect;
connect('my_gocci_test_db');

class Posts(Document):
	_id = fields.SequenceField(required=True);
	post_user_id = fields.IntField(required=True);
	post_rest_id = fields.IntField(required=True);
	movie = fields.StringField(required=True);

	def __repr__(self):
		return "_id:{},user_id:{},rest_id:{},movie:{}".format(
			self._id,self.post_user_id,self.post_rest_id,self.movie
		);