const jsonMap = [
    {
        jsonScheme: doorTemplate,
        path: 'bp/blocks',
        baseName: '_door.json'
    },
    {
        jsonScheme: fenceTemplate,
        path: 'bp/blocks',
        baseName: '_fence.json'
    },
    {
        jsonScheme: gateFenceTemplate,
        path: 'bp/blocks',
        baseName: '_fence_gate.json'
    },
    {
        jsonScheme: leavesTemplate,
        path: 'bp/blocks',
        baseName: '_leaves.json'
    },
    {
        jsonScheme: strippedLogTemplate,
        path: 'bp/blocks',
        baseName: '_stripped_log.json'
    },
    {
        jsonScheme: logTemplate,
        path: 'bp/blocks',
        baseName: '_log.json'
    },
    {
        jsonScheme: planksTemplate,
        path: 'bp/blocks',
        baseName: '_planks.json'
    },
    {
        jsonScheme: saplingTemplate,
        path: 'bp/blocks',
        baseName: '_sapling.json'
    },
    {
        jsonScheme: slabTemplate,
        path: 'bp/blocks',
        baseName: '_slab.json'
    },
    {
        jsonScheme: stairsTemplate,
        path: 'bp/blocks',
        baseName: '_stairs.json'
    },
    {
        jsonScheme: strippedWoodTemplate,
        path: 'bp/blocks',
        baseName: '_stripped_wood.json'
    },
    {
        jsonScheme: trapdoorTemplate,
        path: 'bp/blocks',
        baseName: '_trapdoor.json'
    },
    {
        jsonScheme: woodTemplate,
        path: 'bp/blocks',
        baseName: '_wood.json'
    },
    {
        jsonScheme: featureRuleTemplate,
        path: 'bp/feature_rules',
        baseName: '_tree_feature_rule.json'
    },
    {
        jsonScheme: featureTemplate,
        path: 'bp/features',
        baseName: '_tree_feature.json'
    },
    //Entities
    {
        jsonScheme: boatTemplate,
        path: 'bp/entities',
        baseName: '_boat.json'
    },
    {
        jsonScheme: chestBoatTemplate,
        path: 'bp/entities',
        baseName: '_chest_boat.json'
    },
    //Items
    {
        jsonScheme: boatItemTemplate,
        path: 'bp/items',
        baseName: '_boat.json'
    },
    {
        jsonScheme: chestBoatItemTemplate,
        path: 'bp/items',
        baseName: '_chest_boat.json'
    },
    {
        jsonScheme: doorItemTemplate,
        path: 'bp/items',
        baseName: '_door.json'
    },
    {
        jsonScheme: saplingItemTemplate,
        path: 'bp/items',
        baseName: '_sapling.json'
    },
    //Loot Tables
    {
        jsonScheme: doorLootTemplate,
        path: 'bp/loot_tables/blocks',
        baseName: '_door.json'
    },
    {
        jsonScheme: leavesLootTemplate,
        path: 'bp/loot_tables/blocks',
        baseName: '_leaves.json'
    },
    {
        jsonScheme: leaves1LootTemplate,
        path: 'bp/loot_tables/blocks',
        baseName: '_leaves1.json'
    },
    {
        jsonScheme: saplingLootTemplate,
        path: 'bp/loot_tables/blocks',
        baseName: '_sapling.json'
    },
    {
        jsonScheme: slabDoubleLootTemplate,
        path: 'bp/loot_tables/blocks',
        baseName: '_slab_double.json'
    },
    {
        jsonScheme: boatLootTemplate,
        path: 'bp/loot_tables/entities',
        baseName: '_boat.json'
    },
    {
        jsonScheme: chestBoatLootTemplate,
        path: 'bp/loot_tables/entities',
        baseName: '_chest_boat.json'
    },
    //Recipes
    {
        jsonScheme: barrelFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_barrel.json'
    },
    {
        jsonScheme: bedBlackFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_bed_black.json'
    },
    {
        jsonScheme: bedBlueFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_bed_blue.json'
    },
    {
        jsonScheme: bedBrownFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_bed_brown.json'
    },
    {
        jsonScheme: bedCyanFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_bed_cyan.json'
    },
    {
        jsonScheme: bedGrayFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_bed_gray.json'
    },
    {
        jsonScheme: bedGreenFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_bed_green.json'
    },
    {
        jsonScheme: bedLight_blueFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_bed_light_blue.json'
    },
    {
        jsonScheme: bedLimeFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_bed_lime.json'
    },
    {
        jsonScheme: bedMagentaFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_bed_magenta.json'
    },
    {
        jsonScheme: bedOrangeFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_bed_orange.json'
    },
    {
        jsonScheme: bedPinkFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_bed_pink.json'
    },
    {
        jsonScheme: bedPurpleFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_bed_purple.json'
    },
    {
        jsonScheme: bedRedFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_bed_red.json'
    },
    {
        jsonScheme: bedSilverFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_bed_silver.json'
    },
    {
        jsonScheme: bedWhiteFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_bed_white.json'
    },
    {
        jsonScheme: bedYellowFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_bed_yellow.json'
    },
    {
        jsonScheme: beehiveFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_beehive.json'
    },
    {
        jsonScheme: bookshelfFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_bookshelf.json'
    },
    {
        jsonScheme: bowlFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_bowl.json'
    },
    {
        jsonScheme: cartographyTableFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_cartography_table.json'
    },
    {
        jsonScheme: doorCrafting,
        path: 'bp/recipes',
        baseName: '_to_door.json'
    },
    {
        jsonScheme: fenceCrafting,
        path: 'bp/recipes',
        baseName: '_to_fence.json'
    },
    {
        jsonScheme: fenceGateCrafting,
        path: 'bp/recipes',
        baseName: '_to_fence_gate.json'
    },
    {
        jsonScheme: planksCrafting,
        path: 'bp/recipes',
        baseName: '_to_planks.json'
    },
    {
        jsonScheme: planksFromStrippedCrafting,
        path: 'bp/recipes',
        baseName: '_to_planks_from_stripped.json'
    },
    {
        jsonScheme: planksFromStrippedWoodCrafting,
        path: 'bp/recipes',
        baseName: '_to_planks_from_stripped_wood.json'
    },
    {
        jsonScheme: planksFromWoodCrafting,
        path: 'bp/recipes',
        baseName: '_to_planks_from_wood.json'
    },
    {
        jsonScheme: slabCrafting,
        path: 'bp/recipes',
        baseName: '_to_slab.json'
    },
    {
        jsonScheme: stairsCrafting,
        path: 'bp/recipes',
        baseName: '_to_stairs.json'
    },
    {
        jsonScheme: trapDoorCrafting,
        path: 'bp/recipes',
        baseName: '_to_trap_door.json'
    },
    {
        jsonScheme: woodCrafting,
        path: 'bp/recipes',
        baseName: '_to_wood.json'
    },
    {
        jsonScheme: woodStrippedCrafting,
        path: 'bp/recipes',
        baseName: '_to_wood_stripped.json'
    },
    {
        jsonScheme: chestFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_chest.json'
    },
    {
        jsonScheme: composterFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_composter.json'
    },
    {
        jsonScheme: craftingTableFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_crafting_table.json'
    },
    {
        jsonScheme: daylightSensorFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_daylight_sensor.json'
    },
    {
        jsonScheme: fletchingTableFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_fletching_table.json'
    },
    {
        jsonScheme: grindstoneFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_grindstone.json'
    },
    {
        jsonScheme: grindstoneFromCrafting2,
        path: 'bp/recipes',
        baseName: '_to_grindstone2.json'
    },
    {
        jsonScheme: grindstoneFromCrafting3,
        path: 'bp/recipes',
        baseName: '_to_grindstone3.json'
    },
    {
        jsonScheme: grindstoneFromCrafting4,
        path: 'bp/recipes',
        baseName: '_to_grindstone4.json'
    },
    {
        jsonScheme: jukeboxFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_jukebox.json'
    },
    {
        jsonScheme: lecternFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_lectern.json'
    },
    {
        jsonScheme: loomFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_loom.json'
    },
    {
        jsonScheme: noteBlockFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_note_block.json'
    },
    {
        jsonScheme: pistonFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_piston.json'
    },
    {
        jsonScheme: shieldFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_shield.json'
    },
    {
        jsonScheme: smithingTableFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_smithing_table.json'
    },
    {
        jsonScheme: stickFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_stick.json'
    },
    {
        jsonScheme: tripwireHookFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_tripwire_hook.json'
    },
    {
        jsonScheme: woodenAxeFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_wooden_axe.json'
    },
    {
        jsonScheme: woodenHoeFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_wooden_hoe.json'
    },
    {
        jsonScheme: woodenPickaxeFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_wooden_pickaxe.json'
    },
    {
        jsonScheme: woodenShovelFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_wooden_shovel.json'
    },
    {
        jsonScheme: woodenSwordFromCrafting,
        path: 'bp/recipes',
        baseName: '_to_wooden_sword.json'
    },
    //RP
    {
        jsonScheme: animationControllerTemplate,
        path: 'rp/animation_controllers',
        baseName: 'custom_boat.animation_controller.json'
    },
    {
        jsonScheme: animationTemplate,
        path: 'rp/animations',
        baseName: 'custom_boat.animation.json'
    },
    {
        jsonScheme: boatEntityTemplate,
        path: 'rp/entity',
        baseName: '_boat.entity.json'
    },
    {
        jsonScheme: chestBoatEntityTemplate,
        path: 'rp/entity',
        baseName: '_chest_boat.entity.json'
    },
    {
        jsonScheme: doorGeoTemplate,
        path: 'rp/models/blocks',
        baseName: 'custom_door.geo.json'
    },
    {
        jsonScheme: gateGeoTemplate,
        path: 'rp/models/blocks',
        baseName: 'custom_fence_gate.geo.json'
    },
    {
        jsonScheme: fenceGeoTemplate,
        path: 'rp/models/blocks',
        baseName: 'custom_fence.geo.json'
    },
    {
        jsonScheme: saplingGeoTemplate,
        path: 'rp/models/blocks',
        baseName: 'custom_sapling.geo.json'
    },
    {
        jsonScheme: slabBottomGeoTemplate,
        path: 'rp/models/blocks',
        baseName: 'custom_slab_bottom.geo.json'
    },
    {
        jsonScheme: slabTopGeoTemplate,
        path: 'rp/models/blocks',
        baseName: 'custom_slab_top.geo.json'
    },
    {
        jsonScheme: stairsGeoTemplate,
        path: 'rp/models/blocks',
        baseName: 'custom_stairs.geo.json'
    },
    {
        jsonScheme: trapdoorGeoTemplate,
        path: 'rp/models/blocks',
        baseName: 'custom_trapdoor.geo.json'
    },
    {
        jsonScheme: boatGeoTemplate,
        path: 'rp/models/entity',
        baseName: 'custom_boat.geo.json'
    },
    {
        jsonScheme: chestBoatGeoTemplate,
        path: 'rp/models/entity',
        baseName: 'custom_chest_boat.geo.json'
    },
    {
        jsonScheme: renderControllerTemplate,
        path: 'rp/render_controllers',
        baseName: 'custom_boat.render_controller.json'
    },
    {
        jsonScheme: blocksTemplate,
        path: 'rp',
        baseName: 'blocks.json'
    },
    {
        jsonScheme: terrainTextureTemplate,
        path: 'rp/textures',
        baseName: 'terrain_texture.json'
    },
    {
        jsonScheme: itemTextureTemplate,
        path: 'rp/textures',
        baseName: 'item_texture.json'
    },
    {
        jsonScheme: bpManifestTemplate,
        path: 'bp',
        baseName: 'manifest.json'
    },
    {
        jsonScheme: rpManifestTemplate,
        path: 'rp',
        baseName: 'manifest.json'
    },
    {
        jsonScheme: serverLangTemplate,
        path: 'bp/texts',
        baseName: 'en_US.lang'
    },
    {
        jsonScheme: clientLangTemplate,
        path: 'rp/texts',
        baseName: 'en_US.lang'
    },
    {
        jsonScheme: languagesTemplate,
        path: 'bp/texts',
        baseName: 'languages.json'
    },
    {
        jsonScheme: languagesTemplate,
        path: 'rp/texts',
        baseName: 'languages.json'
    }
];
window.jsonMap = jsonMap;