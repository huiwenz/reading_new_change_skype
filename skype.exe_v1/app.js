/// <reference path="scripts/typings/underscore/underscore.d.ts" />
/// <reference path="scripts/typings/q/q.d.ts" />
/// <reference path="scripts/typings/uia/uia.d.ts" />
host.onload = function () {
    console.log("onload");
};

function printElementDescription(el) {
    console.log("name: \"" + el.name + "\"");
    console.log("class name: \"" + el.className + "\"");
    console.log("id: " + el.id);
    console.log("automationid: " + el.automationid);
}

// Question: Is el the element itself?
function messageChangedHandler(el) {

    // Check if the name change is about the new messages
    if (el.name.indexOf("You have a new message") > -1) {
        Narrator.say(el.name);
    }

}

function statusChangedHandler(el) {

    Narrator.say(el.name);

    // Might doing: handle the situation when there is a conflict...?
    // How do we know if a handler already caught a event?

}

host.onkeypress = function (e) {
    console.log("onkeypress");
    console.log(JSON.stringify(e));


    // "1"
    // When ctrl + Caps lock + 1 is pressed, we can trigger the script for checking the next meeting
    if (e.keyCode === 49) {

        ////////////////////////////////////////// Code for scenario 1 //////////////////////////////////////////
    }


        // "2"
        // When Caps lock + 2 is pressed, starts to keep track of new messages. 
    else if (e.keyCode === 50) {

        return Q.fcall(function () {
            return uia.root();
        }).then(function (desktop) {

            // Get the text area which shows property changed events
            return desktop.findFirst(function (el) { return (el.className == "NetUIAcessibilityAnnouncer"); }, 0, 10);

        }, function (error) { throw new Error("Can't find the desktop element!"); })
        .then(function (newMsgAnnouncer) {

            console.log("New message announcer is found");

            // Add a property changed event handler
            // Question: What is property array used?
            var propArray = [];
            newMsgAnnouncer.addPropertyChangedEventHandler(20004, propArray, messageChangedHandler);

        }, function (error) {
            narrator.say("There is an error occurred.");
            throw new Error("Can't find new message announcer on Skype chat window. ");
        });



    }

        // "3"
        // Keeps track of status change
    else if (e.keyCode === 51) {

        // Just need to add a similar handler
        return Q.fcall(function () {
            return uia.root();
        }).then(function (desktop) {

            // Get the text area which shows property changed events
            return desktop.findFirst(function (el) { return (el.className == "NetUILabel"); }, 0, 10);

        }, function (error) { throw new Error("Can't find the desktop element!"); })

        .then(function (newStatusAnnouncer) {

            console.log("New status announcer is found");

            // Add a property changed event handler
            // Question: What is property array used?
            var propArray = [];
            newStatusAnnouncer.addPropertyChangedEventHandler(20004, propArray, statusChangedHandler);

        }, function (error) {
            narrator.say("There is an error occurred.");
            throw new Error("Can't find new status announcer on Skype chat window. ");
        });

    }
        // "4"
    else if (e.keyCode === 52) {
    }
        // "5"
    else if (e.keyCode === 53) {
        debugger;
    }
};
