// utils.js

function isValidNamespace(namespace) {
    return /^[a-z_]+$/.test(namespace);
}

function log(message) {
    console.log(message);

    // Append the log to the webpage
    const logsList = document.getElementById('logs');
    const logItem = document.createElement('li');
    logItem.textContent = message;
    logsList.appendChild(logItem);
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function cleanString(str) {
    return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
