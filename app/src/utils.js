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

function capitalize(str) {
    if (!str || typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}


function cleanString(str) {
    return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function jsoncParse(text) {
    // Remove single line comments
    text = text.replace(/\/\/.*$/gm, '');
    // Remove multi-line comments
    text = text.replace(/\/\*[\s\S]*?\*\//g, '');
    // Replace functions starting with a capital letter (basic approach)
    text = text.replace(/\b[A-Z][a-zA-Z0-9_]*\([^)]*\)/g, '0');
    return JSON.parse(text);
}
