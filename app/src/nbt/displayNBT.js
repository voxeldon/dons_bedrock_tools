let rawNBTData = null;  // Global variable to store the raw data
let parsedNBTData = null;  // Global variable to store the parsed NBT data
let originalBlockKeys = [];  // Store the original block keys

function getNBT() {
    const fileInput = document.getElementById('nbtFileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select an NBT file first.');
        return;
    }
    const reader = new FileReader();
    reader.onload = function(event) {
        rawNBTData = event.target.result;
        nbt.parse(rawNBTData, function(error, data) {
            if (error) {
                console.error("Failed to parse NBT data:", error);
                return;
            }
            parsedNBTData = data;  // Store the parsed data

            const table = document.getElementById('nbtDataTable');
            table.innerHTML = '';  // Clear previous rows

            // Add rows for the size values
            const sizeLabels = ['Size X:', 'Size Y:', 'Size Z:'];
            const sizeValues = data.value.size.value.value;
            sizeLabels.forEach((label, index) => {
                const row = table.insertRow();
                row.insertCell().textContent = label;
                const inputCell = row.insertCell();
                const input = document.createElement('input');
                input.type = 'number';
                input.value = sizeValues[index];
                input.id = 'size' + ['X', 'Y', 'Z'][index];
                inputCell.appendChild(input);
            });

            // Extract block keys and display them in input fields
            originalBlockKeys = data.value.structure.value.palette.value.default.value.block_palette.value.value.map(block => block.name.value);
            originalBlockKeys.forEach((key, index) => {
                const row = table.insertRow();
                row.insertCell().textContent = 'Block:';
                const inputCell = row.insertCell();
                const input = document.createElement('input');
                input.value = key;
                input.id = 'blockKey' + index;
                inputCell.appendChild(input);
            });
        });
    };
    reader.readAsArrayBuffer(file);
}

function downloadMCStructure() {
    if (!parsedNBTData) {
        alert('Please load an NBT file first.');
        return;
    }
    // Modify the parsed data with edited keys
    originalBlockKeys.forEach((originalKey, index) => {
        const editedKey = document.getElementById('blockKey' + index).value;
        parsedNBTData.value.structure.value.palette.value.default.value.block_palette.value.value[index].name.value = editedKey;
    });

    // Modify the parsed data with edited size values
    parsedNBTData.value.size.value.value = [
        parseInt(document.getElementById('sizeX').value),
        parseInt(document.getElementById('sizeY').value),
        parseInt(document.getElementById('sizeZ').value)
    ];

    // Re-encode the modified NBT data
    const modifiedNBTData = nbt.writeUncompressed(parsedNBTData);
    downloadAsFile('output.mcstructure', modifiedNBTData, 'application/octet-stream');
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

function downloadTXT() {
    const outputElement = document.getElementById('nbtOutput');
    downloadAsFile('output.txt', rawNBTData, 'text/plain');
}

async function loadAndModifyStructure(filename, blockReplacements) {
    let modifiedNBTData = null;

    try {
        const response = await fetch(`./assets/nbt/${filename}.mcstructure`);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${filename}.mcstructure`);
        }
        const rawStructureData = await response.arrayBuffer();

        nbt.parse(rawStructureData, function(error, data) {
            if (error) {
                console.error("Failed to parse NBT data:", error);
                return;
            }

            // Modify block keys based on the blockReplacements mapping
            data.value.structure.value.palette.value.default.value.block_palette.value.value.forEach(block => {
                const replacement = blockReplacements[block.name.value];
                if (replacement) {
                    block.name.value = replacement;
                }
            });

            modifiedNBTData = nbt.writeUncompressed(data);
        });

    } catch (error) {
        console.error('Error:', error);
    }

    return modifiedNBTData;
}
