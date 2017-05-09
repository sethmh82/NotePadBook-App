$(document).ready(function () {

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

  function redirect(){$(location).attr('href',"page2.html");}
  function redirectback(){$(location).attr('href',"index.html");}

//Sign Up.



  $(".upTest").on("click",function(event){

		event.preventDefault();
    var email= $(".upTestemail").val().trim();
    var pass =$(".upTestpass").val().trim();
    console.log("signed up");
    localStorage.clear();
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email sent.
        $(".message").html("ACCOUNT CREATED. YOU CAN NOW LOGIN.");
      }, function(error) {
        // An error happened.
        $(".message").html("PLEASE CHECK YOUR EMAIL!");
      });
      var displayName =$(".upTestname").val();
    	var  currentUser = firebase.auth().currentUser;
    	currentUser.updateProfile({
    	displayName: displayName,
    	photoURL: 'assets/img/avatar.jpg'
    	}).then(function() {
    // Update successful.
    	}, function(error) {
    // An error happened.
    	});
    	var email = user.email;
    	var emailVerified = user.emailVerified;
    	var photoURL = user.photoURL;
    	var isAnonymous = user.isAnonymous;
    	var uid = user.uid;
    	var providerData = user.providerData;
    	$(".userName").html(user.displayName);
    	$(".userName").append("<img class='avimg' src='assets/img/avatar.jpg'>");
      localStorage.clear();
			localStorage.setItem("key", uid);
			localStorage.setItem("name", user.displayName);
			localStorage.setItem("photo", photoURL);
    	console.log(user);
    	console.log(uid);
    	firebase.database().ref(uid).set({ emailAddress:email});
    	console.log(signUp);
    }else{  console.log("signed out");}
  	});
    var execute =setTimeout(redirect, 5000);
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
    if(error){clearTimeout(execute)}
  	// Handle Errors here.
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    console.log(errorCode + errorMessage);
	    console.log(email + pass);
	    $(".message").html(errorMessage);
  	});

  });

//Sign In.
  $(".test").on("click", function(event){

		event.preventDefault();
    var signIn = true;
    var email= $(".inemailTest").val().trim();
    var pass= $(".inpassTest").val().trim();
    console.log("signed in");
    var execute =setTimeout(redirect, 5000);
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
    if(error){clearTimeout(execute)}
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + errorMessage);
    $(".message").html(errorMessage);
    });
  });

// When authentication state changed.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    	var email = user.email;
    	var emailVerified = user.emailVerified;
    	var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var providerData = user.providerData;
			$(".userName").html(user.displayName);
			$(".userName").append("<img style='margin-left:15px;' class='avimg' src='assets/img/avatar.jpg'>");
			console.log(user);
			console.log(uid);
			firebase.database().ref().child(uid);
			console.log(signUp);
			localStorage.clear();
			localStorage.setItem("key", uid);
			localStorage.setItem("name", user.displayName);
			localStorage.setItem("photo", photoURL);
    }else{  console.log("signed out");}
  });

// store user data in local storage.
  var theKey =localStorage.getItem("key") ;
	firebase.database().ref("/"+theKey).orderByChild("dateAdded").limitToLast(10).on("child_added", function(snapshot) {
    $(".textContainer").prepend(snapshot.val().text);
    $(".textContainer").prepend("<br>");
  });

  var theName = localStorage.getItem("name") ;
  var thePhoto = localStorage.getItem("photo") ;
  $(".userName").html(theName);
  $(".userName").append("<img src='photo'>");

  $(".save").on("click",function(event){

    event.preventDefault();
    var paragraph = $("<p>");
   	var delta = quill.getContents();
   	var text = quill.getText();
   	paragraph.append(text);
   	paragraph.addClass("newP");
   	$(".textContainer").prepend("<br>");
    var theKey =localStorage.getItem("key") ;
    firebase.database().ref("/"+theKey).push({
      text:text,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });

  //Sign Out.
  $(".signOut").on("click", function(){
    event.preventDefault();
    signUp=false;
    localStorage.clear();
    firebase.auth().signOut().then(function() {
    setTimeout(redirectback, 1000);
    // Sign-out successful.
    console.log("signed out");
    }).catch(function(error) {
    // An error happened.
    });
  });


	var quill = new Quill('#editor', {
    theme: 'snow'
  });

  $(".rP").on("click", function(event){

    event.preventDefault();
    var email=$(".resetP").val().trim();
    firebase.auth().sendPasswordResetEmail(email).then(function() {
  // Email sent.
  	$(".checkEmail").html("Done! please check your email box");
		}, function(error) {
 			 // An error happened.
  		$(".checkEmail").html("wrong Email!");
		});
  });

});
