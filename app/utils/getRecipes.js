import Request from 'superagent'
import JsonP from 'superagent-jsonp'

export default function getRecipes(query) {
	
		let url = 'https://api.edamam.com/search?app_id=0c525d9c&app_key=8bf67152e4c749ae710b8cd35eb85862&count=20&q='
		url += query

		return new Promise((resolve, reject) => {
			Request
			.get(url)
			.use(JsonP)
			.end(function(err, res) {
				if(!err) {
					var recipes = []
					res.body.hits.forEach(function(hit){
						recipes.push(hit)
					})
					return resolve(recipes)
				}
			})
		});   
		

		
		
}
