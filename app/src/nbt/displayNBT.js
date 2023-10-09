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

function getNBT() {
    const fileInput = document.getElementById('nbtFileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an NBT file first.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const arrayBuffer = event.target.result;
        nbt.parse(arrayBuffer, function(error, data) {
            if (error) {
                console.error("Failed to parse NBT data:", error);
                return;
            }
            
            // Interpret the NBT data
            const map = interpretNBTData(data);

            // Display the interpreted map (or use it in other functions)
            const outputElement = document.getElementById('nbtOutput');
            outputElement.textContent = JSON.stringify(map, null, 2);
        });
    };
    reader.readAsArrayBuffer(file);
} 