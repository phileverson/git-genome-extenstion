// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-57122687-1', 'auto');
ga('set', 'checkProtocolTask', null);


//Actual Options JS
var submitted = false;

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

window.onload = function() {
	ga('send', 'event', 'Options Page', 'Accessed');

	var successMessageFeedback = document.getElementById('successMessageFeedback');
	var feedbackFormSubmit = getParameterByName('feedbackFormSubmit');
	if(feedbackFormSubmit == 'true')
	{
		successMessageFeedback.style.display = 'block';
        ga('send', 'event', 'Options Page', 'Form', 'Submitted');
        setTimeout(function(){
            $("#successMessageFeedback").fadeOut( "slow" );
        },4000);
	}

    var form = document.getElementById('ss-form');
    form.onsubmit = function() {
        submitted = true;
    }
    var hidden_iframe = document.getElementById('hidden_iframe');
    hidden_iframe.onload = function() {
        if(submitted)
        	{
        		window.location=document.URL + '?feedbackFormSubmit=true';
        	}
    }
}