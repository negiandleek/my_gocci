#!/usr/bin/env python
# -*- coding: utf-8 -*-
import datetime;
import re;
from dateutil.relativedelta import relativedelta

def date_calculation (condition):
	date_regex = re.compile("(\d)(week|month|year)");
	findall_date_regex = date_regex.findall(condition);
	findall_date_regex = list(findall_date_regex[0]);

	#文字列が数字に変換可能なら変換
	for i in range(len(findall_date_regex)):
		if findall_date_regex[i].isdigit():
			findall_date_regex[i] = int(findall_date_regex[i]);

	jpan_current_time = datetime.datetime.now();
	iso_current_time = jpan_current_time - datetime.timedelta(hours = 9);
	print(findall_date_regex);
	# 日付と時間を算出する
	if findall_date_regex[1] == "week":
		time_of_one_week_ago = iso_current_time - datetime.timedelta(weeks = findall_date_regex[0]);
		return time_of_one_week_ago;

	elif findall_date_regex[1] == "month":
		time_of_one_month_ago = iso_current_time - relativedelta(months = findall_date_regex[0]);
		return time_of_one_month_ago;
	elif findall_date_regex[1] == "year":
			time_of_one_year_ago = iso_current_time - relativedelta(years = findall_date_regex[0]);
			return time_of_one_year_ago;
