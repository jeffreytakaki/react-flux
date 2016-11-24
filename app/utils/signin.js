

export default function firebaseSignIn() {
	
    	let self = this

		// if (!firebase.auth().currentUser) {
			var provider = new firebase.auth.FacebookAuthProvider();
			provider.addScope('user_birthday');
			provider.setCustomParameters({
			  'display': 'popup'
			});
			return firebase.auth().signInWithPopup(provider).then(function(result) {
				// console.log(result)
				var token = result.credential.accessToken;
				var user = result.user;
				
				return user
			}).catch(function(error) {
				
				var errorCode = error.code;
				var errorMessage = error.message;
				
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				// [START_EXCLUDE]
				if (errorCode === 'auth/account-exists-with-different-credential') {
					alert('You have already signed up with a different auth provider for that email.');
					// If you are using multiple auth providers on your app you should handle linking
					// the user's accounts here.
				} else {
					return false
					console.error(error);
				}
				// [END_EXCLUDE]
			});
		// }

		
		
    }
