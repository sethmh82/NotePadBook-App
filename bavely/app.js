 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCnEFNEYcy2p9EPeD9s2Z3C4VTYBQee2eg",
    authDomain: "projtest-eb619.firebaseapp.com",
    databaseURL: "https://projtest-eb619.firebaseio.com",
    projectId: "projtest-eb619",
    storageBucket: "projtest-eb619.appspot.com",
    messagingSenderId: "702305641233"
  };
  firebase.initializeApp(config);



$(".test").on("click", function(event){
	event.preventDefault();
	var email= $(".inemailTest").val().trim();
	var pass= $(".inpassTest").val().trim();
	console.log("signed in");
	firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
    console.log(errorCode + errorMessage);
});



});

$(".upTest").on("click", function(event){
event.preventDefault();
	var email= $(".upTestemail").val().trim();
	var pass =$(".upTestpass").val().trim();
	console.log(email + pass);
	console.log("signed up");
	firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  console.log(errorCode + errorMessage);
  console.log(email + pass);

});




});

$(".signOut").on("click", function(){
event.preventDefault();

firebase.auth().signOut().then(function() {
  // Sign-out successful.
  console.log("signed out");
}).catch(function(error) {
  // An error happened.
});

});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;

    console.log(user);
    // ...
  } else {
    // User is signed out.
    // ...

    console.log("signed out");
  }
});




var hash = md5('bavle', 'whatever');
console.log(hash);


var plain = md5('bavle', 'whatever');
console.log(plain);


if (hash===plain) {

	console.log("true");

}else{
	console.log("false")
}



