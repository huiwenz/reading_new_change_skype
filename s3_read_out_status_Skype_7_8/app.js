/// <reference path="uia.d.ts" />
"use strict";

////////////////////////////////////////////////// GLOBAL VARIABLES ////////////////////////////////////////////////////
var listenToStatusChangeScript = {
    currentProcessId: null
}


////////////////////////////////////////////////// EVENT HANDLER ////////////////////////////////////////////////////
// The event handler for status changes
function statusChangedHandler(el) {

    // Check if the name change is what we want to capture 
    // We only capture the status change that contains "is typing... "
    if (el.name.indexOf("is typing") > -1) {
        narrator.say(el.name);
        console.log("NARRATOR SHOULD SAY: " + el.name); // For debugging purposes
    }

}

// The event handler for opened window
function windowOpenedHandler(el) {

    console.log("You opened a window.");

    // Check if the window is a conversation window
    if (el.className === "LyncConversationWindowClass") {

        listenToStatusChangeScript.currentProcessId = el.id; // Pretend it is automation id.

        // Add a property changed event handler
        el.addPropertyChangedEventHandler(7, [30005], statusChangedHandler);
    }

}

// The event handler for closed window
function windowClosedHandler(el) {

    // Check if the window is the opened window
    if (listenToStatusChangeScript.currentProcessId != null) {

        if (el.id === listenToStatusChangeScript.currentProcessId) {

            // Add a property changed event handler
            el.removePropertyChangedEventHandler(statusChangedHandler);
        }
    }

}

// The event handler for a closed 
host.onActivate = function () {
    console.log("onActivate");

    // Add an event handler that can keep track of new Skype chat windows
    // First we see if there is already a Skype chat window
    // If there is a Skype chat window, then we set the event listener on this Skype window

    return Q.fcall(function () {

        // Insert the windowOpened listener to desktop.
        uia.root().addEventHandler(20016, 2, windowOpenedHandler);

        // Insert the windowClosed listener to desktop. 
        //uia.root().addEventHandler(20017, 7, windowClosedHandler);

    }).then(function (conversationWindow) {

        if (conversationWindow != null) {
            // Add a property changed event handler
            conversationWindow.addPropertyChangedEventHandler(7, [30005], statusChangedHandler);
        }

        return "Fulfilled";

    }, function (error) {

        console.log("ERROR: " + error.message);
        throw new Error("The promise for finding the conversation window fails. ");
    });

};

host.onDeactivate = function () {
    console.log("onDeactivate");

    return Q.fcall(function () {

        // Remove the windowOpened - windowClosed handler
        uia.root().removeEventHandler(20016, windowOpenedHandler);

        // Insert the windowClosed listener to desktop. 
        //uia.root().removeEventHandler(20017, windowClosedHandler);

        return "Fulfilled";
    });

};

host.onSetFocus = function () {
    console.log("onSetFocus");

    var el = uia.focused();

    //console.log("name: \"" + el.name + "\"");
    //console.log("class name: \"" + el.className + "\"");
    //console.log("id: " + el.id);
    //console.log("automationid: " + el.automationid);

};

host.onKillFocus = function () {
    console.log("onKillFocus");
}

host.onKeypress = function (e) {
    console.log("onkeypress");
    console.log(JSON.stringify(e));

    // "1"
    if (e.keyCode === 49) {

    }

    // "2"
    else if (e.keyCode === 50) {

    }

    // "3"
    // Keeps track of status change
    else if (e.keyCode === 51) {

    }

    // "4"
    else if (e.keyCode === 52) {
    }

        // "5"
    else if (e.keyCode === 53) {
        debugger;
    }
};
