from mongoengine import fields,connect,Document;

connect("my_gocci_test_db");

class Rests (Document):
	_id = fields.IntField(required=True,primary_key=True);
	rest_name = fields.StringField(required=True);
		