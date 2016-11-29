
export default function getSaved(uid) {
	
	var ref = firebase.database().ref("save-recipe/" + uid);
	ref.once("value")
	.then(function(snapshot) {
		console.log(snapshot)
		console.log(snapshot.val())
	
	});

		
		
}
