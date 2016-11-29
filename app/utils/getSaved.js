
export default function getSaved(uid) {
	
	var ref = firebase.database().ref("save-recipe/" + uid);
	return ref.once("value")
	.then(function(snapshot) {
		let getsnap = snapshot.val()
		let saved = []
        for (var k in getsnap){
            if (getsnap.hasOwnProperty(k)) {
                let obj = {
                    recipe_id: k,
                    image: getsnap[k].image,
                    title: getsnap[k].title,
                    url: getsnap[k].url
                }
                saved.push(obj)
            }
        }

		return saved
	
	});

		
		
}
