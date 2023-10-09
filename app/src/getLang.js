function processJsonFiles(files) {
    const jsonFiles = Array.from(files).filter(file => file.name.endsWith('.json'));
    let outputText = '';

    for (const file of jsonFiles) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const jsonData = JSON.parse(event.target.result);
            const lines = checkJsonFile(jsonData);
            outputText += lines.join('\n') + '\n';
            document.getElementById('output').value = outputText.trim();
        };
        reader.readAsText(file);
    }
}

function generateOutput(identifier, isEntity, isSpawnable, isBlock) {
    function formatTitle(title) {
        return title.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    }

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

    function processJsonObject(obj) {
        if (typeof obj === 'object' && obj !== null) {
            for (const [key, value] of Object.entries(obj)) {
                if (["interact_text", "feed_text", "ride_text"].includes(key)) {
                    lines.push(`action.interact.${key}=${value}`);
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
