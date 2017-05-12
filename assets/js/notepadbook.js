$(document).ready(function() {


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDmTNcqSjIM7tMZ2W0uGfQZYYZPrVzQtKQ",
        authDomain: "botebook-1891d.firebaseapp.com",
        databaseURL: "https://botebook-1891d.firebaseio.com",
        projectId: "botebook-1891d",
        storageBucket: "botebook-1891d.appspot.com",
        messagingSenderId: "114219758835"
    };
    firebase.initializeApp(config);

    function redirect() {
        $(location).attr('href', "page2.html");
    }

    function redirectback() {
        $(location).attr('href', "index.html");
    }

    //Sign Up.



    $(".upTest").on("click", function(event) {

        event.preventDefault();
        var email = $(".upTestemail").val().trim();
        var pass = $(".upTestpass").val().trim();
        console.log("signed up");
        localStorage.clear();
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                firebase.auth().currentUser.sendEmailVerification().then(function() {
                    // Email sent.
                    $(".message").html("done");
                }, function(error) {
                    // An error happened.
                    $(".message").html("please check your email!");
                });
                var displayName = $(".upTestname").val();
                var currentUser = firebase.auth().currentUser;
                currentUser.updateProfile({
                    displayName: displayName,
                    photoURL: 'https://static.wixstatic.com/media/745f4f_518640ca13a1467baca18fe6181ea912~mv2.png/v1/fill/w_190,h_190,al_c,usm_0.66_1.00_0.01/745f4f_518640ca13a1467baca18fe6181ea912~mv2.png'
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
                $(".userName").append("<img src='photoURL'>");
                localStorage.clear();
                localStorage.setItem("key", uid);
                localStorage.setItem("name", user.displayName);
                localStorage.setItem("photo", photoURL);
                console.log(user);
                console.log(uid);
                firebase.database().ref(uid).set({
                    emailAddress: email
                });
                console.log(signUp);
            } else {
                console.log("signed out");
            }
        });
        var execute = setTimeout(redirect, 5000);
        firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
            if (error) {
                clearTimeout(execute)
            }
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode + errorMessage);
            console.log(email + pass);
            $(".message").html(errorMessage);
        });

    });

    //Sign In.
    $(".test").on("click", function(event) {

        event.preventDefault();
        var signIn = true;
        var email = $(".inemailTest").val().trim();
        var pass = $(".inpassTest").val().trim();
        console.log("signed in");
        var execute = setTimeout(redirect, 5000);
        firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
            if (error) {
                clearTimeout(execute)
            }
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
            $(".userName").append("<img src='photoURL'>");
            console.log(user);
            console.log(uid);
            firebase.database().ref().child(uid);
            console.log(signUp);
            localStorage.clear();
            localStorage.setItem("key", uid);
            localStorage.setItem("name", user.displayName);
            localStorage.setItem("photo", photoURL);
        } else {
            console.log("signed out");
        }
    });

    // store user data in local storage.
    var theKey = localStorage.getItem("key");
    firebase.database().ref("/" + theKey).orderByChild("dateAdded").limitToLast(10).on("child_added", function(snapshot) {
        $(".textContainer").prepend(snapshot.val().text);
        // $(".textContainer").prepend("<br>");
    });

    var theName = localStorage.getItem("name");
    var thePhoto = localStorage.getItem("photo");
    $(".userName").html(theName);
    $(".userName").append("<img src='photo'>");

    $(".save").on("click", function(event) {

        event.preventDefault();

        var text = $(".ql-editor").html();
        var theKey = localStorage.getItem("key");
        firebase.database().ref("/" + theKey).push({
            text: text,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        // clear the texteditor
        $(".ql-editor").empty();
    });

    //Sign Out.
    $(".signOut").on("click", function() {
        event.preventDefault();
        signUp = false;
        localStorage.clear();
        firebase.auth().signOut().then(function() {
            setTimeout(redirectback, 1000);
            // Sign-out successful.
            console.log("signed out");
        }).catch(function(error) {
            // An error happened.
        });
    });


    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{
            'header': 1
        }, {
            'header': 2
        }], // custom button values
        [{
            'list': 'ordered'
        }, {
            'list': 'bullet'
        }],
        [{
            'script': 'sub'
        }, {
            'script': 'super'
        }], // superscript/subscript
        [{
            'indent': '-1'
        }, {
            'indent': '+1'
        }], // outdent/indent
        [{
            'direction': 'rtl'
        }], // text direction

        [{
            'size': ['small', false, 'large', 'huge']
        }], // custom dropdown
        [{
            'header': [1, 2, 3, 4, 5, 6, false]
        }],

        [{
            'color': []
        }, {
            'background': []
        }], // dropdown with defaults from theme
        [{
            'font': []
        }],
        [{
            'align': []
        }],

        ['clean'] // remove formatting button
    ];


    var quill = new Quill('#editor', {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow',
        // will add place holder
        placeholder: "Type here"
    });

    $(".rP").on("click", function(event) {

        event.preventDefault();
        var email = $(".resetP").val().trim();
        firebase.auth().sendPasswordResetEmail(email).then(function() {
            // Email sent.
            $(".checkEmail").html("Done! please check your email box");
        }, function(error) {
            // An error happened.
            $(".checkEmail").html("wrong Email!");
        });
    });
    // facebook
    $(".FBlogout").hide();

    window.fbAsyncInit = function() {
        FB.init({
            appId: '828464373969567',
            xfbml: true,
            version: 'v2.9'
        });
        FB.AppEvents.logPageView();
    };



    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    //Facebook Login.
    $(".FBlogin").on("click", function() {
        FB.login(function(response) {
            if (response.status === 'connected') {
                console.log(response);
                $(".FBlogin").hide();
                $(".FBlogout").show();
            } else if (response.status === 'not_authorized') {
                console.log("not loggedin");
            } else {
                console.log("not loggedin");
                $(".FBlogout").hide();
            }
        }, {
            scope: 'publish_actions, user_posts'
        });
    });

    // getting basic user info
    $(".FBfeed").on("click", function() {

        FB.api('/me', 'GET', {
            fields: 'first_name,last_name,name,id, posts.limit(10)'
        }, function(response) {
            console.log(response);
            for (var i = 0; i < response.posts.data.length; i++) {
                $(".facebookFeed").append("<br><span class='glyphicon glyphicon-plus'></span>" + response.posts.data[i].message);
            }
        });

        FB.api('/me', 'GET', function(testresponse) {
            console.log(testresponse);
            // for (var i = 0; i < 10; i++) {
            //     console.log(i);
            //   $(".facebookFeed").append("<br>"+response.data[i].message);
            // }

        });
    });



    $(".FBlogout").on("click", function() {
        FB.logout(function(response) {
            console.log("FB logout");
            $(".FBlogout").hide();
            $(".FBlogin").show();
        });
    });

});