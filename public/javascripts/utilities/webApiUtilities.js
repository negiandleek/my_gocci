import request from 'superagent';

export function add_message_api (message) {
	return new Promise ((resolve, reject) => {
		request
			.post("http://localhost:4321/mygocci/api/add_message")
			.send({message})
			.end((err,res) => {
				if(err){
					reject(err);
				}else{
					resolve(res.body);
				}
			});
	});
}