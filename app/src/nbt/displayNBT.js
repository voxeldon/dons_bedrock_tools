function interpretNBTData(data) {
    let map = {};

    // Extract format_version
    map.format_version = data.value.format_version.value;

    // Extract size
    map.size = data.value.size.value.value;

    // Extract block_palette
    map.block_palette = data.value.structure.value.palette.value.default.value.block_palette.value.value.map(block => block.name.value);

    // Extract structure_world_origin
    map.structure_world_origin = data.value.structure_world_origin.value.value;

    return map;
}

let rawNBTData = null;  // Global variable to store the raw data

function getNBT() {
    const fileInput = document.getElementById('nbtFileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an NBT file first.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        rawNBTData = event.target.result;  // Store the raw data
        nbt.parse(rawNBTData, function(error, data) {
            if (error) {
                console.error("Failed to parse NBT data:", error);
                return;
            }
            
            // Directly display the raw NBT data
            const outputElement = document.getElementById('nbtOutput');
            outputElement.textContent = JSON.stringify(data, null, 2);
        });
    };
    reader.readAsArrayBuffer(file);
}

function downloadAsFile(filename, content, type) {
    const blob = new Blob([content], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function downloadMCStructure() {
    if (!rawNBTData) {
        alert('Please load an NBT file first.');
        return;
    }
    downloadAsFile('output.mcstructure', rawNBTData, 'application/octet-stream');
}

function downloadTXT() {
    const outputElement = document.getElementById('nbtOutput');
    downloadAsFile('output.txt', rawNBTData, 'text/plain');
}
