// Initialize Firebase
var config = {
    apiKey: "AIzaSyDHPeFo3CufY1f_YjYvyK_sPuvBTTZlcLo",
    authDomain: "csi-contact-messages.firebaseapp.com",
    databaseURL: "https://csi-contact-messages.firebaseio.com",
    projectId: "csi-contact-messages",
    storageBucket: "csi-contact-messages.appspot.com",
    messagingSenderId: "412968902676"
};
firebase.initializeApp(config);

var sLoader = $('#submit-loader');

//Messages Collection
var messagesRef = firebase.database().ref('messages');

document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
	e.preventDefault();
	var contactName = getInputVal('contactName');
	var contactEmail = getInputVal('contactEmail');
	var contactSubject = getInputVal('contactSubject');
	var contactMessage = getInputVal('contactMessage');

	saveMessage(contactName,contactEmail,contactSubject,contactMessage);

	sLoader.fadeIn();

	setTimeout(function(){
		sLoader.fadeOut();
		$('#message-warning').hide();
		document.getElementById('contactForm').reset();
		$('#message-success').fadeIn();
		setTimeout(function(){
			$('#message-success').fadeOut();
		},3000);
	},3000);
}
function getInputVal(id) {
	return document.getElementById(id).value;
}

function saveMessage(contactName,contactEmail,contactSubject,contactMessage) {
	var newMessageRef = messagesRef.push();
	newMessageRef.set({
		contactName: contactName,
		contactEmail: contactEmail,
		contactSubject: contactSubject,
		contactMessage: contactMessage
	});
}