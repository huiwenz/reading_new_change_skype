/// <reference path="uia.d.ts" />
"use strict";

////////////////////////////////////////////////// GLOBAL VARIABLE ////////////////////////////////////////////////////
var haventClosedWindow; // This variable represents the conversation window that hasn't been closed.
                        // The reason we use one variable is that there could be only one 
                        // Skype conversation window(can with multiple tabs) opened in the desktop at once. 

////////////////////////////////////////////////// EVENT HANDLER ////////////////////////////////////////////////////
// The event handler for status changes
function statusChangedHandler(el) {

    // Check if the name change is what we want to capture 
    // We only capture the status change that contains "is typing... "
    if (el.name.indexOf("is typing") > -1) {
        narrator.say(el.name);
        console.log("SHOULD SAY: " + el.name);
    }

}

// The event handler for opened window
function windowOpenedHandler(el) {

    // Check if the window is a conversation window
    if (el.className === "LyncConversationWindowClass") {

        // There is one opened window
        haventClosedWindow = el;

        // Add a property changed event handler
        el.addPropertyChangedEventHandler(7, [30005], statusChangedHandler);
    }

}


// The event handler for closed window
function windowClosedHandler(el) {

    // Check if the window is a conversation window
    if (el.className === "LyncConversationWindowClass") {

        // There is no conversation window
        haventClosedWindow = null;

        // remove the property changed event handler
        el.removePropertyChangedEventHandler(statusChangedHandler);
    }

}

host.onActivate = function () {
    console.log("onActivate");

    // Add an event handler that can keep track of new Skype chat windows
    // First we see if there is already a Skype chat window
    // If there is a Skype chat window, then we set the event listener on this Skype window

    return Q.fcall(function () { return uia.root(); })
    .then(function (desktop) {

        console.log("desktop: " + desktop.name);

        // Insert the windowOpened listener to desktop.
        uia.root().addEventHandler(20016, 2, windowOpenedHandler);

        // Insert the windowClosed listener to desktop.
        uia.root().addEventHandler(20017, 2, windowClosedHandler);

        // Check if there is currently a conversation window opened
        return desktop.findFirst(function (el) { return (el.className === "LyncConversationWindowClass"); }, 0, 1);

    }, function (error) { throw new Error("The promise for finding the desktop element fails. "); })

    .then(function (conversationWindow) {

        if (conversationWindow != null) {
            // Add a property changed event handler
            conversationWindow.addPropertyChangedEventHandler(7, [30005], statusChangedHandler);
        }

        return "fulfilled";

    }, function (error) {

        console.log("ERROR: " + error.message);

        throw new Error("The promise for finding the conversation window fails. ");
    });

};

host.onDeactivate = function () {
    console.log("onDeactivate");

    return Q.fcall(function () { return uia.root(); })
    .then(function (desktop) {

        // remove the windowOpened and windowClosed handler. 
        desktop.removeEventHandler(20016, windowOpenedHandler);
        desktop.removeEventHandler(20017, windowClosedHandler);

        // If there is still a Skype window opened, remove the event handler.
        if (haventClosedWindow != null) {
            haventClosedWindow.removePropertyChangedEventHandler(statusChangedHandler);
        }

    }, function (error) { throw new Error("The promise for finding the desktop element fails. "); });
};

host.onSetFocus = function () {
    console.log("onSetFocus");

    //var el = uia.focused();

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
        //narrator.say("1 2 3");

    }

    // "2"
    else if (e.keyCode === 50) {

    }


    // "3"
    // Keeps track of status change
    else if (e.keyCode === 51) {

        //// Just need to add a similar handler
        //return Q.fcall(function () {
        //    return uia.root();
        //}).then(function (desktop) {

        //    // Locate the chat window
        //    return desktop.findFirst(function (el) { return (el.className == "LyncConversationWindowClass"); }, 0, 1);

        //}, function (error) { throw new Error("The promise for finding desktop element fails. "); })

        //// Insert an event handler for the CHAT WINDOW!
        //.then(function (conversationWindow) {

        //    console.log("In conversation window");

        //    // Add a property changed event handler
        //    conversationWindow.addPropertyChangedEventHandler(7, [30005], statusChangedHandler);

        //    return "fulfilled";

        //}, function (error) { throw new Error("The promise for finding the conversation window fails. "); });
    }

    // "4"
    // Scenario 4
    else if (e.keyCode === 52) {
    }

        // "5"
    else if (e.keyCode === 53) {
        debugger;
    }
};
