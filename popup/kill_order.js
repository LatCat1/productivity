//todo: don't redo all this work
var button = document.getElementById('kill_button')

button.onclick = function(){
    console.log('Killing a tab manually')
    let all_tabs = browser.tabs.query({})
    all_tabs.then(random_kill)
}

// TODO: Add a way to manually trigger this
function random_kill(tabs){
    let target = tabs[parseInt(Math.random() * tabs.length)];
    console.log('Killing: ' + target.title)
    browser.tabs.remove(target.id)
}