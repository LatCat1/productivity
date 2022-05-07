const periodInMinutes = 1;    //Delay between firings. TODO: Make this modifyable
const alarmName = 'Kill_Alarm'; //A constant name so that it stays consistent
const delayMS = 1000*500;         //TODO: Maybe just have this start at 0, immedietly run

console.log('Running a background script')

function listener(alarm){
    if (alarm.name === alarmName) {
        console.log('Killing a tab')
        let all_tabs = browser.tabs.query({})
        all_tabs.then(random_kill)
    }
}

// TODO: Add a way to manually trigger this
function random_kill(tabs){
    let target = tabs[parseInt(Math.random() * tabs.length)];
    console.log('Killing: ' + target.title)
    browser.tabs.remove(target.id)
}

//This layer is needed to prevent the background script accidentally rerunning (which it might never do),
//adding it just seemed to make the code work
function filterExisting(alarm){
    console.log('Trying to make an alarm')
    if (alarm == undefined) {
        console.log('Making a new kill alarm')
        let when = Date.now() + delayMS
        browser.alarms.create('Kill_Alarm', {
            when,
            periodInMinutes
        });

        browser.alarms.onAlarm.addListener(listener)
    } else {
        console.log('It already exists')
    }
}

let search = browser.alarms.get(alarmName);
search.then(filterExisting);