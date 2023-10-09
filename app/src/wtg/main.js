document.getElementById('texturePack').addEventListener('change', async function(e) {
    const files = e.target.files;
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = function(event) {
            uploadedTextures[file.name] = new Blob([event.target.result]);
        };
        reader.readAsArrayBuffer(file);
    }
});

const blockPrefix = [
    'blocks.json','item_texture.json','terrain_texture.json','custom_boat.animation_controller.json',
    'custom_boat.animation.json', `manifest.json`, `en_US.lang`, `languages.json`
];
const bpDirs = ['blocks', 'entities', 'feature_rules', 'features', 'items', 'loot_tables', 'recipes', 'structures', 'texts'];
const rpDirs = ['animations', 'entity', 'models', 'render_controllers', 'texts', 'textures'];

let uploadedTextures = {};

function getInvalidTextureFiles(uploadedFiles) {
    const validTextureFiles = textureMap.map(texture => texture.sourceId + '.png');
    const invalidFiles = [];
    for (let i = 0; i < uploadedFiles.length; i++) {
        if (!validTextureFiles.includes(uploadedFiles[i].name)) {
            invalidFiles.push(uploadedFiles[i].name);
        }
    }
    return invalidFiles;
}

async function downloadTexturePackTemplate() {
    const zip = new JSZip();

    try {
        // Process each texture in the textureMap
        await Promise.all(textureMap.map(async texture => {
            const filename = texture.sourceId + '.png';
            const response = await fetch(`./assets/textures/wtg/${filename}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch ${filename}`);
            }

            const blob = await response.blob();
            log(`Adding texture to zip: ${filename}`);
            zip.file(`wtg/${filename}`, blob);  // <-- Adjusted this line
        }));

        const blob = await zip.generateAsync({ type: "blob" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `texture_pack_template.zip`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    } catch (error) {
        console.error("Error:", error);
        log(`Error: ${error.message}`);
    }
}

async function fetchTexture(sourceId) {
    log(`Verifying texture: ${sourceId}`);
    
    // Check if the texture has been uploaded
    if (uploadedTextures[`${sourceId}.png`]) {
        return uploadedTextures[`${sourceId}.png`];
    } else {
        const response = await fetch(`./assets/textures/wtg/${sourceId}.png`);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${sourceId}.png`);
        }
        return response.blob();
    }
}

async function generateTemplate() {
    const uuid0 = generateUUID();
    const uuid1 = generateUUID();
    const uuid2 = generateUUID();
    const uuid3 = generateUUID();

    const identifier = document.getElementById('identifier').value;
    const woodType = document.getElementById('woodType').value;

    if (!identifier || !woodType) {
        log('Please fill in both Identifier ID and Wood Type.');
        return;
    }

    // Check for valid identifier and woodType format
    if (!isValidNamespace(identifier) || !isValidNamespace(woodType)) {
        log('Error: Invalid namespace format. Use only lowercase letters and underscores.');
        return;
    }

    // Check for valid texture file names if textures are uploaded
    const uploadedFiles = document.getElementById('texturePack').files;
    const invalidFiles = getInvalidTextureFiles(uploadedFiles);
    if (invalidFiles.length > 0) {
        log('Error: The following uploaded texture file names do not match the required format:');
        invalidFiles.forEach(filename => log(filename));
        log('Required format:');
        textureMap.forEach(texture => log(`- ${texture.sourceId}.png`));
        for (let i of textureFiles) {
            log(`- ${i}`)
        }
        return;
    }

    const zip = new JSZip();

    // Create the bp subdirectories
    bpDirs.forEach(dir => {
        zip.folder(`bp/${dir}`);
    });

    // Create the rp subdirectories
    rpDirs.forEach(dir => {
        zip.folder(`rp/${dir}`);
    });

    // Process each file in the map
    const cleanIdentifier = cleanString(identifier);
    const cleanWoodType = cleanString(woodType);

    jsonMap.forEach(file => {
        try {
            let replacedJson = file.jsonScheme
                .replace(/\(identifier.clean\)/g, cleanIdentifier)
                .replace(/\(wood_type.clean\)/g, cleanWoodType)
                .replace(/\(identifier\)/g, identifier)
                .replace(/\(wood_type\)/g, woodType)
                .replace(/\(uuid0\)/g, uuid0)
                .replace(/\(uuid1\)/g, uuid1)
                .replace(/\(uuid2\)/g, uuid2)
                .replace(/\(uuid3\)/g, uuid3);

            let filename;
            if (blockPrefix.includes(file.baseName) || file.baseName.includes('geo')) {
                filename = file.baseName;
            } else {
                filename = `${woodType}${file.baseName}`;
            }

            log(`Adding ${filename}.json`);
            zip.file(`${file.path}/${filename}`, replacedJson);
        } catch (error) {
            console.error(`Error while processing file ${filename}:`, error);
        }
    });

    // Process each texture in the textureMap and return an array of promises
    const texturePromises = textureMap.map(texture => {
        return fetchTexture(texture.sourceId)
            .then(blob => {
                const filename = `${woodType}${texture.baseName}`;
                log(`Adding texture to zip: ${filename}`);
                zip.file(`${texture.path}/${filename}`, blob);
            })
            .catch(error => {
                console.error(`Error while adding texture ${texture.sourceId} to zip:`, error);
                log(`Error while adding texture ${texture.sourceId} to zip:`, error);
            });
    });
    
    // Wait for all the texture promises to resolve
    await Promise.all(texturePromises);

    zip.generateAsync({ type: "blob" })
        .then(function(blob) {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${identifier}_${woodType}_template.zip`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(function(error) {
            console.error("Error while generating zip:", error);
        });
    log('Operation Complete!')
}
