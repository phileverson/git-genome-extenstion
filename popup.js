// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-57122687-1', 'auto');
ga('set', 'checkProtocolTask', null);


// This callback function is called when the content script has been 
// injected and returned its results
function onPageDetailsReceived(pageDetails)  { 
    var pageURL = pageDetails.url;
    var genomeConfirm = pageURL.indexOf("genome");
    var detailsConfirm = pageURL.indexOf("details");

    if(genomeConfirm > 0 && detailsConfirm > 0)
    {
        var pageTitleToCopy = pageDetails.title;
        var pageTitleToCopyDashGenome = pageTitleToCopy.indexOf(' - Genome');
        var ticketNum = pageTitleToCopy.slice(0, 7);
        pageTitleToCopy = pageTitleToCopy.slice(0, pageTitleToCopyDashGenome);
        document.getElementById('title').value = pageTitleToCopy;
        if(copy())
        {
            var statusMessageAlertSuccess = document.getElementById('statusMessageAlertSuccess');
            statusMessageAlertSuccess.style.display = 'block';
            ga('send', 'event', 'Alert Message', 'Success', ticketNum);
        }
    }
    else
    {
        var statusMessageAlertFail = document.getElementById('statusMessageAlertFail');
        statusMessageAlertFail.style.display = 'block';

        var commitMSG = document.getElementById('commitMSG');
        commitMSG.style.display = 'none';
        ga('send', 'event', 'Alert Message', 'Bad URL');
    }
} 

// Global reference to the status display 
var statusDisplay = null;

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Cache a reference to the status display 
    statusDisplay = document.getElementById('status-display');
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in 
        // our onPageDetailsReceived function as the callback. This injects 
        // content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});

function copy() {
    //Get Input Element
    var copyDiv = document.getElementById('title');
    //Give the text element focus
    copyDiv.focus();
    //Select all content
    document.execCommand('SelectAll');
    //Copy Content
    document.execCommand("Copy", false, null);
    return true;
}