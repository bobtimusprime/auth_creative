(function(){

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBI2LKoqhqMcerBvL_C119-IyQUyb8Pb8M",
        authDomain: "pianolessons-599d1.firebaseapp.com",
        databaseURL: "https://pianolessons-599d1.firebaseio.com",
        projectId: "pianolessons-599d1",
        storageBucket: "pianolessons-599d1.appspot.com",
        messagingSenderId: "870432614764"
    };
    firebase.initializeApp(config);

    /*AUTHENTICATION SECTION*/
    //Get elements from DOM
    console.log(window.location);

    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');
        
        //Add login event
        btnLogin.addEventListener('click', e => {
            //Get email and pass
            const email = txtEmail.value;
            const pass = txtPassword.value;
            const auth = firebase.auth(); 
            //Sign in
            console.log(email);
            console.log(pass);
            const promise = auth.signInWithEmailAndPassword(email, pass);
            promise.catch(e => console.log(e.message));
        });

        //Add signup event
        btnSignUp.addEventListener('click',e=> {
            //Get email and pass
            //TODO: Check for real emails
            //TODO: check for passwords too short
            const email = txtEmail.value;
            const pass = txtPassword.value;
            const auth = firebase.auth(); 
            //Sign in
            const promise = auth.createUserWithEmailAndPassword(email, pass);
            promise.catch(e => console.log(e.message));
        });

        //Logout event
        btnLogout.addEventListener('click', e=> {
            firebase.auth().signOut();
        });

    /*END EMAIL AUTHENTICATION SECTION*/

    function toggleSignIn() {
        if (!firebase.auth().currentUser) {
            // [START createprovider]
            var provider = new firebase.auth.GoogleAuthProvider();
            // [END createprovider]
            // [START addscopes]
            provider.addScope('https://www.googleapis.com/auth/plus.login');
            // [END addscopes]
            // [START signin]
            firebase.auth().signInWithRedirect(provider);
            // [END signin]
        } else {
            // [START signout]
            firebase.auth().signOut();
            // [END signout]
        }
        // [START_EXCLUDE]
        document.getElementById('quickstart-sign-in').disabled = true;
        // [END_EXCLUDE]
    }
    // [END buttoncallback]
    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     *  - firebase.auth().getRedirectResult(): This promise completes when the user gets back from
     *    the auth redirect flow. It is where you can get the OAuth access token from the IDP.
     */
    function initApp() {
        // Result from Redirect auth flow.
        // [START getidptoken]
        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // [START_EXCLUDE]
                document.getElementById('quickstart-oauthtoken').textContent = token;
            } else {
                document.getElementById('quickstart-oauthtoken').textContent = 'null';
                // [END_EXCLUDE]
            }
            // The signed-in user info.
            var user = result.user;
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // [START_EXCLUDE]
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different auth provider for that email.');
                // If you are using multiple auth providers on your app you should handle linking
                // the user's accounts here.
            } else {
                console.error(error);
            }
            // [END_EXCLUDE]
        });
        // [END getidptoken]

        //Add a realtime listener
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                window.location = 'music';
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;

                document.getElementById('sign-in-status').textContent = 'Signed in';
                document.getElementById('quickstart-sign-in').textContent = 'Sign out';
                document.getElementById('display-name').textContent = displayName;  


                console.log(user);
                btnLogout.classList.remove('hide');
            } else {
                window.location = "";
                // User is signed out.
                document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
                document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
                document.getElementById('quickstart-account-details').textContent = 'null';
                document.getElementById('quickstart-oauthtoken').textContent = 'null';

                console.log('Not logged in');
                btnLogout.classList.add('hide');
            }

            document.getElementById('quickstart-sign-in').disabled = false;
        });
        document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    }
    //window.onload = function() {
    initApp();
    //};



}());
