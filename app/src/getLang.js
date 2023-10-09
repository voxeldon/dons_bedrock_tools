function processJsonFiles(files) {
    const jsonFiles = Array.from(files).filter(file => file.name.endsWith('.json'));
    let outputText = '';
    const uniqueLines = new Set(); // This set will store unique lines

    for (const file of jsonFiles) {
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const jsonData = jsoncParse(event.target.result);
                const lines = checkJsonFile(jsonData);
                for (const line of lines) {
                    uniqueLines.add(line); // Add each line to the set
                }
                // Update the output with unique lines
                document.getElementById('output').value = Array.from(uniqueLines).join('\n');
            } catch (error) {
                console.error(`Error parsing file ${file.name}:`, error);
            }
        };
        reader.readAsText(file);
    }
}

function formatTitle(title) {
    if (typeof title !== 'string') return ""; // Return an empty string if title is not a string
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Split by underscore and capitalize each word
    let words = title.split("_").map(word => capitalize(word));

    // Further process each word to replace periods with spaces and capitalize the following word
    words = words.map(word => {
        if (word.includes('.')) {
            return word.split('.').map(capitalize).join(' ');
        }
        return word;
    });

    return words.join(" ");
}

function generateOutput(identifier, isEntity, isSpawnable, isBlock) {  
    const lines = [];
    const title = formatTitle(identifier.split(":").pop());

    if (isEntity) {
        lines.push(`entity.${identifier}.name=${title}`);
        if (isSpawnable) {
            lines.push(`item.spawn_egg.entity.${identifier}.name=Spawn ${title}`);
        }
    } else if (isBlock) {
        lines.push(`tile.${identifier}.name=${title}`);
    } else {
        lines.push(`item.${identifier}.name=${title}`);
    }

    return lines;
}

function processSpecialKeys(jsonData) {
    const lines = [];

    function formatActionValue(value) {
        const parts = value.split('.');
        if (parts.length > 2) {
            const action = capitalize(parts[2]);
            const target = formatTitle(parts[3]);
            return `${action} ${target}`;
        }
        return value;
    }

    function processJsonObject(obj) {
        if (typeof obj === 'object' && obj !== null) {
            for (const [key, value] of Object.entries(obj)) {
                if (["interact_text", "feed_text", "ride_text"].includes(key)) {
                    const formattedValue = key === "interact_text" ? formatActionValue(value) : value;
                    lines.push(`action.interact.${key}=${formattedValue}`);
                } else if (typeof value === 'object') {
                    processJsonObject(value);
                }
            }
        }
    }

    processJsonObject(jsonData);
    return lines;
}


function checkJsonFile(jsonData) {
    const lines = [];
    if (jsonData && typeof jsonData === 'object') {
        const formatVersion = jsonData["format_version"];
        if (formatVersion && typeof formatVersion === 'string') {
            const entityData = jsonData["minecraft:entity"];
            const itemData = jsonData["minecraft:item"];
            const blockData = jsonData["minecraft:block"];

            if (entityData) {
                const identifier = entityData.description?.identifier;
                if (identifier) {
                    const isSpawnable = entityData.description?.is_spawnable || false;
                    lines.push(...generateOutput(identifier, true, isSpawnable, false));
                    lines.push(...processSpecialKeys(jsonData));
                }
            } else if (itemData) {
                const identifier = itemData.description?.identifier;
                if (identifier) {
                    lines.push(...generateOutput(identifier, false, false, false));
                    lines.push(...processSpecialKeys(jsonData));
                }
            } else if (blockData) {
                const identifier = blockData.description?.identifier;
                if (identifier) {
                    lines.push(...generateOutput(identifier, false, false, true));
                    lines.push(...processSpecialKeys(jsonData));
                }
            }
        }
    }
    return lines;
}
