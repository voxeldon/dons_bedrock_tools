const doorTemplate = `
{
	"format_version": "1.20.10",
	"minecraft:block": {
		"description": {
			"identifier": "(identifier):(wood_type)_door_tile",
			"menu_category": {
				"category": "none",
				"is_hidden_in_commands": false
			},
			"properties": {
				"(identifier):open_bit": [false, true],
				"(identifier):hinge_bit": [false, true],
				"(identifier):upper_block_bit": [false, true]
			},
			"traits": {
				"minecraft:placement_direction": {
					"enabled_states": ["minecraft:cardinal_direction"]
				}
			}
		},
		"components": {
			"minecraft:geometry": {
				"identifier": "geometry.custom_door",
				"bone_visibility": {
					"lower_close": "(query.block_property('(identifier):open_bit') == false && query.block_property('(identifier):upper_block_bit') == false && query.block_property('(identifier):hinge_bit') == false) || (query.block_property('(identifier):open_bit') == true && query.block_property('(identifier):upper_block_bit') == false && query.block_property('(identifier):hinge_bit') == true)",
					"lower_open": "(query.block_property('(identifier):open_bit') == true && query.block_property('(identifier):upper_block_bit') == false && query.block_property('(identifier):hinge_bit') == false) || (query.block_property('(identifier):open_bit') == false && query.block_property('(identifier):upper_block_bit') == false && query.block_property('(identifier):hinge_bit') == true)",
					"upper_close": "(query.block_property('(identifier):open_bit') == false && query.block_property('(identifier):upper_block_bit') == true && query.block_property('(identifier):hinge_bit') == false) || (query.block_property('(identifier):open_bit') == true && query.block_property('(identifier):upper_block_bit') == true && query.block_property('(identifier):hinge_bit') == true)",
					"upper_open": "(query.block_property('(identifier):open_bit') == true && query.block_property('(identifier):upper_block_bit') == true && query.block_property('(identifier):hinge_bit') == false) || (query.block_property('(identifier):open_bit') == false && query.block_property('(identifier):upper_block_bit') == true && query.block_property('(identifier):hinge_bit') == true)"
				}
			},
			"minecraft:material_instances": {
				"*": {
					"texture": "(wood_type)_door_lower",
					"render_method": "blend",
					"face_dimming": true,
					"ambient_occlusion": false
				},
				"upper": {
					"texture": "(wood_type)_door_upper",
					"render_method": "blend",
					"face_dimming": true,
					"ambient_occlusion": false
				}
			},
			"minecraft:light_dampening": 0,
			"minecraft:destructible_by_mining": {
				"seconds_to_destroy": 0.5
			},
			"minecraft:loot": "loot_tables/empty.json",
			"minecraft:selection_box": {
				"origin": [
					-8,
					0,
					-8
				],
				"size": [
					16,
					16,
					3
				]
			},
			"minecraft:collision_box": {
				"origin": [
					-8,
					0,
					-8
				],
				"size": [
					16,
					16,
					3
				]
			},
			"minecraft:on_placed": {
				"event": "on_placed"
			},
			"tag:(identifier):(wood_type)_door": {},
			"tag:wood": {}
		},
		"permutations": [
			{
				"condition": "query.block_property('minecraft:cardinal_direction') == 'north'",
				"components": {
					"minecraft:transformation": {
						"rotation": [0, 180, 0]
					}
				}
			},
			{
				"condition": "query.block_property('minecraft:cardinal_direction') == 'south'",
				"components": {
					"minecraft:transformation": {
						"rotation": [0, 0, 0]
					}
				}
			},
			{
				"condition": "query.block_property('minecraft:cardinal_direction') == 'west'",
				"components": {
					"minecraft:transformation": {
						"rotation": [0, 270, 0]
					}
				}
			},
			{
				"condition": "query.block_property('minecraft:cardinal_direction') == 'east'",
				"components": {
					"minecraft:transformation": {
						"rotation": [0, 90, 0]
					}
				}
			},//Open and close events-tags
			{
				"condition": "query.block_property('(identifier):open_bit') == false",
				"components": {
					"minecraft:on_interact": {
						"event": "open"
					},
					"tag:(identifier):close_(wood_type)_door": {}
				}
			},
			{
				"condition": "query.block_property('(identifier):open_bit') == true",
				"components": {
					"minecraft:on_interact": {
						"event": "close"
					},
					"tag:(identifier):open_(wood_type)_door": {}
				}
			},//Hinge states tags
			{
				"condition": "query.block_property('(identifier):hinge_bit') == false",
				"components": {
					"tag:(identifier):left_(wood_type)_door": {}
				}
			},
			{
				"condition": "query.block_property('(identifier):hinge_bit') == true",
				"components": {
					"tag:(identifier):right_(wood_type)_door": {}
				}
			},//Upper and lower block events and tags
			{
				"condition": "query.block_property('(identifier):upper_block_bit') == false",
				"components": {
					"minecraft:placement_filter": {
						"conditions": [
							{
								"allowed_faces": [
									"up"
								]
							}
						]
					},
					"minecraft:queued_ticking": {
						"looping": true,
						"interval_range": [4, 4],
						"on_tick": {
							"event": "checker"
						}
					},
					"minecraft:loot": "loot_tables/blocks/(wood_type)_door.json",
					"tag:(identifier):lower_(wood_type)_door": {}
				}
			},
			{
				"condition": "query.block_property('(identifier):upper_block_bit') == true",
				"components": {
					"minecraft:placement_filter": {
						"conditions": [
							{
								"allowed_faces": [
									"up"
								],
								"block_filter": [
									"(identifier):(wood_type)_door_tile"
								]
							}
						]
					},
					"minecraft:loot": "loot_tables/empty.json",
					"tag:(identifier):upper_(wood_type)_door": {}
				}
			},//Open trasnformation to change the model only
			{
				"condition": "query.block_property('(identifier):hinge_bit') == false && query.block_property('(identifier):open_bit') == true && query.block_property('minecraft:cardinal_direction') == 'north'",
				"components": {
					"minecraft:transformation": {
						"rotation": [0, 90, 0]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):hinge_bit') == false && query.block_property('(identifier):open_bit') == true && query.block_property('minecraft:cardinal_direction') == 'south'",
				"components": {
					"minecraft:transformation": {
						"rotation": [0, -90, 0]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):hinge_bit') == false && query.block_property('(identifier):open_bit') == true && query.block_property('minecraft:cardinal_direction') == 'west'",
				"components": {
					"minecraft:transformation": {
						"rotation": [0, 180, 0]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):hinge_bit') == false && query.block_property('(identifier):open_bit') == true && query.block_property('minecraft:cardinal_direction') == 'east'",
				"components": {
					"minecraft:transformation": {
						"rotation": [0, 0, 0]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):hinge_bit') == true && query.block_property('(identifier):open_bit') == true && query.block_property('minecraft:cardinal_direction') == 'north'",
				"components": {
					"minecraft:transformation": {
						"rotation": [0, -90, 0]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):hinge_bit') == true && query.block_property('(identifier):open_bit') == true && query.block_property('minecraft:cardinal_direction') == 'south'",
				"components": {
					"minecraft:transformation": {
						"rotation": [0, 90, 0]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):hinge_bit') == true && query.block_property('(identifier):open_bit') == true && query.block_property('minecraft:cardinal_direction') == 'west'",
				"components": {
					"minecraft:transformation": {
						"rotation": [0, 0, 0]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):hinge_bit') == true && query.block_property('(identifier):open_bit') == true && query.block_property('minecraft:cardinal_direction') == 'east'",
				"components": {
					"minecraft:transformation": {
						"rotation": [0, 180, 0]
					}
				}
			}
		],
		"events": {
			"on_placed": {
				"sequence": [
					{
						"condition": "query.block_property('(identifier):upper_block_bit') == false",
						"trigger": "upper_block"
					},//Hinge sequence
					{
						"sequence": [
							{
								"condition": "query.block_property('minecraft:cardinal_direction') == 'north' && query.block_neighbor_has_any_tag(-1,0,0,'(identifier):(wood_type)_door') && !query.block_neighbor_has_any_tag(1,0,0,'(identifier):right_(wood_type)_door')",
								"set_block_property": {
									"(identifier):hinge_bit": true
								}
							},
							{
								"condition": "query.block_property('minecraft:cardinal_direction') == 'south' && query.block_neighbor_has_any_tag(1,0,0,'(identifier):(wood_type)_door') && !query.block_neighbor_has_any_tag(-1,0,0,'(identifier):right_(wood_type)_door')",
								"set_block_property": {
									"(identifier):hinge_bit": true
								}
							},
							{
								"condition": "query.block_property('minecraft:cardinal_direction') == 'west' && query.block_neighbor_has_any_tag(0,0,1,'(identifier):(wood_type)_door') && !query.block_neighbor_has_any_tag(0,0,-1,'(identifier):right_(wood_type)_door')",
								"set_block_property": {
									"(identifier):hinge_bit": true
								}
							},
							{
								"condition": "(query.block_property('minecraft:cardinal_direction') == 'east' && query.block_neighbor_has_any_tag(0,0,-1,'(identifier):(wood_type)_door') && !query.block_neighbor_has_any_tag(0,0,1,'(identifier):right_(wood_type)_door')) || (query.block_neighbor_has_any_tag(0,-1,0,'(identifier):right_(wood_type)_door')&&query.block_property('(identifier):upper_block_bit') == true)",
								"set_block_property": {
									"(identifier):hinge_bit": true
								}
							}
						]
					}
				]
			},
			"open": {
				"sequence": [
					{
						"run_command": {
							"command": "playsound open.wooden_door @a ~ ~ ~"
						}
					},
					{
						"sequence": [
							{
								"condition": "q.block_property('(identifier):upper_block_bit') == false&&q.block_property('minecraft:cardinal_direction') == 'north'",
								"set_block_property": {
									"(identifier):open_bit": true
								},
								"run_command": {
									"command": "setblock ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"north\\",\\"(identifier):upper_block_bit\\"=true,\\"(identifier):open_bit\\"=true]"
								}
							}
						]
					},
					{
						"sequence": [
							{
								"condition": "q.block_property('(identifier):upper_block_bit') == true&&q.block_property('minecraft:cardinal_direction') == 'north'",
								"set_block_property": {
									"(identifier):open_bit": true
								},
								"run_command": {
									"command": "setblock ~ ~-1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"north\\",\\"(identifier):upper_block_bit\\"=false,\\"(identifier):open_bit\\"=true]"
								}
							}
						]
					},
					{
						"sequence": [
							{
								"condition": "q.block_property('(identifier):upper_block_bit') == false&&q.block_property('minecraft:cardinal_direction') == 'south'",
								"set_block_property": {
									"(identifier):open_bit": true
								},
								"run_command": {
									"command": "setblock ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"south\\",\\"(identifier):upper_block_bit\\"=true,\\"(identifier):open_bit\\"=true]"
								}
							}
						]
					},
					{
						"sequence": [
							{
								"condition": "q.block_property('(identifier):upper_block_bit') == true&&q.block_property('minecraft:cardinal_direction') == 'south'",
								"set_block_property": {
									"(identifier):open_bit": true
								},
								"run_command": {
									"command": "setblock ~ ~-1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"south\\",\\"(identifier):upper_block_bit\\"=false,\\"(identifier):open_bit\\"=true]"
								}
							}
						]
					},
					{
						"sequence": [
							{
								"condition": "q.block_property('(identifier):upper_block_bit') == false&&q.block_property('minecraft:cardinal_direction') == 'west'",
								"set_block_property": {
									"(identifier):open_bit": true
								},
								"run_command": {
									"command": "setblock ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"west\\",\\"(identifier):upper_block_bit\\"=true,\\"(identifier):open_bit\\"=true]"
								}
							}
						]
					},
					{
						"sequence": [
							{
								"condition": "q.block_property('(identifier):upper_block_bit') == true&&q.block_property('minecraft:cardinal_direction') == 'west'",
								"set_block_property": {
									"(identifier):open_bit": true
								},
								"run_command": {
									"command": "setblock ~ ~-1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"west\\",\\"(identifier):upper_block_bit\\"=false,\\"(identifier):open_bit\\"=true]"
								}
							}
						]
					},
					{
						"sequence": [
							{
								"condition": "q.block_property('(identifier):upper_block_bit') == false&&q.block_property('minecraft:cardinal_direction') == 'east'",
								"set_block_property": {
									"(identifier):open_bit": true
								},
								"run_command": {
									"command": "setblock ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"east\\",\\"(identifier):upper_block_bit\\"=true,\\"(identifier):open_bit\\"=true]"
								}
							}
						]
					},
					{
						"sequence": [
							{
								"condition": "q.block_property('(identifier):upper_block_bit') == true&&q.block_property('minecraft:cardinal_direction') == 'east'",
								"set_block_property": {
									"(identifier):open_bit": true
								},
								"run_command": {
									"command": "setblock ~ ~-1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"east\\",\\"(identifier):upper_block_bit\\"=false,\\"(identifier):open_bit\\"=true]"
								}
							}
						]
					}
				]
			},
			"close": {
				"sequence": [
					{
						"run_command": {
							"command": "playsound close.wooden_door @a ~ ~ ~"
						}
					},
					{
						"sequence": [
							{
								"condition": "q.block_property('(identifier):upper_block_bit') == false&&q.block_property('minecraft:cardinal_direction') == 'north'",
								"set_block_property": {
									"(identifier):open_bit": false
								},
								"run_command": {
									"command": "setblock ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"north\\",\\"(identifier):upper_block_bit\\"=true,\\"(identifier):open_bit\\"=false]"
								}
							}
						]
					},
					{
						"sequence": [
							{
								"condition": "q.block_property('(identifier):upper_block_bit') == true&&q.block_property('minecraft:cardinal_direction') == 'north'",
								"set_block_property": {
									"(identifier):open_bit": false
								},
								"run_command": {
									"command": "setblock ~ ~-1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"north\\",\\"(identifier):upper_block_bit\\"=false,\\"(identifier):open_bit\\"=false]"
								}
							}
						]
					},
					{
						"sequence": [
							{
								"condition": "q.block_property('(identifier):upper_block_bit') == false&&q.block_property('minecraft:cardinal_direction') == 'south'",
								"set_block_property": {
									"(identifier):open_bit": false
								},
								"run_command": {
									"command": "setblock ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"south\\",\\"(identifier):upper_block_bit\\"=true,\\"(identifier):open_bit\\"=false]"
								}
							}
						]
					},
					{
						"sequence": [
							{
								"condition": "q.block_property('(identifier):upper_block_bit') == true&&q.block_property('minecraft:cardinal_direction') == 'south'",
								"set_block_property": {
									"(identifier):open_bit": false
								},
								"run_command": {
									"command": "setblock ~ ~-1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"south\\",\\"(identifier):upper_block_bit\\"=false,\\"(identifier):open_bit\\"=false]"
								}
							}
						]
					},
					{
						"sequence": [
							{
								"condition": "q.block_property('(identifier):upper_block_bit') == false&&q.block_property('minecraft:cardinal_direction') == 'west'",
								"set_block_property": {
									"(identifier):open_bit": false
								},
								"run_command": {
									"command": "setblock ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"west\\",\\"(identifier):upper_block_bit\\"=true,\\"(identifier):open_bit\\"=false]"
								}
							}
						]
					},
					{
						"sequence": [
							{
								"condition": "q.block_property('(identifier):upper_block_bit') == true&&q.block_property('minecraft:cardinal_direction') == 'west'",
								"set_block_property": {
									"(identifier):open_bit": false
								},
								"run_command": {
									"command": "setblock ~ ~-1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"west\\",\\"(identifier):upper_block_bit\\"=false,\\"(identifier):open_bit\\"=false]"
								}
							}
						]
					},
					{
						"sequence": [
							{
								"condition": "q.block_property('(identifier):upper_block_bit') == false&&q.block_property('minecraft:cardinal_direction') == 'east'",
								"set_block_property": {
									"(identifier):open_bit": false
								},
								"run_command": {
									"command": "setblock ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"east\\",\\"(identifier):upper_block_bit\\"=true,\\"(identifier):open_bit\\"=false]"
								}
							}
						]
					},
					{
						"sequence": [
							{
								"condition": "q.block_property('(identifier):upper_block_bit') == true&&q.block_property('minecraft:cardinal_direction') == 'east'",
								"set_block_property": {
									"(identifier):open_bit": false
								},
								"run_command": {
									"command": "setblock ~ ~-1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"east\\",\\"(identifier):upper_block_bit\\"=false,\\"(identifier):open_bit\\"=false]"
								}
							}
						]
					}
				]
			},
			"upper_block": {//Sequence to set an upper block
				"sequence": [
					{
						"condition": "query.block_property('minecraft:cardinal_direction') == 'north'",
						"run_command": {
							"command": [
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"north\\",\\"(identifier):upper_block_bit\\"=true] replace air",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"north\\",\\"(identifier):upper_block_bit\\"=true] replace water",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"north\\",\\"(identifier):upper_block_bit\\"=true] replace flowing_water",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"north\\",\\"(identifier):upper_block_bit\\"=true] replace lava",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"north\\",\\"(identifier):upper_block_bit\\"=true] replace flowing_lava",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"north\\",\\"(identifier):upper_block_bit\\"=true] replace seagrass",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"north\\",\\"(identifier):upper_block_bit\\"=true] replace double_plant",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"north\\",\\"(identifier):upper_block_bit\\"=true] replace vine"
							]
						}
					},
					{
						"condition": "query.block_property('minecraft:cardinal_direction') == 'south'",
						"run_command": {
							"command": [
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"south\\",\\"(identifier):upper_block_bit\\"=true] replace air",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"south\\",\\"(identifier):upper_block_bit\\"=true] replace water",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"south\\",\\"(identifier):upper_block_bit\\"=true] replace flowing_water",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"south\\",\\"(identifier):upper_block_bit\\"=true] replace lava",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"south\\",\\"(identifier):upper_block_bit\\"=true] replace flowing_lava",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"south\\",\\"(identifier):upper_block_bit\\"=true] replace seagrass",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"south\\",\\"(identifier):upper_block_bit\\"=true] replace double_plant",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"south\\",\\"(identifier):upper_block_bit\\"=true] replace vine"
							]
						}
					},
					{
						"condition": "query.block_property('minecraft:cardinal_direction') == 'west'",
						"run_command": {
							"command": [
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"west\\",\\"(identifier):upper_block_bit\\"=true] replace air",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"west\\",\\"(identifier):upper_block_bit\\"=true] replace water",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"west\\",\\"(identifier):upper_block_bit\\"=true] replace flowing_water",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"west\\",\\"(identifier):upper_block_bit\\"=true] replace lava",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"west\\",\\"(identifier):upper_block_bit\\"=true] replace flowing_lava",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"west\\",\\"(identifier):upper_block_bit\\"=true] replace seagrass",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"west\\",\\"(identifier):upper_block_bit\\"=true] replace double_plant",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"west\\",\\"(identifier):upper_block_bit\\"=true] replace vine"
							]
						}
					},
					{
						"condition": "query.block_property('minecraft:cardinal_direction') == 'east'",
						"run_command": {
							"command": [
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"east\\",\\"(identifier):upper_block_bit\\"=true] replace air",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"east\\",\\"(identifier):upper_block_bit\\"=true] replace water",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"east\\",\\"(identifier):upper_block_bit\\"=true] replace flowing_water",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"east\\",\\"(identifier):upper_block_bit\\"=true] replace lava",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"east\\",\\"(identifier):upper_block_bit\\"=true] replace flowing_lava",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"east\\",\\"(identifier):upper_block_bit\\"=true] replace seagrass",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"east\\",\\"(identifier):upper_block_bit\\"=true] replace double_plant",
								"fill ~ ~1 ~ ~ ~1 ~ (identifier):(wood_type)_door_tile[\\"minecraft:cardinal_direction\\"=\\"east\\",\\"(identifier):upper_block_bit\\"=true] replace vine"
							]
						}
					}
				]
			},
			"checker": {
				"sequence": [
					{
						"condition": "query.block_neighbor_has_any_tag(0,1,0,'(identifier):right_(wood_type)_door')",
						"set_block_property": {
							"(identifier):hinge_bit": true
						}
					},
					{
						"condition": "!query.block_neighbor_has_any_tag(0,1,0,'(identifier):upper_(wood_type)_door')",
						"die": {}
					}
				]
			}
		}
	}
}
`
window.doorTemplate = doorTemplate;
const fenceTemplate = `
{
	"format_version": "1.20.10",
	"minecraft:block": {
		"description": {
			"identifier": "(identifier):(wood_type)_fence",
			"menu_category": {
				"category": "construction",
				"group": "itemGroup.name.fence"
			},
			"properties": {
				"(identifier):placed_bit": [
					0,
					1
				],
				"(identifier):north": [false, true],
				"(identifier):south": [false, true],
				"(identifier):west": [false, true],
				"(identifier):east": [false, true]
			}
		},
		"components": {
			"minecraft:material_instances": {
				"*": {
					"texture": "(wood_type)_planks",
					"render_method": "alpha_test"
				}
			},
			"minecraft:map_color": "#52221D",
			"minecraft:destructible_by_mining": {
				"seconds_to_destroy": 0.5
			},
			"minecraft:flammable": true,
			"minecraft:geometry": {
				"identifier": "geometry.custom_fence",
				"bone_visibility": {
					"render": "query.block_property('(identifier):placed_bit') == 0",
					"fence": "query.block_property('(identifier):placed_bit') == 1",
					"north": "query.block_property('(identifier):north') == true && query.block_property('(identifier):placed_bit') == 1",
					"south": "query.block_property('(identifier):south') == true && query.block_property('(identifier):placed_bit') == 1",
					"west": "query.block_property('(identifier):west') == true && query.block_property('(identifier):placed_bit') == 1",
					"east": "query.block_property('(identifier):east') == true && query.block_property('(identifier):placed_bit') == 1"
				}
			},
			"minecraft:light_dampening": 0,
			"minecraft:on_player_placing": {
				"event": "placed_bit"
			},
			"minecraft:on_placed": {
				"event": "placed_bit"
			},
			"minecraft:queued_ticking": {
				"looping": true,
				"interval_range": [
					0,
					0
				],
				"on_tick": {
					"event": "detect"
				}
			},
			"minecraft:transformation": {
				"translation": [0, 0.3, 0]
			},
			"tag:wood": {},
			"tag:custom_fence": {}
		},
		"permutations": [
			{
				"condition": "query.block_property('(identifier):north') == false && query.block_property('(identifier):south') == false && query.block_property('(identifier):west') == false && query.block_property('(identifier):east') == false",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-2,
							0,
							-2
						],
						"size": [
							4,
							16,
							4
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-2,
							0,
							-2
						],
						"size": [
							4,
							11,
							4
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):north') == true && query.block_property('(identifier):south') == false && query.block_property('(identifier):west') == false && query.block_property('(identifier):east') == false",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-2,
							0,
							-8
						],
						"size": [
							4,
							16,
							10
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-2,
							0,
							-8
						],
						"size": [
							4,
							11,
							10
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):north') == false && query.block_property('(identifier):south') == true && query.block_property('(identifier):west') == false && query.block_property('(identifier):east') == false",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-2,
							0,
							-2
						],
						"size": [
							4,
							16,
							10
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-2,
							0,
							-2
						],
						"size": [
							4,
							11,
							10
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):north') == false && query.block_property('(identifier):south') == false && query.block_property('(identifier):west') == false && query.block_property('(identifier):east') == true",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-8,
							0,
							-2
						],
						"size": [
							10,
							16,
							4
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-8,
							0,
							-2
						],
						"size": [
							10,
							11,
							4
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):north') == false && query.block_property('(identifier):south') == false && query.block_property('(identifier):west') == true && query.block_property('(identifier):east') == false",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-2,
							0,
							-2
						],
						"size": [
							10,
							16,
							4
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-2,
							0,
							-2
						],
						"size": [
							10,
							11,
							4
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):north') == true && query.block_property('(identifier):south') == true && query.block_property('(identifier):west') == false && query.block_property('(identifier):east') == false",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-2,
							0,
							-8
						],
						"size": [
							4,
							16,
							16
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-2,
							0,
							-8
						],
						"size": [
							4,
							11,
							16
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):north') == false && query.block_property('(identifier):south') == false && query.block_property('(identifier):west') == true && query.block_property('(identifier):east') == true",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-8,
							0,
							-2
						],
						"size": [
							16,
							16,
							4
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-8,
							0,
							-2
						],
						"size": [
							16,
							11,
							4
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):north') == true && query.block_property('(identifier):south') == false && query.block_property('(identifier):west') == false && query.block_property('(identifier):east') == true",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-2,
							0,
							-2
						],
						"size": [
							4,
							16,
							4
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-8,
							0,
							-8
						],
						"size": [
							10,
							11,
							10
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):north') == true && query.block_property('(identifier):south') == false && query.block_property('(identifier):west') == true && query.block_property('(identifier):east') == false",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-2,
							0,
							-2
						],
						"size": [
							4,
							16,
							4
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-2,
							0,
							-8
						],
						"size": [
							10,
							11,
							10
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):north') == false && query.block_property('(identifier):south') == true && query.block_property('(identifier):west') == false && query.block_property('(identifier):east') == true",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-2,
							0,
							-2
						],
						"size": [
							4,
							16,
							4
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-8,
							0,
							-2
						],
						"size": [
							10,
							11,
							10
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):north') == false && query.block_property('(identifier):south') == true && query.block_property('(identifier):west') == true && query.block_property('(identifier):east') == false",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-2,
							0,
							-2
						],
						"size": [
							4,
							16,
							4
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-2,
							0,
							-2
						],
						"size": [
							10,
							11,
							10
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):north') == true && query.block_property('(identifier):south') == true && query.block_property('(identifier):west') == true && query.block_property('(identifier):east') == false",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-2,
							0,
							-8
						],
						"size": [
							4,
							16,
							16
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-2,
							0,
							-8
						],
						"size": [
							10,
							11,
							16
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):north') == true && query.block_property('(identifier):south') == true && query.block_property('(identifier):west') == false && query.block_property('(identifier):east') == true",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-2,
							0,
							-8
						],
						"size": [
							4,
							16,
							16
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-8,
							0,
							-8
						],
						"size": [
							10,
							11,
							16
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):north') == true && query.block_property('(identifier):south') == false && query.block_property('(identifier):west') == true && query.block_property('(identifier):east') == true",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-8,
							0,
							-2
						],
						"size": [
							16,
							16,
							4
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-8,
							0,
							-8
						],
						"size": [
							16,
							11,
							10
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):north') == false && query.block_property('(identifier):south') == true && query.block_property('(identifier):west') == true && query.block_property('(identifier):east') == true",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-8,
							0,
							-2
						],
						"size": [
							16,
							16,
							4
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-8,
							0,
							-2
						],
						"size": [
							16,
							11,
							10
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):north') == true && query.block_property('(identifier):south') == true && query.block_property('(identifier):west') == true && query.block_property('(identifier):east') == true",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-8,
							0,
							-2
						],
						"size": [
							16,
							16,
							4
						]
					}
				}
			}
		],
		"events": {
			"detect": {
				"sequence": [
					{
						"condition": "query.block_neighbor_has_any_tag(0,0,-1,'custom_fence','metal','wood','stone','wood_pick_diggable','stone_pick_diggable','iron_pick_diggable','diamond_pick_diggable','netherite_pick_diggable','dirt','sand','gravel','grass','snow')",
						"set_block_property": {
							"(identifier):north": true
						}
					},
					{
						"condition": "!query.block_neighbor_has_any_tag(0,0,-1,'custom_fence','metal','wood','stone','wood_pick_diggable','stone_pick_diggable','iron_pick_diggable','diamond_pick_diggable','netherite_pick_diggable','dirt','sand','gravel','grass','snow')",
						"set_block_property": {
							"(identifier):north": false
						}
					},
					{
						"condition": "query.block_neighbor_has_any_tag(0,0,1,'custom_fence','metal','wood','stone','wood_pick_diggable','stone_pick_diggable','iron_pick_diggable','diamond_pick_diggable','netherite_pick_diggable','dirt','sand','gravel','grass','snow')",
						"set_block_property": {
							"(identifier):south": true
						}
					},
					{
						"condition": "!query.block_neighbor_has_any_tag(0,0,1,'custom_fence','metal','wood','stone','wood_pick_diggable','stone_pick_diggable','iron_pick_diggable','diamond_pick_diggable','netherite_pick_diggable','dirt','sand','gravel','grass','snow')",
						"set_block_property": {
							"(identifier):south": false
						}
					},
					{
						"condition": "query.block_neighbor_has_any_tag(-1,0,0,'custom_fence','metal','wood','stone','wood_pick_diggable','stone_pick_diggable','iron_pick_diggable','diamond_pick_diggable','netherite_pick_diggable','dirt','sand','gravel','grass','snow')",
						"set_block_property": {
							"(identifier):west": true
						}
					},
					{
						"condition": "!query.block_neighbor_has_any_tag(-1,0,0,'custom_fence','metal','wood','stone','wood_pick_diggable','stone_pick_diggable','iron_pick_diggable','diamond_pick_diggable','netherite_pick_diggable','dirt','sand','gravel','grass','snow')",
						"set_block_property": {
							"(identifier):west": false
						}
					},
					{
						"condition": "query.block_neighbor_has_any_tag(1,0,0,'custom_fence','metal','wood','stone','wood_pick_diggable','stone_pick_diggable','iron_pick_diggable','diamond_pick_diggable','netherite_pick_diggable','dirt','sand','gravel','grass','snow')",
						"set_block_property": {
							"(identifier):east": true
						}
					},
					{
						"condition": "!query.block_neighbor_has_any_tag(1,0,0,'custom_fence','metal','wood','stone','wood_pick_diggable','stone_pick_diggable','iron_pick_diggable','diamond_pick_diggable','netherite_pick_diggable','dirt','sand','gravel','grass','snow')",
						"set_block_property": {
							"(identifier):east": false
						}
					}
				]
			},
			"placed_bit": {
				"set_block_property": {
					"(identifier):placed_bit": 1
				}
			}
		}
	}
}
`
window.fenceTemplate = fenceTemplate;
const gateFenceTemplate = `
{
	"format_version": "1.20.10",
	"minecraft:block": {
		"description": {
			"identifier": "(identifier):(wood_type)_fence_gate",
			"menu_category": {
				"category": "construction",
				"group": "itemGroup.name.fenceGate"
			},
			"properties": {
				"(identifier):placed_bit": [
					0,
					1
				],
				"(identifier):open_bit": [
					false,
					true
				]
			},
			"traits": {
				"minecraft:placement_direction": {
					"enabled_states": ["minecraft:cardinal_direction"]
				}
			}
		},
		"components": {
			"minecraft:material_instances": {
				"*": {
					"texture": "(wood_type)_planks",
					"render_method": "alpha_test"
				}
			},
			"minecraft:map_color": "#52221D",
			"minecraft:destructible_by_mining": {
				"seconds_to_destroy": 0.5
			},
			"minecraft:geometry": {
				"identifier": "geometry.custom_fence_gate",
				"bone_visibility": {
					"render": "query.block_property('(identifier):placed_bit') == 0",
					"fence_gate": "query.block_property('(identifier):placed_bit') == 1",
					"northsouth": "query.block_property('(identifier):placed_bit') == 1 && (query.block_property('minecraft:cardinal_direction') == 'north' || query.block_property('minecraft:cardinal_direction') == 'south')",
					"nsclose": "query.block_property('(identifier):placed_bit') == 1 && query.block_property('(identifier):open_bit') == false && (query.block_property('minecraft:cardinal_direction') == 'north' || query.block_property('minecraft:cardinal_direction') == 'south')",
					"nsopen_north": "query.block_property('(identifier):placed_bit') == 1 && (query.block_property('(identifier):open_bit') == true && query.block_property('minecraft:cardinal_direction') == 'north')",
					"nsopen_south": "query.block_property('(identifier):placed_bit') == 1 && (query.block_property('(identifier):open_bit') == true && query.block_property('minecraft:cardinal_direction') == 'south')",
					"westeast": "query.block_property('(identifier):placed_bit') == 1 && (query.block_property('minecraft:cardinal_direction') == 'west' || query.block_property('minecraft:cardinal_direction') == 'east')",
					"weclose": "query.block_property('(identifier):placed_bit') == 1 && query.block_property('(identifier):open_bit') == false && (query.block_property('minecraft:cardinal_direction') == 'west' || query.block_property('minecraft:cardinal_direction') == 'east')",
					"weopen_west": "query.block_property('(identifier):placed_bit') == 1 && (query.block_property('(identifier):open_bit') == true && query.block_property('minecraft:cardinal_direction') == 'west')",
					"weopen_east": "query.block_property('(identifier):placed_bit') == 1 && (query.block_property('(identifier):open_bit') == true && query.block_property('minecraft:cardinal_direction') == 'east')"
				}
			},
			"minecraft:light_dampening": 0,
			"minecraft:on_player_placing": {
				"event": "placed_bit"
			},
			"minecraft:on_placed": {
				"event": "placed_bit"
			},
			"minecraft:transformation": {
				"translation": [0, 0.3, 0]
			},
			"tag:wood": {},
			"tag:custom_fence": {}
		},
		"permutations": [
			{
				"condition": "query.block_property('(identifier):open_bit') == false",
				"components": {
					"minecraft:on_interact": {
						"event": "open"
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):open_bit') == true",
				"components": {
					"minecraft:on_interact": {
						"event": "close"
					},
					"minecraft:collision_box": false
				}
			},
			{
				"condition": "query.block_property('minecraft:cardinal_direction') == 'north' || query.block_property('minecraft:cardinal_direction') == 'south'",
				"components": {
					"minecraft:selection_box": {
						"origin": [
							-8,
							0,
							-2
						],
						"size": [
							16,
							11,
							4
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):open_bit') == false && (query.block_property('minecraft:cardinal_direction') == 'north' || query.block_property('minecraft:cardinal_direction') == 'south')",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-8,
							0,
							-2
						],
						"size": [
							16,
							16,
							4
						]
					}
				}
			},
			{
				"condition": "query.block_property('minecraft:cardinal_direction') == 'west' || query.block_property('minecraft:cardinal_direction') == 'east'",
				"components": {
					"minecraft:selection_box": {
						"origin": [
							-2,
							0,
							-8
						],
						"size": [
							4,
							11,
							16
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):open_bit') == false && (query.block_property('minecraft:cardinal_direction') == 'west' || query.block_property('minecraft:cardinal_direction') == 'east')",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-2,
							0,
							-8
						],
						"size": [
							4,
							16,
							16
						]
					}
				}
			}
		],
		"events": {
			"open": {
				"sequence": [
					{
						"condition": "query.cardinal_facing_2d==2&&(query.block_property('minecraft:cardinal_direction') == 'north'||query.block_property('minecraft:cardinal_direction') == 'south')",
						"set_block_property": {
							"minecraft:cardinal_direction": "'north'",
							"(identifier):open_bit": true
						}
					},
					{
						"condition": "query.cardinal_facing_2d==3&&(query.block_property('minecraft:cardinal_direction') == 'north'||query.block_property('minecraft:cardinal_direction') == 'south')",
						"set_block_property": {
							"minecraft:cardinal_direction": "'south'",
							"(identifier):open_bit": true
						}
					},
					{
						"condition": "query.block_property('minecraft:cardinal_direction') == 'north'||query.block_property('minecraft:cardinal_direction') == 'south'",
						"set_block_property": {
							"(identifier):open_bit": true
						},
						"run_command": {
							"command": [
								"playsound open.fence_gate @a ~ ~ ~"
							]
						}
					},
					{
						"condition": "query.cardinal_facing_2d==4&&(query.block_property('minecraft:cardinal_direction') == 'west'||query.block_property('minecraft:cardinal_direction') == 'east')",
						"set_block_property": {
							"minecraft:cardinal_direction": "'east'",
							"(identifier):open_bit": true
						}
					},
					{
						"condition": "query.cardinal_facing_2d==5&&(query.block_property('minecraft:cardinal_direction') == 'west'||query.block_property('minecraft:cardinal_direction') == 'east')",
						"set_block_property": {
							"minecraft:cardinal_direction": "'west'",
							"(identifier):open_bit": true
						}
					},
					{
						"condition": "query.block_property('minecraft:cardinal_direction') == 'west'||query.block_property('minecraft:cardinal_direction') == 'east'",
						"set_block_property": {
							"(identifier):open_bit": true
						},
						"run_command": {
							"command": [
								"playsound open.fence_gate @a ~ ~ ~"
							]
						}
					}
				]
			},
			"close": {
				"sequence": [
					{
						"condition": "query.cardinal_facing_2d==2&&(query.block_property('minecraft:cardinal_direction') == 'north'||query.block_property('minecraft:cardinal_direction') == 'south')",
						"set_block_property": {
							"minecraft:cardinal_direction": "'north'",
							"(identifier):open_bit": false
						}
					},
					{
						"condition": "query.cardinal_facing_2d==3&&(query.block_property('minecraft:cardinal_direction') == 'north'||query.block_property('minecraft:cardinal_direction') == 'south')",
						"set_block_property": {
							"minecraft:cardinal_direction": "'south'",
							"(identifier):open_bit": false
						}
					},
					{
						"condition": "query.block_property('minecraft:cardinal_direction') == 'north'||query.block_property('minecraft:cardinal_direction') == 'south'",
						"set_block_property": {
							"(identifier):open_bit": false
						},
						"run_command": {
							"command": [
								"playsound close.fence_gate @a ~ ~ ~"
							]
						}
					},
					{
						"condition": "query.cardinal_facing_2d==4&&(query.block_property('minecraft:cardinal_direction') == 'west'||query.block_property('minecraft:cardinal_direction') == 'east')",
						"set_block_property": {
							"minecraft:cardinal_direction": "'east'",
							"(identifier):open_bit": false
						}
					},
					{
						"condition": "query.cardinal_facing_2d==5&&(query.block_property('minecraft:cardinal_direction') == 'west'||query.block_property('minecraft:cardinal_direction') == 'east')",
						"set_block_property": {
							"minecraft:cardinal_direction": "'west'",
							"(identifier):open_bit": false
						}
					},
					{
						"condition": "query.block_property('minecraft:cardinal_direction') == 'west'||query.block_property('minecraft:cardinal_direction') == 'east'",
						"set_block_property": {
							"(identifier):open_bit": false
						},
						"run_command": {
							"command": [
								"playsound close.fence_gate @a ~ ~ ~"
							]
						}
					}
				]
			},
			"placed_bit": {
				"set_block_property": {
					"(identifier):placed_bit": 1
				}
			}
		}
	}
}
`
window.gateFenceTemplate = gateFenceTemplate;

const leavesTemplate = `
{
	"format_version": "1.20.10",
	"minecraft:block": {
		"description": {
			"identifier": "(identifier):(wood_type)_leaves",
			"menu_category": {
				"category": "nature",
				"group": "itemGroup.name.leaves"
			},
			"properties": {
				"(identifier):decay_tier": [
					4,
					3,
					2,
					1,
					0
				],
				"(identifier):persistent_bit": [
					false,
					true
				],
				"(identifier):opaque_bit": [
					false,
					true
				]
			}
		},
		"components": {
			"minecraft:on_player_placing": {
				"event": "(identifier):stop_decay",
				"target": "self"
			},
			"minecraft:on_player_destroyed": {
				"event": "(identifier):on_destroyed"
			},
			"minecraft:queued_ticking": {
				"looping": true,
				"interval_range": [0, 0],
				"on_tick": {
					"event": "check"
				}
			},
			"minecraft:random_ticking": {
				"on_tick": {
					"event": "check",
					"target": "block"
				}
			},
			"tag:(identifier):(wood_type)_leaves": {},
			"minecraft:destructible_by_mining": {
				"seconds_to_destroy": 0.3
			},
			"minecraft:flammable": {
				"catch_chance_modifier": 20,
				"destroy_chance_modifier": 80
			},
			"minecraft:map_color": "#BF606B",
			"minecraft:light_dampening": 0,
			"minecraft:light_emission": 0,
			"minecraft:loot": "loot_tables/empty.json",
			"minecraft:unit_cube": {}
		},
		"permutations": [
			{
				"condition": "query.block_property('(identifier):decay_tier') == 0",
				"components": {
					"minecraft:queued_ticking": {
						"looping": true,
						"interval_range": [
							200,
							200
						],
						"on_tick": {
							"event": "check"
						}
					},
					"tag:(identifier):(wood_type)_leaves_decay_tier_0": {},
					"minecraft:random_ticking": {
						"on_tick": {
							"event": "decay"
						}
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):decay_tier') == 1",
				"components": {
					"minecraft:queued_ticking": {
						"looping": true,
						"interval_range": [
							200,
							200
						],
						"on_tick": {
							"event": "check"
						}
					},
					"tag:(identifier):(wood_type)_leaves_decay_tier_1": {}
				}
			},
			{
				"condition": "query.block_property('(identifier):decay_tier') == 2",
				"components": {
					"minecraft:queued_ticking": {
						"looping": true,
						"interval_range": [
							200,
							200
						],
						"on_tick": {
							"event": "check"
						}
					},
					"tag:(identifier):(wood_type)_leaves_decay_tier_2": {}
				}
			},
			{
				"condition": "query.block_property('(identifier):decay_tier') == 3",
				"components": {
					"minecraft:queued_ticking": {
						"looping": true,
						"interval_range": [
							200,
							200
						],
						"on_tick": {
							"event": "check"
						}
					},
					"tag:(identifier):(wood_type)_leaves_decay_tier_3": {}
				}
			},
			{
				"condition": "query.block_property('(identifier):decay_tier') == 4",
				"components": {
					"minecraft:queued_ticking": {
						"looping": true,
						"interval_range": [
							200,
							200
						],
						"on_tick": {
							"event": "check"
						}
					},
					"tag:(identifier):(wood_type)_leaves_decay_tier_4": {}
				}
			},
			{
				"condition": "query.block_property('(identifier):opaque_bit') == false",
				"components": {
					"minecraft:material_instances": {
						"*": {
							"texture": "(wood_type)_leaves",
							"render_method": "blend",
							"ambient_occlusion": true,
							"face_dimming": true
						}
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):opaque_bit') == true",
				"components": {
					"minecraft:material_instances": {
						"*": {
							"texture": "(wood_type)_leaves_opaque",
							"render_method": "opaque"
						}
					}
				}
			}
		],
		"events": {
			"(identifier):on_destroyed": {
				"sequence": [
					{
						"condition": "query.is_item_name_any('slot.weapon.mainhand',0,'minecraft:shears')",
						"spawn_loot": {
							"table": "loot_tables/blocks/(wood_type)_leaves.json"
						}
					},
					{
						"condition": "!query.is_item_name_any('slot.weapon.mainhand',0,'minecraft:shears')",
						"randomize": [
							{
								"weight": 10,
								"spawn_loot": {
									"table": "loot_tables/blocks/(wood_type)_leaves1.json"
								}
							},
							{
								"weight": 90
							}
						]
					}
				]
			},
			"check": {
				"sequence": [
					{
						"condition": "query.block_property('(identifier):persistent_bit')==false",
						"set_block_property": {
							"(identifier):decay_tier": "(q.block_neighbor_has_any_tag(0,0,-1,'(identifier):(wood_type)_log') || q.block_neighbor_has_any_tag(0,0,1,'(identifier):(wood_type)_log') || q.block_neighbor_has_any_tag(-1,0,0,'(identifier):(wood_type)_log') || q.block_neighbor_has_any_tag(1,0,0,'(identifier):(wood_type)_log') || q.block_neighbor_has_any_tag(0,-1,0,'(identifier):(wood_type)_log') || q.block_neighbor_has_any_tag(0,1,0,'(identifier):(wood_type)_log')) ? 4 : ((q.block_neighbor_has_any_tag(0,0,-1,'(identifier):(wood_type)_leaves_decay_tier_4') || q.block_neighbor_has_any_tag(0,0,1,'(identifier):(wood_type)_leaves_decay_tier_4') || q.block_neighbor_has_any_tag(-1,0,0,'(identifier):(wood_type)_leaves_decay_tier_4') || q.block_neighbor_has_any_tag(1,0,0,'(identifier):(wood_type)_leaves_decay_tier_4') || q.block_neighbor_has_any_tag(0,-1,0,'(identifier):(wood_type)_leaves_decay_tier_4') || q.block_neighbor_has_any_tag(0,1,0,'(identifier):(wood_type)_leaves_decay_tier_4')) ? 3 : ( (q.block_neighbor_has_any_tag(0,0,-1,'(identifier):(wood_type)_leaves_decay_tier_3') || q.block_neighbor_has_any_tag(0,0,1,'(identifier):(wood_type)_leaves_decay_tier_3 ') || q.block_neighbor_has_any_tag(-1,0,0,'(identifier):(wood_type)_leaves_decay_tier_3') || q.block_neighbor_has_any_tag(1,0,0,'(identifier):(wood_type)_leaves_decay_tier_3') || q.block_neighbor_has_any_tag(0,-1,0,'(identifier):(wood_type)_leaves_decay_tier_3') || q.block_neighbor_has_any_tag(0,1,0,'(identifier):(wood_type)_leaves_decay_tier_3')) ? 2 : ( (q.block_neighbor_has_any_tag(0,0,-1,'(identifier):(wood_type)_leaves_decay_tier_2') || q.block_neighbor_has_any_tag(0,0,1,'(identifier):(wood_type)_leaves_decay_tier_2') || q.block_neighbor_has_any_tag(-1,0,0,'(identifier):(wood_type)_leaves_decay_tier_2') || q.block_neighbor_has_any_tag(1,0,0,'(identifier):(wood_type)_leaves_decay_tier_2') || q.block_neighbor_has_any_tag(0,-1,0,'(identifier):(wood_type)_leaves_decay_tier_2') || q.block_neighbor_has_any_tag(0,1,0,'(identifier):(wood_type)_leaves_decay_tier_2')) ? 1 : 0 ) ) )"
						}
					},
					{
						"set_block_property": {
							"(identifier):opaque_bit": "q.block_neighbor_has_any_tag(0,0,-1,'(identifier):(wood_type)_log','stone','(identifier):(wood_type)_leaves') && q.block_neighbor_has_any_tag(0,0,1,'(identifier):(wood_type)_log','stone','(identifier):(wood_type)_leaves') && q.block_neighbor_has_any_tag(0,1,0,'(identifier):(wood_type)_log','stone','(identifier):(wood_type)_leaves') && q.block_neighbor_has_any_tag(0,-1,0,'(identifier):(wood_type)_log','stone','(identifier):(wood_type)_leaves') && q.block_neighbor_has_any_tag(-1,0,0,'(identifier):(wood_type)_log','stone','(identifier):(wood_type)_leaves') && q.block_neighbor_has_any_tag(1,0,0,'(identifier):(wood_type)_log','stone','(identifier):(wood_type)_leaves')"
						}
					}
				]
			},
			"(identifier):stop_decay": {
				"set_block_property": {
					"(identifier):persistent_bit": true
				}
			},
			"decay": {
				"randomize": [
					{
						"weight": 10,
						"spawn_loot": {
							"table": "loot_tables/blocks/(wood_type)_leaves1.json"
						},
						"die": {}
					},
					{
						"weight": 90,
						"die": {}
					}
				]
			}
		}
	}
}
`
window.leavesTemplate = leavesTemplate;

const strippedLogTemplate = `
{
	"format_version": "1.19.10",
	"minecraft:block": {
		"description": {
			"identifier": "(identifier):stripped_(wood_type)_log",
			"menu_category": {
				"category": "nature",
				"group": "itemGroup.name.log"
			},
			"properties": {
				"(identifier):pillar_axis": [
					0,
					1,
					2
				],
				"(identifier):player_bit": [
					0,
					1
				]
			}
		},
		"components": {
			"minecraft:unit_cube": {},
			"minecraft:map_color": "#52221D",
			"minecraft:destructible_by_mining": {
				"seconds_to_destroy": 0.5
			},
			"minecraft:flammable": {
				"catch_chance_modifier": 5,
				"destroy_chance_modifier": 20
			},
			"minecraft:on_player_placing": {
				"event": "facing"
			},
			"minecraft:material_instances": {
				"*": {
					"texture": "(wood_type)_stripped_log",
					"render_method": "opaque"
				},
				"up": {
					"texture": "(wood_type)_stripped_log_top",
					"render_method": "opaque"
				},
				"down": {
					"texture": "(wood_type)_stripped_log_top",
					"render_method": "opaque"
				}
			},
			"minecraft:on_placed": {
				"event": "facingp",
				"target": "self",
				"condition": "query.block_property('(identifier):player_bit')==0"
			},
			"tag:wood": {},
			"tag:minecraft:logs": {},
			"tag:minecraft:logs_that_burn": {}
		},
		"permutations": [
			{
				"condition": "query.block_property('(identifier):pillar_axis') == 1",
				"components": {
					"minecraft:rotation": [
						90,
						0,
						0
					]
				}
			},
			{
				"condition": "query.block_property('(identifier):pillar_axis') == 2",
				"components": {
					"minecraft:rotation": [
						0,
						0,
						90
					]
				}
			}
		],
		"events": {
			"facing": {
				"sequence": [
					{
						"condition": "query.block_face==3||query.block_face==2",
						"set_block_property": {
							"(identifier):pillar_axis": 1,
							"(identifier):player_bit": 1
						}
					},
					{
						"condition": "query.block_face==4||query.block_face==5",
						"set_block_property": {
							"(identifier):pillar_axis": 2,
							"(identifier):player_bit": 1
						}
					},
					{
						"condition": "query.block_face==1||query.block_face==0",
						"set_block_property": {
							"(identifier):pillar_axis": 0,
							"(identifier):player_bit": 1
						}
					}
				]
			},
			"facingp": {
				"set_block_property": {
					"(identifier):pillar_axis": "t.stripped"
				}
			}
		}
	}
}
`
window.strippedLogTemplate = strippedLogTemplate;

const logTemplate = `{
  "format_version": "1.20.10",
  "minecraft:block": {
    "description": {
      "identifier": "(identifier):(wood_type)_log",
      "menu_category": {
        "category": "nature",
        "group": "itemGroup.name.log"
      },
      "properties": {"(identifier):axis": [0, 1, 2]}
    },
    "components": {
      "minecraft:unit_cube": {},
      "tag:(identifier):(wood_type)_log": {},
      "minecraft:material_instances": {
        "*": {"texture": "(wood_type)_log"},
        "ends": {"texture": "(wood_type)_log_top"},
        "up": "ends","down": "ends"
      },
      "minecraft:destructible_by_mining": {"seconds_to_destroy": 1},
      "minecraft:on_player_placing": {"event": "(identifier):set_axis"},
      "minecraft:on_interact": {
        "condition": "q.equipped_item_any_tag('slot.weapon.mainhand', 'minecraft:is_axe')",
        "event": "(identifier):strip"
      }
    },
    "events": {
      "(identifier):set_axis": {"set_block_property": {"(identifier):axis": "Math.floor(q.block_face / 2)"}},
      "(identifier):strip": {
        "sequence": [
          {
            "run_command": {"command": "playsound hit.wood @a ~~~"},
            "damage": {"type": "durability","amount": 1,"target": "item"}
          },
          {
            "condition": "q.block_property('(identifier):axis') == 0",
            "run_command": {"command": "setblock ~~~ (identifier):(wood_type)_stripped_log [\\"(identifier):axis\\"=0]"}
          },
          {
            "condition": "q.block_property('(identifier):axis') == 1",
            "run_command": {"command": "setblock ~~~ (identifier):(wood_type)_stripped_log [\\"(identifier):axis\\"=1]"}
          },
          {
            "condition": "q.block_property('(identifier):axis') == 2",
            "run_command": {"command": "setblock ~~~ (identifier):(wood_type)_stripped_log [\\"(identifier):axis\\"=2]"}
          }
        ]
      }
    },
    "permutations": [
      {
        "condition": "q.block_property('(identifier):axis') == 0",
        "components": {
          "minecraft:transformation": { "rotation": [0, 0, 0] }
        }
      },
      {
        "condition": "q.block_property('(identifier):axis') == 1",
        "components": {
          "minecraft:transformation": { "rotation": [90, 0, 0] }
        }
      },
      {
        "condition": "q.block_property('(identifier):axis') == 2",
        "components": {
          "minecraft:transformation": { "rotation": [0, 0, 90] }
        }
      }
    ]
  }
}`;
window.logTemplate = logTemplate;

const planksTemplate = `
{
	"format_version": "1.20.10",
	"minecraft:block": {
		"description": {
			"identifier": "(identifier):(wood_type)_planks",
			"menu_category": {
				"category": "construction",
				"group": "itemGroup.name.planks"
			}
		},
		"components": {
			"minecraft:flammable": true,
			"minecraft:map_color": "#52221D",
			"minecraft:destructible_by_mining": {
				"seconds_to_destroy": 0.5
			},
			"tag:wood": {},
			"tag:minecraft:planks": {},
			"minecraft:material_instances": {
				"*": {
					"texture": "(wood_type)_planks",
					"render_method": "opaque"
				}
			}
		}
	}
}
`
window.planksTemplate = planksTemplate;

const saplingTemplate = `
{
  "format_version": "1.20.10",
  "minecraft:block": {
    "description": {
      "identifier": "(identifier):(wood_type)_sapling_block",
      "properties": {
        "(identifier):growth": [0, 1, 2]
      }
    },
    "components": {
      "minecraft:collision_box": false,
      "minecraft:selection_box": {
        "origin": [-6, 0, -6],
        "size": [12, 13, 12]
      },
      "minecraft:light_dampening": 0,
      "minecraft:material_instances": {
        "*": {
          "texture": "(wood_type)_sapling",
          "render_method": "alpha_test",
          "face_dimming": false,
          "ambient_occlusion": false
        }
      },
      "minecraft:geometry": "geometry.custom_sapling_model",
      "minecraft:loot": "loot_tables/blocks/(wood_type)_sapling.json",
      "minecraft:placement_filter": {
        "conditions": [
          {
            "allowed_faces": ["up"],
            "block_filter": ["minecraft:dirt", "minecraft:grass", "minecraft:podzol"]
          }
        ]
      },
      "minecraft:on_interact": {
        "condition": "q.is_item_name_any('slot.weapon.mainhand','minecraft:bone_meal')",
        "event": "(identifier):bone_meal"
      },
      "minecraft:random_ticking": {
        "on_tick": {
          "event": "(identifier):grow"
        }
      }
    },
    "events": {
      "(identifier):grow": {
        "sequence": [
          {
            "condition": "q.block_property('(identifier):growth') < 2",
            "set_block_property": {
              "(identifier):growth": "q.block_property('(identifier):growth') + 1"
            }
          },
          {
            "condition": "q.block_property('(identifier):growth') == 2",
            "trigger": { "event": "(identifier):random_structure" }
          }
        ]
      },
      "(identifier):random_structure": {
        "randomize": [
          {
            "run_command": {
              "command": "structure load (wood_type)_tree00 ~-4 ~ ~-3"
            }
          },
          {
            "run_command": {
              "command": "structure load (wood_type)_tree01 ~-4 ~ ~-3"
            }
          },
          {
            "run_command": {
              "command": "structure load (wood_type)_tree02 ~-5 ~ ~-5"
            }
          }
        ]
      },
      "(identifier):bone_meal": {
        "decrement_stack": {},
        "trigger": {
          "event": "(identifier):grow"
        },
        "run_command": {
          "command": "particle minecraft:crop_growth_emitter ~~~"
        }
      }
    }
  }
}
`
window.saplingTemplate = saplingTemplate;

const slabTemplate = `
{
	"format_version": "1.20.10",
	"minecraft:block": {
		"description": {
			"identifier": "(identifier):(wood_type)_slab",
			"properties": {
				"(identifier):double": [false, true]
			},
			"menu_category": {
				"category": "construction",
				"group": "itemGroup.name.slab"
			},
			"traits": {
				"minecraft:placement_position": {
					"enabled_states": ["minecraft:vertical_half"]
				}
			}
		},
		"components": {
			"minecraft:flammable": true,
			"minecraft:map_color": "#52221D",
			"minecraft:destructible_by_mining": {
				"seconds_to_destroy": 0.5
			},
			"tag:wood": {},
			"tag:minecraft:wooden_slabs": {}
		},
		"permutations": [
			{
				"condition": "!query.block_property('(identifier):double') && query.block_property('minecraft:vertical_half')== 'bottom'",
				"components": {
					"minecraft:geometry": "geometry.custom_slab_bottom",
					"minecraft:light_dampening": 0,
					"minecraft:on_interact": {
						"event": "double",
						"target": "self",
						"condition": "query.is_item_name_any('slot.weapon.mainhand',0,'(identifier):(wood_type)_slab')&&query.block_face==1"
					},
					"minecraft:collision_box": {
						"origin": [
							-8,
							0,
							-8
						],
						"size": [
							16,
							8,
							16
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-8,
							0,
							-8
						],
						"size": [
							16,
							8,
							16
						]
					},
					"minecraft:material_instances": {
						"*": {
							"texture": "(wood_type)_planks",
							"render_method": "alpha_test"
						}
					}
				}
			},
			{
				"condition": "!query.block_property('(identifier):double') && query.block_property('minecraft:vertical_half')== 'top'",
				"components": {
					"minecraft:geometry": "geometry.custom_slab_top",
					"minecraft:light_dampening": 0,
					"minecraft:on_interact": {
						"event": "double",
						"target": "self",
						"condition": "query.is_item_name_any('slot.weapon.mainhand',0,'(identifier):(wood_type)_slab')&&query.block_face==0"
					},
					"minecraft:collision_box": {
						"origin": [
							-8,
							8,
							-8
						],
						"size": [
							16,
							8,
							16
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-8,
							8,
							-8
						],
						"size": [
							16,
							8,
							16
						]
					},
					"minecraft:material_instances": {
						"*": {
							"texture": "(wood_type)_planks",
							"render_method": "alpha_test"
						}
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):double') == true",
				"components": {
					"minecraft:unit_cube": {},
					"minecraft:on_player_destroyed": {
						"event": "double_slab_loot"
					},
					"minecraft:light_dampening": 15,
					"minecraft:material_instances": {
						"*": {
							"texture": "(wood_type)_planks",
							"render_method": "opaque"
						}
					}
				}
			}
		],
		"events": {
			"double_slab_loot": {
				"spawn_loot": {
					"table": "loot_tables/blocks/(wood_type)_slab_double.json"
				}
			},
			"double": {
				"set_block_property": {
					"(identifier):double": true
				},
				"decrement_stack": {}
			}
		}
	}
}
`
window.slabTemplate = slabTemplate;

const stairsTemplate = `
{
	"format_version": "1.20.10",
	"minecraft:block": {
		"description": {
			"identifier": "(identifier):(wood_type)_stairs",
			"menu_category": {
				"category": "construction",
				"group": "itemGroup.name.stairs"
			},
			"properties": {
				"(identifier):shape": [
					"straight",
					"inner_right",
					"inner_left",
					"outer_right",
					"outer_left"
				],
				"(identifier):placed_bit": [
					false,
					true
				]
			},
			"traits": {
				"minecraft:placement_position": {
					"enabled_states": ["minecraft:vertical_half"]
				},
				"minecraft:placement_direction": {
					"enabled_states": ["minecraft:cardinal_direction"]
				}
			}
		},
		"components": {
			"minecraft:light_dampening": 0,
			"minecraft:map_color": "#52221D",
			"minecraft:destructible_by_mining": {
				"seconds_to_destroy": 0.5
			},
			"minecraft:flammable": true,
			"minecraft:geometry": {
				"identifier": "geometry.custom_stairs",
				"bone_visibility": {
					"normaln": "(query.block_property('minecraft:cardinal_direction') == 'north' && (query.block_property('(identifier):shape') == 'straight' && query.block_property('minecraft:vertical_half')== 'bottom')) || !query.block_property('(identifier):placed_bit')",
					"upsiden": "query.block_property('minecraft:cardinal_direction') == 'north' && (query.block_property('(identifier):shape') == 'straight' && query.block_property('minecraft:vertical_half')== 'top') && query.block_property('(identifier):placed_bit')",
					"normals": "query.block_property('minecraft:cardinal_direction') == 'south' && (query.block_property('(identifier):shape') == 'straight' && query.block_property('minecraft:vertical_half')== 'bottom') && query.block_property('(identifier):placed_bit')",
					"upsides": "query.block_property('minecraft:cardinal_direction') == 'south' && (query.block_property('(identifier):shape') == 'straight' && query.block_property('minecraft:vertical_half')== 'top') && query.block_property('(identifier):placed_bit')",
					"normalw": "query.block_property('minecraft:cardinal_direction') == 'west' && (query.block_property('(identifier):shape') == 'straight' && query.block_property('minecraft:vertical_half')== 'bottom') && query.block_property('(identifier):placed_bit')",
					"upsidew": "query.block_property('minecraft:cardinal_direction') == 'west' && (query.block_property('(identifier):shape') == 'straight' && query.block_property('minecraft:vertical_half')== 'top') && query.block_property('(identifier):placed_bit')",
					"normale": "query.block_property('minecraft:cardinal_direction') == 'east' && (query.block_property('(identifier):shape') == 'straight' && query.block_property('minecraft:vertical_half')== 'bottom') && query.block_property('(identifier):placed_bit')",
					"upsidee": "query.block_property('minecraft:cardinal_direction') == 'east' && (query.block_property('(identifier):shape') == 'straight' && query.block_property('minecraft:vertical_half')== 'top') && query.block_property('(identifier):placed_bit')",
					"inner_right0": "(query.block_property('minecraft:cardinal_direction') == 'north' && (query.block_property('minecraft:vertical_half')== 'bottom' && query.block_property('(identifier):shape') == 'inner_right')) || (query.block_property('minecraft:cardinal_direction') == 'east' && (query.block_property('minecraft:vertical_half')== 'bottom' && query.block_property('(identifier):shape') == 'inner_left')) && query.block_property('(identifier):placed_bit')",
					"inner_left0": "(query.block_property('minecraft:cardinal_direction') == 'north' && (query.block_property('minecraft:vertical_half')== 'bottom' && query.block_property('(identifier):shape') == 'inner_left')) || (query.block_property('minecraft:cardinal_direction') == 'west' && (query.block_property('minecraft:vertical_half')== 'bottom' && query.block_property('(identifier):shape') == 'inner_right')) && query.block_property('(identifier):placed_bit')",
					"inner_right1": "(query.block_property('minecraft:cardinal_direction') == 'south' || query.block_property('minecraft:cardinal_direction') == 'east') && (query.block_property('minecraft:vertical_half')== 'bottom' && query.block_property('(identifier):shape') == 'inner_right') && query.block_property('(identifier):placed_bit')",
					"inner_left1": "(query.block_property('minecraft:cardinal_direction') == 'south' || query.block_property('minecraft:cardinal_direction') == 'west') && (query.block_property('minecraft:vertical_half')== 'bottom' && query.block_property('(identifier):shape') == 'inner_left') && query.block_property('(identifier):placed_bit')",
					"outer_right0": "(query.block_property('minecraft:cardinal_direction') == 'north' || query.block_property('minecraft:cardinal_direction') == 'west') && (query.block_property('minecraft:vertical_half')== 'bottom' && query.block_property('(identifier):shape') == 'outer_right') && query.block_property('(identifier):placed_bit')",
					"outer_left0": "(query.block_property('minecraft:cardinal_direction') == 'north' || query.block_property('minecraft:cardinal_direction') == 'east') && (query.block_property('minecraft:vertical_half')== 'bottom' && query.block_property('(identifier):shape') == 'outer_left') && query.block_property('(identifier):placed_bit')",
					"outer_right1": "(query.block_property('minecraft:cardinal_direction') == 'south' && (query.block_property('minecraft:vertical_half')== 'bottom' && query.block_property('(identifier):shape') == 'outer_right')) || (query.block_property('minecraft:cardinal_direction') == 'west' && (query.block_property('minecraft:vertical_half')== 'bottom' && query.block_property('(identifier):shape') == 'outer_left')) && query.block_property('(identifier):placed_bit')",
					"outer_left1": "(query.block_property('minecraft:cardinal_direction') == 'south' && (query.block_property('minecraft:vertical_half')== 'bottom' && query.block_property('(identifier):shape') == 'outer_left')) || (query.block_property('minecraft:cardinal_direction') == 'east' && (query.block_property('minecraft:vertical_half')== 'bottom' && query.block_property('(identifier):shape') == 'outer_right')) && query.block_property('(identifier):placed_bit')",
					"inner_right0u": "(query.block_property('minecraft:cardinal_direction') == 'north' && (query.block_property('minecraft:vertical_half')== 'top' && query.block_property('(identifier):shape') == 'inner_right')) || (query.block_property('minecraft:cardinal_direction') == 'east' && (query.block_property('minecraft:vertical_half')== 'top' && query.block_property('(identifier):shape') == 'inner_left')) && query.block_property('(identifier):placed_bit')",
					"inner_left0u": "(query.block_property('minecraft:cardinal_direction') == 'north' && (query.block_property('minecraft:vertical_half')== 'top' && query.block_property('(identifier):shape') == 'inner_left')) || (query.block_property('minecraft:cardinal_direction') == 'west' && (query.block_property('minecraft:vertical_half')== 'top' && query.block_property('(identifier):shape') == 'inner_right')) && query.block_property('(identifier):placed_bit')",
					"inner_right1u": "(query.block_property('minecraft:cardinal_direction') == 'south' || query.block_property('minecraft:cardinal_direction') == 'east') && (query.block_property('minecraft:vertical_half')== 'top' && query.block_property('(identifier):shape') == 'inner_right') && query.block_property('(identifier):placed_bit')",
					"inner_left1u": "(query.block_property('minecraft:cardinal_direction') == 'south' || query.block_property('minecraft:cardinal_direction') == 'west') && (query.block_property('minecraft:vertical_half')== 'top' && query.block_property('(identifier):shape') == 'inner_left') && query.block_property('(identifier):placed_bit')",
					"outer_right0u": "(query.block_property('minecraft:cardinal_direction') == 'north' || query.block_property('minecraft:cardinal_direction') == 'west') && (query.block_property('minecraft:vertical_half')== 'top' && query.block_property('(identifier):shape') == 'outer_right') && query.block_property('(identifier):placed_bit')",
					"outer_left0u": "(query.block_property('minecraft:cardinal_direction') == 'north' || query.block_property('minecraft:cardinal_direction') == 'east') && (query.block_property('minecraft:vertical_half')== 'top' && query.block_property('(identifier):shape') == 'outer_left') && query.block_property('(identifier):placed_bit')",
					"outer_right1u": "(query.block_property('minecraft:cardinal_direction') == 'south' && (query.block_property('minecraft:vertical_half')== 'top' && query.block_property('(identifier):shape') == 'outer_right')) || (query.block_property('minecraft:cardinal_direction') == 'west' && (query.block_property('minecraft:vertical_half')== 'top' && query.block_property('(identifier):shape') == 'outer_left')) && query.block_property('(identifier):placed_bit')",
					"outer_left1u": "(query.block_property('minecraft:cardinal_direction') == 'south' && (query.block_property('minecraft:vertical_half')== 'top' && query.block_property('(identifier):shape') == 'outer_left')) || (query.block_property('minecraft:cardinal_direction') == 'east' && (query.block_property('minecraft:vertical_half')== 'top' && query.block_property('(identifier):shape') == 'outer_right')) && query.block_property('(identifier):placed_bit')"
				}
			},
			"minecraft:material_instances": {
				"*": {
					"texture": "(wood_type)_planks",
					"render_method": "alpha_test"
				}
			},
			"minecraft:on_player_placing": {
				"event": "rendering"
			},
			"minecraft:on_placed": {
				"event": "confirm",
				"target": "self"
			},
			"minecraft:queued_ticking": {
				"looping": true,
				"interval_range": [
					0,
					0
				],
				"on_tick": {
					"event": "confirm",
					"target": "self"
				}
			},
			"tag:stairs": {},
			"tag:wood": {}
		},
		"permutations": [
			{
				"condition": "query.block_property('minecraft:vertical_half')== 'bottom'",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-7,
							0,
							-7
						],
						"size": [
							14,
							8,
							14
						]
					},
					"tag:custom_stairs_up": {}
				}
			},
			{
				"condition": "query.block_property('minecraft:vertical_half')== 'top'",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-7,
							8,
							-7
						],
						"size": [
							14,
							8,
							14
						]
					},
					"tag:custom_stairs_down": {}
				}
			},
			{
				"condition": "query.block_property('(identifier):shape') != 'straight'",
				"components": {
					"tag:custom_stairs_shape": {}
				}
			},
			{
				"condition": "query.block_property('minecraft:cardinal_direction') == 'north'",
				"components": {
					"tag:custom_stairs_north": {}
				}
			},
			{
				"condition": "query.block_property('minecraft:cardinal_direction') == 'south'",
				"components": {
					"tag:custom_stairs_south": {}
				}
			},
			{
				"condition": "query.block_property('minecraft:cardinal_direction') == 'west'",
				"components": {
					"tag:custom_stairs_west": {}
				}
			},
			{
				"condition": "query.block_property('minecraft:cardinal_direction') == 'east'",
				"components": {
					"tag:custom_stairs_east": {}
				}
			}
		],
		"events": {
			"rendering": {
				"set_block_property": {
					"(identifier):placed_bit": true
				}
			},
			"confirm": {
				"sequence": [
					{
						"condition": "query.block_property('minecraft:vertical_half')== 'bottom'",
						"trigger": "connect_up"
					},
					{
						"condition": "query.block_property('minecraft:vertical_half')== 'top'",
						"trigger": "connect_down"
					}
				]
			},
			"connect_up": {
				"sequence": [
					{
						"set_block_property": {
							"(identifier):placed_bit": true
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_up')&&q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_east')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'north'",
						"set_block_property": {
							"(identifier):shape": "'inner_right'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_up')&&!q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_east')&&query.block_property('(identifier):shape')=='inner_right'&&query.block_property('minecraft:cardinal_direction') == 'north'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_up')&&q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_west')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'north'",
						"set_block_property": {
							"(identifier):shape": "'inner_left'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_up')&&!q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_west')&&query.block_property('(identifier):shape')=='inner_left'&&query.block_property('minecraft:cardinal_direction') == 'north'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_up')&&q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_west')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'south'",
						"set_block_property": {
							"(identifier):shape": "'inner_left'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_up')&&!q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_west')&&query.block_property('(identifier):shape')=='inner_left'&&query.block_property('minecraft:cardinal_direction') == 'south'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_up')&&q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_east')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'south'",
						"set_block_property": {
							"(identifier):shape": "'inner_right'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_up')&&!q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_east')&&query.block_property('(identifier):shape')=='inner_right'&&query.block_property('minecraft:cardinal_direction') == 'south'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_up')&&q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_south')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'west'",
						"set_block_property": {
							"(identifier):shape": "'inner_left'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_up')&&!q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_south')&&query.block_property('(identifier):shape')=='inner_left'&&query.block_property('minecraft:cardinal_direction') == 'west'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_up')&&q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_north')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'west'",
						"set_block_property": {
							"(identifier):shape": "'inner_right'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_up')&&!q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_north')&&query.block_property('(identifier):shape')=='inner_right'&&query.block_property('minecraft:cardinal_direction') == 'west'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_up')&&q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_north')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'east'",
						"set_block_property": {
							"(identifier):shape": "'inner_left'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_up')&&!q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_north')&&query.block_property('(identifier):shape')=='inner_left'&&query.block_property('minecraft:cardinal_direction') == 'east'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_up')&&q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_south')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'east'",
						"set_block_property": {
							"(identifier):shape": "'inner_right'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_up')&&!q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_south')&&query.block_property('(identifier):shape')=='inner_right'&&query.block_property('minecraft:cardinal_direction') == 'east'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_up')&&q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_west')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'north'",
						"set_block_property": {
							"(identifier):shape": "'outer_right'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_up')&&!q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_west')&&query.block_property('(identifier):shape')=='outer_right'&&query.block_property('minecraft:cardinal_direction') == 'north'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_up')&&q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_east')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'north'",
						"set_block_property": {
							"(identifier):shape": "'outer_left'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_up')&&!q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_east')&&query.block_property('(identifier):shape')=='outer_left'&&query.block_property('minecraft:cardinal_direction') == 'north'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_up')&&q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_west')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'south'",
						"set_block_property": {
							"(identifier):shape": "'outer_right'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_up')&&!q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_west')&&query.block_property('(identifier):shape')=='outer_right'&&query.block_property('minecraft:cardinal_direction') == 'south'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_up')&&q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_east')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'south'",
						"set_block_property": {
							"(identifier):shape": "'outer_left'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_up')&&!q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_east')&&query.block_property('(identifier):shape')=='outer_left'&&query.block_property('minecraft:cardinal_direction') == 'south'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_up')&&q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_north')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'west'",
						"set_block_property": {
							"(identifier):shape": "'outer_right'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_up')&&!q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_north')&&query.block_property('(identifier):shape')=='outer_right'&&query.block_property('minecraft:cardinal_direction') == 'west'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_up')&&q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_south')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'west'",
						"set_block_property": {
							"(identifier):shape": "'outer_left'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_up')&&!q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_south')&&query.block_property('(identifier):shape')=='outer_left'&&query.block_property('minecraft:cardinal_direction') == 'west'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_up')&&q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_south')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'east'",
						"set_block_property": {
							"(identifier):shape": "'outer_right'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_up')&&!q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_south')&&query.block_property('(identifier):shape')=='outer_right'&&query.block_property('minecraft:cardinal_direction') == 'east'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_up')&&q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_north')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'east'",
						"set_block_property": {
							"(identifier):shape": "'outer_left'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_up')&&!q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_north')&&query.block_property('(identifier):shape')=='outer_left'&&query.block_property('minecraft:cardinal_direction') == 'east'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					}
				]
			},
			"connect_down": {
				"sequence": [
					{
						"set_block_property": {
							"(identifier):placed_bit": true
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_down')&&q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_east')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'north'",
						"set_block_property": {
							"(identifier):shape": "'inner_right'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_down')&&!q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_east')&&query.block_property('(identifier):shape')=='inner_right'&&query.block_property('minecraft:cardinal_direction') == 'north'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_down')&&q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_west')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'north'",
						"set_block_property": {
							"(identifier):shape": "'inner_left'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_down')&&!q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_west')&&query.block_property('(identifier):shape')=='inner_left'&&query.block_property('minecraft:cardinal_direction') == 'north'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_down')&&q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_west')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'south'",
						"set_block_property": {
							"(identifier):shape": "'inner_left'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_down')&&!q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_west')&&query.block_property('(identifier):shape')=='inner_left'&&query.block_property('minecraft:cardinal_direction') == 'south'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_down')&&q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_east')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'south'",
						"set_block_property": {
							"(identifier):shape": "'inner_right'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_down')&&!q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_east')&&query.block_property('(identifier):shape')=='inner_right'&&query.block_property('minecraft:cardinal_direction') == 'south'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_down')&&q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_south')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'west'",
						"set_block_property": {
							"(identifier):shape": "'inner_left'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_down')&&!q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_south')&&query.block_property('(identifier):shape')=='inner_left'&&query.block_property('minecraft:cardinal_direction') == 'west'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_down')&&q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_north')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'west'",
						"set_block_property": {
							"(identifier):shape": "'inner_right'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_down')&&!q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_north')&&query.block_property('(identifier):shape')=='inner_right'&&query.block_property('minecraft:cardinal_direction') == 'west'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_down')&&q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_north')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'east'",
						"set_block_property": {
							"(identifier):shape": "'inner_left'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_down')&&!q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_north')&&query.block_property('(identifier):shape')=='inner_left'&&query.block_property('minecraft:cardinal_direction') == 'east'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_down')&&q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_south')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'east'",
						"set_block_property": {
							"(identifier):shape": "'inner_right'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_down')&&!q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_south')&&query.block_property('(identifier):shape')=='inner_right'&&query.block_property('minecraft:cardinal_direction') == 'east'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_down')&&q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_west')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'north'",
						"set_block_property": {
							"(identifier):shape": "'outer_right'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_down')&&!q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_west')&&query.block_property('(identifier):shape')=='outer_right'&&query.block_property('minecraft:cardinal_direction') == 'north'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_down')&&q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_east')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'north'",
						"set_block_property": {
							"(identifier):shape": "'outer_left'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_down')&&!q.block_neighbor_has_any_tag(0,0,-1,'custom_stairs_east')&&query.block_property('(identifier):shape')=='outer_left'&&query.block_property('minecraft:cardinal_direction') == 'north'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_down')&&q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_west')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'south'",
						"set_block_property": {
							"(identifier):shape": "'outer_right'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_down')&&!q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_west')&&query.block_property('(identifier):shape')=='outer_right'&&query.block_property('minecraft:cardinal_direction') == 'south'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_down')&&q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_east')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'south'",
						"set_block_property": {
							"(identifier):shape": "'outer_left'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_down')&&!q.block_neighbor_has_any_tag(0,0,1,'custom_stairs_east')&&query.block_property('(identifier):shape')=='outer_left'&&query.block_property('minecraft:cardinal_direction') == 'south'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_down')&&q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_north')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'west'",
						"set_block_property": {
							"(identifier):shape": "'outer_right'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_down')&&!q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_north')&&query.block_property('(identifier):shape')=='outer_right'&&query.block_property('minecraft:cardinal_direction') == 'west'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_down')&&q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_south')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'west'",
						"set_block_property": {
							"(identifier):shape": "'outer_left'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_down')&&!q.block_neighbor_has_any_tag(-1,0,0,'custom_stairs_south')&&query.block_property('(identifier):shape')=='outer_left'&&query.block_property('minecraft:cardinal_direction') == 'west'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_down')&&q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_south')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'east'",
						"set_block_property": {
							"(identifier):shape": "'outer_right'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_down')&&!q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_south')&&query.block_property('(identifier):shape')=='outer_right'&&query.block_property('minecraft:cardinal_direction') == 'east'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					},
					{
						"condition": "q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_down')&&q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_north')&&query.block_property('(identifier):shape')=='straight'&&query.block_property('minecraft:cardinal_direction') == 'east'",
						"set_block_property": {
							"(identifier):shape": "'outer_left'"
						}
					},
					{
						"condition": "!q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_down')&&!q.block_neighbor_has_any_tag(1,0,0,'custom_stairs_north')&&query.block_property('(identifier):shape')=='outer_left'&&query.block_property('minecraft:cardinal_direction') == 'east'",
						"set_block_property": {
							"(identifier):shape": "'straight'"
						}
					}
				]
			}
		}
	}
}
`
window.stairsTemplate = stairsTemplate;

const strippedWoodTemplate = `
{
	"format_version": "1.20.10",
	"minecraft:block": {
		"description": {
			"identifier": "(identifier):stripped_(wood_type)_wood",
			"menu_category": {
				"category": "nature",
				"group": "itemGroup.name.wood"
			},
			"properties": {
				"(identifier):pillar_axis": [
					0,
					1,
					2
				],
				"(identifier):player_bit": [
					0,
					1
				]
			}
		},
		"components": {
			"minecraft:unit_cube": {},
			"minecraft:map_color": "#52221D",
			"minecraft:destructible_by_mining": {
				"seconds_to_destroy": 0.5
			},
			"minecraft:flammable": {
				"catch_chance_modifier": 5,
				"destroy_chance_modifier": 20
			},
			"minecraft:on_player_placing": {
				"event": "facing"
			},
			"minecraft:material_instances": {
				"*": {
					"texture": "(wood_type)_stripped_log",
					"render_method": "opaque"
				}
			},
			"minecraft:on_placed": {
				"event": "facingp",
				"target": "self",
				"condition": "query.block_property('(identifier):player_bit')==0"
			},
			"tag:wood": {},
			"tag:minecraft:logs": {},
			"tag:minecraft:logs_that_burn": {}
		},
		"permutations": [
			{
				"condition": "query.block_property('(identifier):pillar_axis') == 1",
				"components": {
					"minecraft:transformation": {
						"rotation": [90, 0, 0]
					  }
				}
			},
			{
				"condition": "query.block_property('(identifier):pillar_axis') == 2",
				"components": {
					"minecraft:transformation": {
						"rotation": [0, 0, 90]
					  }
				}
			}
		],
		"events": {
			"facing": {
				"sequence": [
					{
						"condition": "query.block_face==3||query.block_face==2",
						"set_block_property": {
							"(identifier):pillar_axis": 1,
							"(identifier):player_bit": 1
						}
					},
					{
						"condition": "query.block_face==4||query.block_face==5",
						"set_block_property": {
							"(identifier):pillar_axis": 2,
							"(identifier):player_bit": 1
						}
					},
					{
						"condition": "query.block_face==1||query.block_face==0",
						"set_block_property": {
							"(identifier):pillar_axis": 0,
							"(identifier):player_bit": 1
						}
					}
				]
			},
			"facingp": {
				"set_block_property": {
					"(identifier):pillar_axis": "t.stripped"
				}
			}
		}
	}
}
`
window.strippedWoodTemplate = strippedWoodTemplate;

const trapdoorTemplate = `
{
	"format_version": "1.20.10",
	"minecraft:block": {
		"description": {
			"identifier": "(identifier):(wood_type)_trapdoor",
			"menu_category": {
				"category": "construction",
				"group": "itemGroup.name.trapdoor"
			},
			"properties": {
				"(identifier):open_bit": [
					false,
					true
				]
			},
			"traits": {
				"minecraft:placement_position": {
					"enabled_states": ["minecraft:vertical_half"]
				},
				"minecraft:placement_direction": {
					"enabled_states": ["minecraft:cardinal_direction"]
				}
			}
		},
		"components": {
			"minecraft:geometry": {
				"identifier": "geometry.custom_trapdoor",
				"bone_visibility": {
					"down_close": "query.block_property('(identifier):open_bit') == false && query.block_property('minecraft:vertical_half') == 'bottom'",
					"down_open": "query.block_property('(identifier):open_bit') == true && query.block_property('minecraft:vertical_half') == 'bottom'",
					"up_close": "query.block_property('(identifier):open_bit') == false && query.block_property('minecraft:vertical_half') == 'top'",
					"up_open": "query.block_property('(identifier):open_bit') == true && query.block_property('minecraft:vertical_half') == 'top'"
				}
			},
			"minecraft:material_instances": {
				"*": {
					"texture": "(wood_type)_trapdoor",
					"render_method": "opaque"
				}
			},
			"minecraft:map_color": "#52221D",
			"minecraft:destructible_by_mining": {
				"seconds_to_destroy": 0.5
			},
			"minecraft:on_player_placing": {
				"event": "direction"
			},
			"minecraft:light_dampening": 0,
			"tag:wood": {}
		},
		"permutations": [
			{
				"condition": "query.block_property('(identifier):open_bit') == false && query.block_property('minecraft:vertical_half') == 'bottom'",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-8,
							0,
							-8
						],
						"size": [
							16,
							3,
							16
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-8,
							0,
							-8
						],
						"size": [
							16,
							3,
							16
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):open_bit') == true && query.block_property('minecraft:vertical_half') == 'bottom'",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-8,
							0,
							7
						],
						"size": [
							16,
							16,
							1
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-8,
							0,
							5
						],
						"size": [
							16,
							16,
							3
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):open_bit') == false && query.block_property('minecraft:vertical_half') == 'top'",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-8,
							13,
							-8
						],
						"size": [
							16,
							3,
							16
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-8,
							13,
							-8
						],
						"size": [
							16,
							3,
							16
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):open_bit') == true && query.block_property('minecraft:vertical_half') == 'top'",
				"components": {
					"minecraft:collision_box": {
						"origin": [
							-8,
							0,
							7
						],
						"size": [
							16,
							16,
							1
						]
					},
					"minecraft:selection_box": {
						"origin": [
							-8,
							0,
							5
						],
						"size": [
							16,
							16,
							3
						]
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):open_bit') == false",
				"components": {
					"minecraft:on_interact": {
						"event": "open"
					}
				}
			},
			{
				"condition": "query.block_property('(identifier):open_bit') == true",
				"components": {
					"minecraft:on_interact": {
						"event": "close"
					}
				}
			},
			{
				"condition": "query.block_property('minecraft:cardinal_direction') == 'north'",
				"components": {
					"minecraft:transformation": {
						"rotation": [0, 180, 0]
					}
				}
			},
			{
				"condition": "query.block_property('minecraft:cardinal_direction') == 'south'",
				"components": {
					"minecraft:transformation": {
						"rotation": [0, 0, 0]
					}
				}
			},
			{
				"condition": "query.block_property('minecraft:cardinal_direction') == 'west'",
				"components": {
					"minecraft:transformation": {
						"rotation": [0, 270, 0]
					}
				}
			},
			{
				"condition": "query.block_property('minecraft:cardinal_direction') == 'east'",
				"components": {
					"minecraft:transformation": {
						"rotation": [0, 90, 0]
					}
				}
			}
		],
		"events": {
			"open": {
				"set_block_property": {
					"(identifier):open_bit": true
				},
				"run_command": {
					"command": [
						"playsound open.wooden_trapdoor @a ~ ~ ~"
					]
				}
			},
			"close": {
				"set_block_property": {
					"(identifier):open_bit": false
				},
				"run_command": {
					"command": [
						"playsound close.wooden_trapdoor @a ~ ~ ~"
					]
				}
			}
		}
	}
}
`
window.trapdoorTemplate = trapdoorTemplate;

const woodTemplate = `
{
	"format_version": "1.19.10",
	"minecraft:block": {
		"description": {
			"identifier": "(identifier):(wood_type)_wood",
			"menu_category": {
				"category": "nature",
				"group": "itemGroup.name.wood"
			},
			"properties": {
				"(identifier):pillar_axis": [
					0,
					1,
					2
				]
			}
		},
		"components": {
			"minecraft:unit_cube": {},
			"minecraft:map_color": "#52221D",
			"minecraft:destructible_by_mining": {
				"seconds_to_destroy": 0.5
			},
			"minecraft:flammable": {
				"catch_chance_modifier": 5,
				"destroy_chance_modifier": 20
			},
			"minecraft:on_player_placing": {
				"event": "facing"
			},
			"minecraft:material_instances": {
				"*": {
					"texture": "(wood_type)_log",
					"render_method": "opaque"
				}
			},
			"minecraft:on_interact": {
				"event": "turn_stripped",
				"condition": "t.stripped=query.block_property('(identifier):pillar_axis');return 1&&query.equipped_item_any_tag('slot.weapon.mainhand','minecraft:is_axe');"
			},
			"tag:wood": {},
			"tag:minecraft:logs": {},
			"tag:minecraft:logs_that_burn": {}
		},
		"permutations": [
			{
				"condition": "query.block_property('(identifier):pillar_axis') == 1",
				"components": {
					"minecraft:transformation": {
						"rotation": [90, 0, 0]
					  }
				}
			},
			{
				"condition": "query.block_property('(identifier):pillar_axis') == 2",
				"components": {
					"minecraft:transformation": {
						"rotation": [0, 0, 90]
					  }
				}
			}
		],
		"events": {
			"facing": {
				"sequence": [
					{
						"condition": "query.block_face==3||query.block_face==2",
						"set_block_property": {
							"(identifier):pillar_axis": 1
						}
					},
					{
						"condition": "query.block_face==4||query.block_face==5",
						"set_block_property": {
							"(identifier):pillar_axis": 2
						}
					},
					{
						"condition": "query.block_face==1||query.block_face==0",
						"set_block_property": {
							"(identifier):pillar_axis": 0
						}
					}
				]
			},
			"turn_stripped": {
				"sequence": [
					{
						"condition": "t.stripped==0",
						"set_block": {
							"block_type": "(identifier):stripped_(wood_type)_wood"
						},
						"run_command": {
							"command": [
								"playsound fall.wood @a ~ ~ ~"
							]
						}
					},
					{
						"condition": "t.stripped==1",
						"set_block": {
							"block_type": "(identifier):stripped_(wood_type)_wood"
						},
						"run_command": {
							"command": [
								"playsound fall.wood @a ~ ~ ~"
							]
						}
					},
					{
						"condition": "t.stripped==2",
						"set_block": {
							"block_type": "(identifier):stripped_(wood_type)_wood"
						},
						"run_command": {
							"command": [
								"playsound fall.wood @a ~ ~ ~"
							]
						}
					}
				]
			}
		}
	}
}
`
window.woodTemplate = woodTemplate;

const featureRuleTemplate = `
{
	"format_version": "1.13.0",
	"minecraft:feature_rules": {
		"description": {
			"identifier": "(identifier):(wood_type)_tree_feature_rule",
			"places_feature": "(identifier):(wood_type)_tree_feature"
		},
		"conditions": {
			"placement_pass": "surface_pass",
			"minecraft:biome_filter": [
				{
					"test": "has_biome_tag",
					"operator": "==",
					"value": "forest"
				}
			]
		},
		"distribution": {
			"iterations": "Math.random_integer(1, 2)",
			"x": {
				"distribution": "uniform",
				"extent": [
					0,
					16
				]
			},
			"y": "query.heightmap(variable.worldx, variable.worldz)",
			"z": {
				"distribution": "uniform",
				"extent": [
					0,
					16
				]
			}
		}
	}
}
`
window.featureRuleTemplate = featureRuleTemplate;

const featureTemplate = `
{
	"format_version": "1.13.0",
	"minecraft:tree_feature": {
		"description": {
			"identifier": "(identifier):(wood_type)_tree_feature"
		},
		"fancy_trunk": {
			"trunk_height": {
				"base": 5,
				"variance": 10,
				"scale": 2
			},
			"trunk_width": 1,
			"trunk_block": {
				"name": "(identifier):(wood_type)_log"
			},
			"branches": {
				"slope": 1,
				"density": 1,
				"min_altitude_factor": 0.3
			},
			"width_scale": 1,
			"foliage_altitude_factor": 0.4
		},
		"fancy_canopy": {
			"height": 4,
			"radius": 3,
			"leaf_block": {
				"name": "(identifier):(wood_type)_leaves"
			}
		},
		"base_block": [
			"minecraft:dirt",
			{
				"name": "minecraft:dirt",
				"states": {
					"dirt_type": "coarse"
				}
			}
		],
		"may_grow_on": [
			"minecraft:dirt",
			"minecraft:grass",
			{
				"name": "minecraft:dirt",
				"states": {
					"dirt_type": "coarse"
				}
			},
			{
				"name": "minecraft:farmland",
				"states": {
					"moisturized_amount": 0
				}
			},
			{
				"name": "minecraft:farmland",
				"states": {
					"moisturized_amount": 1
				}
			},
			{
				"name": "minecraft:farmland",
				"states": {
					"moisturized_amount": 2
				}
			},
			{
				"name": "minecraft:farmland",
				"states": {
					"moisturized_amount": 3
				}
			},
			{
				"name": "minecraft:farmland",
				"states": {
					"moisturized_amount": 4
				}
			},
			{
				"name": "minecraft:farmland",
				"states": {
					"moisturized_amount": 5
				}
			},
			{
				"name": "minecraft:farmland",
				"states": {
					"moisturized_amount": 6
				}
			},
			{
				"name": "minecraft:farmland",
				"states": {
					"moisturized_amount": 7
				}
			}
		],
		"may_replace": [
			"minecraft:air",
			{
				"name": "minecraft:leaves",
				"states": {
					"old_leaf_type": "oak"
				}
			},
			{
				"name": "minecraft:leaves",
				"states": {
					"old_leaf_type": "spruce"
				}
			},
			{
				"name": "minecraft:leaves",
				"states": {
					"old_leaf_type": "birch"
				}
			},
			{
				"name": "minecraft:leaves",
				"states": {
					"old_leaf_type": "jungle"
				}
			},
			{
				"name": "minecraft:leaves2",
				"states": {
					"new_leaf_type": "acacia"
				}
			},
			{
				"name": "minecraft:leaves2",
				"states": {
					"new_leaf_type": "dark_oak"
				}
			},
			{
				"name": "(identifier):(wood_type)_leaves"
			}
		],
		"may_grow_through": [
			"minecraft:dirt",
			"minecraft:grass",
			{
				"name": "minecraft:dirt",
				"states": {
					"dirt_type": "coarse"
				}
			}
		]
	}
}
`
window.featureTemplate = featureTemplate;
//items
const boatItemTemplate = `
{
	"format_version": "1.16.100",
	"minecraft:item": {
		"description": {
			"identifier": "(identifier):(wood_type)_boat",
			"category": "items"
		},
		"components": {
			"minecraft:display_name": {"value": "item.(identifier):(wood_type)_boat.name"},
			"minecraft:icon": {
				"texture": "(wood_type)_boat"
			},
			"minecraft:creative_category": {
				"parent": "itemGroup.name.boat"
			},
			"minecraft:entity_placer": {
				"entity": "(identifier):(wood_type)_boat"
			},
			"minecraft:liquid_clipped": true,
			"minecraft:fuel": {
				"duration": 60
			}
		}
	}
}
`
window.boatItemTemplate = boatItemTemplate;
const chestBoatItemTemplate = `
{
	"format_version": "1.16.100",
	"minecraft:item": {
		"description": {
			"identifier": "(identifier):(wood_type)_chest_boat",
			"category": "items"
		},
		"components": {
			"minecraft:display_name": {"value": "item.(identifier):(wood_type)_chest_boat.name"},
			"minecraft:icon": {
				"texture": "(wood_type)_chest_boat"
			},
			"minecraft:creative_category": {
				"parent": "itemGroup.name.chestboat"
			},
			"minecraft:entity_placer": {
				"entity": "(identifier):(wood_type)_chest_boat"
			},
			"minecraft:liquid_clipped": true,
			"minecraft:fuel": {
				"duration": 60
			}
		}
	}
}
`
window.chestBoatItemTemplate = chestBoatItemTemplate;
const doorItemTemplate = `
{
	"format_version": "1.16.100",
	"minecraft:item": {
		"description": {
			"identifier": "(identifier):(wood_type)_door",
			"category": "construction"
		},
		"components": {
			"minecraft:display_name": {"value": "item.(identifier):(wood_type)_door.name"},
			"minecraft:icon": {
				"texture": "(wood_type)_door"
			},
			"minecraft:block_placer": {
				"block": "(identifier):(wood_type)_door_tile"
			},
			"minecraft:creative_category": {
				"parent": "itemGroup.name.door"
			},
			"minecraft:fuel": {
				"duration": 10
			}
		}
	}
}
`
window.doorItemTemplate = doorItemTemplate;
const saplingItemTemplate = `
{
    "format_version": "1.20.10",
    "minecraft:item": {
      "description": {
        "identifier": "(identifier):(wood_type)_sapling"
      },
      "components": {
        "minecraft:display_name": {"value": "item.(identifier):(wood_type)_sapling.name"},
        "minecraft:creative_category": {
          "parent": "itemGroup.name.sapling"
        },
        "minecraft:max_stack_size": 64,
        "minecraft:block_placer": {
          "block": "(wood_type)_sapling_block"
        },
        "minecraft:icon": {
          "texture": "(wood_type)_sapling"
        }
      }
    }
  }
`
window.saplingItemTemplate = saplingItemTemplate;

//Loot Tables
const doorLootTemplate = `
{
	"pools": [
		{
			"rolls": 1,
			"entries": [
				{
					"type": "item",
					"name": "(identifier):(wood_type)_door",
					"weight": 1,
					"functions": [
						{
							"function": "set_count",
							"count": 1
						}
					]
				}
			]
		}
	]
}
`
window.doorLootTemplate = doorLootTemplate;

const leavesLootTemplate = `
{
	"pools": [
		{
			"rolls": 1,
			"entries": [
				{
					"type": "item",
					"name": "(identifier):(wood_type)_leaves",
					"weight": 1,
					"functions": [
						{
							"function": "set_count",
							"count": 1
						}
					]
				}
			]
		}
	]
}
`
window.leavesLootTemplate = leavesLootTemplate;

const leaves1LootTemplate = `
{
	"pools": [
		{
			"rolls": 1,
			"entries": [
				{
					"type": "item",
					"name": "minecraft:stick",
					"weight": 1,
					"quantity": 1,
					"functions": [
						{
							"function": "set_count",
							"count": {
								"min": 0,
								"max": 2
							}
						}
					]
				},
				{
					"type": "item",
					"name": "(identifier):(wood_type)_sapling",
					"weight": 1,
					"quantity": 1,
					"functions": [
						{
							"function": "set_count",
							"count": {
								"min": 0,
								"max": 1
							}
						}
					]
				}
			]
		}
	]
}
`
window.leaves1LootTemplate = leaves1LootTemplate;

const saplingLootTemplate = `
{
	"pools": [
		{
			"rolls": 1,
			"entries": [
				{
					"type": "item",
					"name": "(identifier):(wood_type)_sapling",
					"weight": 1,
					"functions": [
						{
							"function": "set_count",
							"count": 1
						}
					]
				}
			]
		}
	]
}
`
window.saplingLootTemplate = saplingLootTemplate;

const slabDoubleLootTemplate = `
{
	"pools": [
		{
			"rolls": 1,
			"entries": [
				{
					"type": "item",
					"name": "(identifier):(wood_type)_slab",
					"weight": 1,
					"functions": [
						{
							"function": "set_count",
							"count": 1
						}
					]
				}
			]
		}
	]
}
`
window.slabLootTemplate = slabDoubleLootTemplate;

const boatLootTemplate = `
{
    "pools": [
        {
            "rolls": 1,
            "entries": [
                {
                    "type": "item",
                    "name": "(identifier):(wood_type)_boat",
                    "weight": 1,
                    "functions": [
                        {
                            "function": "set_count",
                            "count": 1
                        }
                    ]
                }
            ]
        }
    ]
}
`
window.boatLootTemplate = boatLootTemplate;

const chestBoatLootTemplate = `
{
    "pools": [
        {
            "rolls": 1,
            "entries": [
                {
                    "type": "item",
                    "name": "(identifier):(wood_type)_chest_boat",
                    "weight": 1,
                    "functions": [
                        {
                            "function": "set_count",
                            "count": 1
                        }
                    ]
                }
            ]
        }
    ]
}
`
window.chestBoatLootTemplate = chestBoatLootTemplate;

//Entities
const boatTemplate = `
{
	"format_version": "1.20.32",
	"minecraft:entity": {
		"description": {
			"identifier": "(identifier):(wood_type)_boat",
			"is_spawnable": false,
			"is_summonable": true,
			"is_experimental": false
		},
		"component_groups": {
			"minecraft:is_hurt": {
				"minecraft:is_sheared":{},
				"minecraft:timer": {
					"looping": true,
					"time": 0.5,
					"time_down_event": {
					  "event": "minecraft:kill.on_hurt_event"
					}
				  }
			},
			"minecraft:floating": {
				"minecraft:buoyant": {
					"base_buoyancy": 0.6,
					"apply_gravity": true,
					"simulate_waves": true,
					"big_wave_speed": 5,
					"liquid_blocks": [
						"minecraft:water",
						"minecraft:flowing_water"
					]
				}
			},
			"minecraft:can_ride": {
				"minecraft:rideable": {
					"seat_count": 2,
					"interact_text": "action.interact.ride.boat",
					"family_types": [
						"player"
					],
					"pull_in_entities": true,
					"seats": [
						{
							"position": [
								0,
								0,
								0
							],
							"min_rider_count": 0,
							"max_rider_count": 1
						},
						{
							"position": [
								0.2,
								0.1,
								0
							],
							"min_rider_count": 2,
							"max_rider_count": 2
						},
						{
							"position": [
								-0.6,
								0.1,
								0
							],
							"min_rider_count": 2,
							"max_rider_count": 2
						}
					]
				}
			},
			"minecraft:above_bubble_column_down": {
				"minecraft:buoyant": {
					"base_buoyancy": 1,
					"apply_gravity": true,
					"simulate_waves": false,
					"liquid_blocks": [
						"minecraft:water",
						"minecraft:flowing_water"
					],
					"drag_down_on_buoyancy_removed": 0.7
				},
				"minecraft:timer": {
					"looping": false,
					"time": 3,
					"time_down_event": {
						"event": "minecraft:sink",
						"target": "self"
					}
				},
				"minecraft:out_of_control": {}
			},
			"minecraft:above_bubble_column_up": {
				"minecraft:buoyant": {
					"base_buoyancy": 1,
					"apply_gravity": true,
					"simulate_waves": false,
					"liquid_blocks": [
						"minecraft:water",
						"minecraft:flowing_water"
					],
					"drag_down_on_buoyancy_removed": 0.7
				},
				"minecraft:out_of_control": {}
			}
		},
		"components": {
			"minecraft:on_hurt_by_player": {
				"event": "minecraft:on_hurt_event",
				"target": "self"
			},
			"minecraft:loot": {
				"table": "loot_tables/entities/(wood_type)_boat.json" 
			},
			"minecraft:knockback_resistance": {
				"value": 100
			},
			"minecraft:type_family": {
				"family": [
					"boat",
					"inanimate"
				]
			},
			"minecraft:collision_box": {
				"width": 1.4,
				"height": 0.455
			},
			"minecraft:hurt_on_condition": {
				"damage_conditions": [
					{
						"filters": {
							"test": "in_lava",
							"subject": "self",
							"operator": "==",
							"value": true
						},
						"cause": "lava",
						"damage_per_tick": 4
					}
				]
			},
			"minecraft:leashable": {
				"soft_distance": 4,
				"hard_distance": 6,
				"max_distance": 10
			},
			"minecraft:movement": {
				"value": 0.04
			},
			"minecraft:underwater_movement": {
				"value": 0.07
			},
			"minecraft:input_ground_controlled": {},
			"minecraft:rideable": {
				"seat_count": 2,
				"interact_text": "action.interact.ride.boat",
				"family_types": [
					"player"
				],
				"pull_in_entities": true,
				"seats": [
					{
						"position": [
							0,
							0.1,
							0
						],
						"min_rider_count": 0,
						"max_rider_count": 1
					},
					{
						"position": [
							0.2,
							0.1,
							0
						],
						"min_rider_count": 2,
						"max_rider_count": 2
					},
					{
						"position": [
							-0.6,
							0.1,
							0
						],
						"min_rider_count": 2,
						"max_rider_count": 2
					}
				]
			},
			"minecraft:physics": {},
			"minecraft:pushable": {
				"is_pushable": false,
				"is_pushable_by_piston": true
			},
			"minecraft:buoyant": {
				"base_buoyancy": 0.6,
				"apply_gravity": true,
				"simulate_waves": true,
				"big_wave_speed": 5,
				"liquid_blocks": [
					"minecraft:water",
					"minecraft:flowing_water"
				]
			},
			"minecraft:conditional_bandwidth_optimization": {
				"default_values": {
					"max_optimized_distance": 60,
					"max_dropped_ticks": 20,
					"use_motion_prediction_hints": true
				},
				"conditional_values": [
					{
						"max_optimized_distance": 0,
						"max_dropped_ticks": 0,
						"use_motion_prediction_hints": true,
						"conditional_values": [
							{
								"test": "is_moving",
								"subject": "self",
								"operator": "==",
								"value": true
							}
						]
					}
				]
			},
			"minecraft:inside_block_notifier": {
				"block_list": [
					{
						"block": {
							"name": "minecraft:bubble_column",
							"states": {
								"drag_down": true
							}
						},
						"entered_block_event": {
							"event": "minecraft:entered_bubble_column_down",
							"target": "self"
						},
						"exited_block_event": {
							"event": "minecraft:exited_bubble_column",
							"target": "self"
						}
					},
					{
						"block": {
							"name": "minecraft:bubble_column",
							"states": {
								"drag_down": false
							}
						},
						"entered_block_event": {
							"event": "minecraft:entered_bubble_column_up",
							"target": "self"
						},
						"exited_block_event": {
							"event": "minecraft:exited_bubble_column",
							"target": "self"
						}
					}
				]
			}
		},
		"events": {
			"minecraft:entered_bubble_column_down": {
				"remove": {
					"component_groups": [
						"minecraft:floating"
					]
				},
				"add": {
					"component_groups": [
						"minecraft:above_bubble_column_down"
					]
				}
			},
			"minecraft:entered_bubble_column_up": {
				"remove": {
					"component_groups": [
						"minecraft:floating"
					]
				},
				"add": {
					"component_groups": [
						"minecraft:above_bubble_column_up"
					]
				}
			},
			"minecraft:exited_bubble_column": {
				"remove": {
					"component_groups": [
						"minecraft:above_bubble_column_down",
						"minecraft:above_bubble_column_up"
					]
				},
				"add": {
					"component_groups": [
						"minecraft:floating",
						"minecraft:can_ride"
					]
				}
			},
			"minecraft:sink": {
				"remove": {
					"component_groups": [
						"minecraft:floating",
						"minecraft:can_ride",
						"minecraft:above_bubble_column_down",
						"minecraft:above_bubble_column_up"
					]
				}
			},
			"minecraft:on_hurt_event": {
				"add": {
					"component_groups": [
						"minecraft:is_hurt"
					]
				}
			},
			"minecraft:kill.on_hurt_event": {
				"remove": {
					"component_groups": [
						"minecraft:is_hurt"
					]
				}
			}
		}
	}
}
`
window.boatTemplate = boatTemplate;

const chestBoatTemplate = `
{
	"format_version": "1.20.32",
	"minecraft:entity": {
		"description": {
			"identifier": "(identifier):(wood_type)_chest_boat",
			"is_spawnable": false,
			"is_summonable": true,
			"is_experimental": false
		},
		"component_groups": {
			"minecraft:is_hurt": {
				"minecraft:is_sheared":{},
				"minecraft:timer": {
					"looping": true,
					"time": 0.5,
					"time_down_event": {
					  "event": "minecraft:kill.on_hurt_event"
					}
				  }
			},
			"minecraft:floating": {
				"minecraft:buoyant": {
					"base_buoyancy": 0.6,
					"apply_gravity": true,
					"simulate_waves": true,
					"big_wave_speed": 5,
					"liquid_blocks": [
						"minecraft:water",
						"minecraft:flowing_water"
					]
				}
			},
			"minecraft:can_ride": {
				"minecraft:rideable": {
					"seat_count": 1,
					"interact_text": "action.interact.ride.boat",
					"family_types": [
						"player"
					],
					"pull_in_entities": true,
					"seats": [
						{
							"position": [
								0,
								0,
								0
							],
							"min_rider_count": 0,
							"max_rider_count": 1
						}
					]
				}
			},
			"minecraft:above_bubble_column_down": {
				"minecraft:buoyant": {
					"base_buoyancy": 1,
					"apply_gravity": true,
					"simulate_waves": false,
					"liquid_blocks": [
						"minecraft:water",
						"minecraft:flowing_water"
					],
					"drag_down_on_buoyancy_removed": 0.7
				},
				"minecraft:timer": {
					"looping": false,
					"time": 3,
					"time_down_event": {
						"event": "minecraft:sink",
						"target": "self"
					}
				},
				"minecraft:out_of_control": {}
			},
			"minecraft:above_bubble_column_up": {
				"minecraft:buoyant": {
					"base_buoyancy": 1,
					"apply_gravity": true,
					"simulate_waves": false,
					"liquid_blocks": [
						"minecraft:water",
						"minecraft:flowing_water"
					],
					"drag_down_on_buoyancy_removed": 0.7
				},
				"minecraft:out_of_control": {}
			}
		},
		"components": {
			"minecraft:on_hurt_by_player": {
				"event": "minecraft:on_hurt_event",
				"target": "self"
			},
			"minecraft:loot": {
				"table": "loot_tables/entities/(wood_type)_chest_boat.json"
			},
			"minecraft:knockback_resistance": {
				"value": 100
			},
			"minecraft:type_family": {
				"family": [
					"boat",
					"inanimate"
				]
			},
			"minecraft:collision_box": {
				"width": 1.4,
				"height": 0.455
			},
			"minecraft:hurt_on_condition": {
				"damage_conditions": [
					{
						"filters": {
							"test": "in_lava",
							"subject": "self",
							"operator": "==",
							"value": true
						},
						"cause": "lava",
						"damage_per_tick": 4
					}
				]
			},
			"minecraft:leashable": {
				"soft_distance": 4,
				"hard_distance": 6,
				"max_distance": 10
			},
			"minecraft:movement": {
				"value": 0.04
			},
			"minecraft:underwater_movement": {
				"value": 0.07
			},
			"minecraft:input_ground_controlled": {},
			"minecraft:rideable": {
				"seat_count": 1,
				"interact_text": "action.interact.ride.boat",
				"family_types": [
					"player"
				],
				"pull_in_entities": true,
				"seats": [
					{
						"position": [
							0,
							0.1,
							0
						],
						"min_rider_count": 0,
						"max_rider_count": 1
					}
				]
			},
			"minecraft:inventory": {
				"container_type": "chest_boat",
				"inventory_size": 27,
				"can_be_siphoned_from": true
			},
			"minecraft:physics": {},
			"minecraft:pushable": {
				"is_pushable": false,
				"is_pushable_by_piston": true
			},
			"minecraft:buoyant": {
				"base_buoyancy": 0.6,
				"apply_gravity": true,
				"simulate_waves": true,
				"big_wave_speed": 5,
				"liquid_blocks": [
					"minecraft:water",
					"minecraft:flowing_water"
				]
			},
			"minecraft:conditional_bandwidth_optimization": {
				"default_values": {
					"max_optimized_distance": 60,
					"max_dropped_ticks": 20,
					"use_motion_prediction_hints": true
				},
				"conditional_values": [
					{
						"max_optimized_distance": 0,
						"max_dropped_ticks": 0,
						"use_motion_prediction_hints": true,
						"conditional_values": [
							{
								"test": "is_moving",
								"subject": "self",
								"operator": "==",
								"value": true
							}
						]
					}
				]
			},
			"minecraft:inside_block_notifier": {
				"block_list": [
					{
						"block": {
							"name": "minecraft:bubble_column",
							"states": {
								"drag_down": true
							}
						},
						"entered_block_event": {
							"event": "minecraft:entered_bubble_column_down",
							"target": "self"
						},
						"exited_block_event": {
							"event": "minecraft:exited_bubble_column",
							"target": "self"
						}
					},
					{
						"block": {
							"name": "minecraft:bubble_column",
							"states": {
								"drag_down": false
							}
						},
						"entered_block_event": {
							"event": "minecraft:entered_bubble_column_up",
							"target": "self"
						},
						"exited_block_event": {
							"event": "minecraft:exited_bubble_column",
							"target": "self"
						}
					}
				]
			}
		},
		"events": {
			"minecraft:entered_bubble_column_down": {
				"remove": {
					"component_groups": [
						"minecraft:floating"
					]
				},
				"add": {
					"component_groups": [
						"minecraft:above_bubble_column_down"
					]
				}
			},
			"minecraft:entered_bubble_column_up": {
				"remove": {
					"component_groups": [
						"minecraft:floating"
					]
				},
				"add": {
					"component_groups": [
						"minecraft:above_bubble_column_up"
					]
				}
			},
			"minecraft:exited_bubble_column": {
				"remove": {
					"component_groups": [
						"minecraft:above_bubble_column_down",
						"minecraft:above_bubble_column_up"
					]
				},
				"add": {
					"component_groups": [
						"minecraft:floating",
						"minecraft:can_ride"
					]
				}
			},
			"minecraft:sink": {
				"remove": {
					"component_groups": [
						"minecraft:floating",
						"minecraft:can_ride",
						"minecraft:above_bubble_column_down",
						"minecraft:above_bubble_column_up"
					]
				}
			},
			"minecraft:on_hurt_event": {
				"add": {
					"component_groups": [
						"minecraft:is_hurt"
					]
				}
			},
			"minecraft:kill.on_hurt_event": {
				"remove": {
					"component_groups": [
						"minecraft:is_hurt"
					]
				}
			}
		}
	}
}
`
window.chestBoatTemplate = chestBoatTemplate;
//Recipes

const barrelFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):barrel_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"#~#",
			"# #",
			"#~#"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_slab"
			},
			"#": {
				"item": "minecraft:stick"
			}
		},
		"result": [
			{
				"item": "minecraft:barrel",
				"count": 1
			}
		]
	}
}
`
window.barrelFromCrafting = barrelFromCrafting;

const bedBlackFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):bed_black_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"###",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks",
				"data": 0
			},
			"#": {
				"item": "minecraft:wool",
				"data": 15
			}
		},
		"result": [
			{
				"item": "minecraft:bed",
				"data": 15,
				"count": 1
			}
		]
	}
}
`
window.bedBlackFromCrafting = bedBlackFromCrafting;

const bedBlueFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):bed_blue_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"###",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks",
				"data": 0
			},
			"#": {
				"item": "minecraft:wool",
				"data": 11
			}
		},
		"result": [
			{
				"item": "minecraft:bed",
				"data": 11,
				"count": 1
			}
		]
	}
}
`
window.bedBlueFromCrafting = bedBlueFromCrafting;

const bedBrownFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):bed_brown_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"###",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks",
				"data": 0
			},
			"#": {
				"item": "minecraft:wool",
				"data": 12
			}
		},
		"result": [
			{
				"item": "minecraft:bed",
				"data": 12,
				"count": 1
			}
		]
	}
}
`
window.bedBrownFromCrafting = bedBrownFromCrafting;

const bedCyanFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):bed_cyan_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"###",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks",
				"data": 0
			},
			"#": {
				"item": "minecraft:wool",
				"data": 9
			}
		},
		"result": [
			{
				"item": "minecraft:bed",
				"data": 9,
				"count": 1
			}
		]
	}
}
`
window.bedCyanFromCrafting = bedCyanFromCrafting;

const bedGrayFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):bed_gray_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"###",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks",
				"data": 0
			},
			"#": {
				"item": "minecraft:wool",
				"data": 7
			}
		},
		"result": [
			{
				"item": "minecraft:bed",
				"data": 7,
				"count": 1
			}
		]
	}
}
`
window.bedGrayFromCrafting = bedGrayFromCrafting;

const bedGreenFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):bed_green_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"###",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks",
				"data": 0
			},
			"#": {
				"item": "minecraft:wool",
				"data": 13
			}
		},
		"result": [
			{
				"item": "minecraft:bed",
				"data": 13,
				"count": 1
			}
		]
	}
}
`
window.bedGreenFromCrafting = bedGreenFromCrafting;

const bedLight_blueFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):bed_light_blue_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"###",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks",
				"data": 0
			},
			"#": {
				"item": "minecraft:wool",
				"data": 3
			}
		},
		"result": [
			{
				"item": "minecraft:bed",
				"data": 3,
				"count": 1
			}
		]
	}
}
`
window.bedLight_blueFromCrafting = bedLight_blueFromCrafting;

const bedLimeFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):bed_lime_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"###",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks",
				"data": 0
			},
			"#": {
				"item": "minecraft:wool",
				"data": 5
			}
		},
		"result": [
			{
				"item": "minecraft:bed",
				"data": 5,
				"count": 1
			}
		]
	}
}
`
window.bedLimeFromCrafting = bedLimeFromCrafting;

const bedMagentaFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):bed_magenta_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"###",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks",
				"data": 0
			},
			"#": {
				"item": "minecraft:wool",
				"data": 2
			}
		},
		"result": [
			{
				"item": "minecraft:bed",
				"data": 2,
				"count": 1
			}
		]
	}
}
`
window.bedMagentaFromCrafting = bedMagentaFromCrafting;

const bedOrangeFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):bed_orange_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"###",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks",
				"data": 0
			},
			"#": {
				"item": "minecraft:wool",
				"data": 1
			}
		},
		"result": [
			{
				"item": "minecraft:bed",
				"data": 1,
				"count": 1
			}
		]
	}
}
`
window.bedOrangeFromCrafting = bedOrangeFromCrafting;

const bedPinkFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):bed_pink_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"###",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks",
				"data": 0
			},
			"#": {
				"item": "minecraft:wool",
				"data": 6
			}
		},
		"result": [
			{
				"item": "minecraft:bed",
				"data": 6,
				"count": 1
			}
		]
	}
}
`
window.bedPinkFromCrafting = bedPinkFromCrafting;

const bedPurpleFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):bed_purple_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"###",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks",
				"data": 0
			},
			"#": {
				"item": "minecraft:wool",
				"data": 10
			}
		},
		"result": [
			{
				"item": "minecraft:bed",
				"data": 10,
				"count": 1
			}
		]
	}
}
`
window.bedPurpleFromCrafting = bedPurpleFromCrafting;

const bedRedFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):bed_red_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"###",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks",
				"data": 0
			},
			"#": {
				"item": "minecraft:wool",
				"data": 14
			}
		},
		"result": [
			{
				"item": "minecraft:bed",
				"data": 14,
				"count": 1
			}
		]
	}
}
`
window.bedRedFromCrafting = bedRedFromCrafting;

const bedSilverFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):bed_silver_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"###",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks",
				"data": 0
			},
			"#": {
				"item": "minecraft:wool",
				"data": 8
			}
		},
		"result": [
			{
				"item": "minecraft:bed",
				"data": 8,
				"count": 1
			}
		]
	}
}
`
window.barrelFromCrafting = barrelFromCrafting;

const bedWhiteFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):bed_white_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"###",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks",
				"data": 0
			},
			"#": {
				"item": "minecraft:wool",
				"data": 0
			}
		},
		"result": [
			{
				"item": "minecraft:bed",
				"data": 0,
				"count": 1
			}
		]
	}
}
`
window.bedWhiteFromCrafting = bedWhiteFromCrafting;

const bedYellowFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):bed_yellow_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"###",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks",
				"data": 0
			},
			"#": {
				"item": "minecraft:wool",
				"data": 4
			}
		},
		"result": [
			{
				"item": "minecraft:bed",
				"data": 4,
				"count": 1
			}
		]
	}
}
`
window.bedYellowFromCrafting = bedYellowFromCrafting;

const beehiveFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):beehive_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~~~",
			"###",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:honeycomb"
			}
		},
		"result": [
			{
				"item": "minecraft:beehive",
				"count": 1
			}
		]
	}
}
`
window.beehiveFromCrafting = beehiveFromCrafting;

const bookshelfFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):bookshelf_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~~~",
			"###",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:book"
			}
		},
		"result": [
			{
				"item": "minecraft:bookshelf",
				"count": 1
			}
		]
	}
}
`
window.bookshelfFromCrafting = bookshelfFromCrafting;

const bowlFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):bowl_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~ ~",
			" ~ "
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			}
		},
		"result": [
			{
				"item": "minecraft:bowl",
				"count": 4
			}
		]
	}
}
`
window.bowlFromCrafting = bowlFromCrafting;

const cartographyTableFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):cartography_table_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"##",
			"~~",
			"~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:paper"
			}
		},
		"result": [
			{
				"item": "minecraft:cartography_table",
				"count": 1
			}
		]
	}
}
`
window.cartographyTableFromCrafting = cartographyTableFromCrafting;

const doorCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):(wood_type)_door"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~~",
			"~~",
			"~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			}
		},
		"result": [
			{
				"item": "(identifier):(wood_type)_door",
				"count": 3
			}
		]
	}
}
`
window.doorCrafting = doorCrafting;

const fenceCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):(wood_type)_fence"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~#~",
			"~#~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks" 
			},
			"#": {
				"item": "minecraft:stick"
			}
		},
		"result": [
			{
				"item": "(identifier):(wood_type)_fence",
				"count": 3
			}
		]
	}
}
`
window.fenceCrafting = fenceCrafting;

const fenceGateCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):(wood_type)_fence_gate"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"#~#",
			"#~#"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:stick"
			}
		},
		"result": [
			{
				"item": "(identifier):(wood_type)_fence_gate",
				"count": 1
			}
		]
	}
}
`
window.fenceGateCrafting = fenceGateCrafting;

const planksCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shapeless": {
		"description": {
			"identifier": "(identifier):(wood_type)_planks"
		},
		"tags": [
			"crafting_table"
		],
		"ingredients": [
			{
				"item": "(identifier):(wood_type)_log"
			}
		],
		"result": [
			{
				"item": "(identifier):(wood_type)_planks",
				"count": 4
			}
		]
	}
}
`
window.planksCrafting = planksCrafting;

const planksFromStrippedCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shapeless": {
		"description": {
			"identifier": "(identifier):(wood_type)_planks_from_stripped"
		},
		"tags": [
			"crafting_table"
		],
		"ingredients": [
			{
				"item": "(identifier):stripped_(wood_type)_log"
			}
		],
		"result": [
			{
				"item": "(identifier):(wood_type)_planks",
				"count": 4
			}
		]
	}
}
`
window.planksFromStrippedCrafting = planksFromStrippedCrafting;

const planksFromStrippedWoodCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shapeless": {
		"description": {
			"identifier": "(identifier):(wood_type)_planks_from_stripped_wood"
		},
		"tags": [
			"crafting_table"
		],
		"ingredients": [
			{
				"item": "(identifier):stripped_(wood_type)_wood"
			}
		],
		"result": [
			{
				"item": "(identifier):(wood_type)_planks",
				"count": 4
			}
		]
	}
}
`
window.planksFromStrippedWoodCrafting = planksFromStrippedWoodCrafting;

const planksFromWoodCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shapeless": {
		"description": {
			"identifier": "(identifier):(wood_type)_planks_from_wood"
		},
		"tags": [
			"crafting_table"
		],
		"ingredients": [
			{
				"item": "(identifier):(wood_type)_wood"
			}
		],
		"result": [
			{
				"item": "(identifier):(wood_type)_planks",
				"count": 4
			}
		]
	}
}
`
window.planksFromWoodCrafting = planksFromWoodCrafting;

const slabCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):(wood_type)_slab"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			}
		},
		"result": [
			{
				"item": "(identifier):(wood_type)_slab",
				"count": 6
			}
		]
	}
}
`
window.slabCrafting = slabCrafting;

const stairsCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):(wood_type)_stairs"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~  ",
			"~~ ",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			}
		},
		"result": [
			{
				"item": "(identifier):(wood_type)_stairs",
				"count": 4
			}
		]
	}
}
`
window.stairsCrafting = stairsCrafting;

const trapDoorCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):(wood_type)_trapdoor"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~~~",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			}
		},
		"result": [
			{
				"item": "(identifier):(wood_type)_trapdoor",
				"count": 2
			}
		]
	}
}
`
window.trapDoorCrafting = trapDoorCrafting;

const woodCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):(wood_type)_wood"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~~",
			"~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_log"
			}
		},
		"result": [
			{
				"item": "(identifier):(wood_type)_wood",
				"count": 3
			}
		]
	}
}
`
window.woodCrafting = woodCrafting;

const woodStrippedCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):(wood_type)_wood_stripped"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~~",
			"~~"
		],
		"key": {
			"~": {
				"item": "(identifier):stripped_(wood_type)_log"
			}
		},
		"result": [
			{
				"item": "(identifier):stripped_(wood_type)_wood",
				"count": 3
			}
		]
	}
}
`
window.woodStrippedCrafting = woodStrippedCrafting;

const chestFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):chest_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~~~",
			"~ ~",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			}
		},
		"result": [
			{
				"item": "minecraft:chest",
				"count": 1
			}
		]
	}
}
`
window.chestFromCrafting = chestFromCrafting;

const composterFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):composter_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~ ~",
			"~ ~",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_slab"
			}
		},
		"result": [
			{
				"item": "minecraft:composter",
				"count": 1
			}
		]
	}
}
`
window.composterFromCrafting = composterFromCrafting;

const craftingTableFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):crafting_table_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~~",
			"~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			}
		},
		"result": [
			{
				"item": "minecraft:crafting_table",
				"count": 1
			}
		]
	}
}
`
window.craftingTableFromCrafting = craftingTableFromCrafting;

const daylightSensorFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):daylight_sensor_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"!!!",
			"###",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_slab"
			},
			"#": {
				"item": "minecraft:quartz"
			},
			"!": {
				"item": "minecraft:glass"
			}
		},
		"result": [
			{
				"item": "minecraft:daylight_detector",
				"count": 1
			}
		]
	}
}
`
window.daylightSensorFromCrafting = daylightSensorFromCrafting;

const fletchingTableFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):fletching_table_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"##",
			"~~",
			"~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:flint"
			}
		},
		"result": [
			{
				"item": "minecraft:fletching_table",
				"count": 1
			}
		]
	}
}
`
window.fletchingTableFromCrafting = fletchingTableFromCrafting;

const grindstoneFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):grindstone_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"!#!",
			"~ ~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:stone_slab"
			},
			"!": {
				"item": "minecraft:stick"
			}
		},
		"result": [
			{
				"item": "minecraft:grindstone",
				"count": 1
			}
		]
	}
}
`
window.grindstoneFromCrafting = grindstoneFromCrafting;

const grindstoneFromCrafting2 = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):grindstone_from_(wood_type)2"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"!#!",
			"~ ~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:stone_slab2"
			},
			"!": {
				"item": "minecraft:stick"
			}
		},
		"result": [
			{
				"item": "minecraft:grindstone",
				"count": 1
			}
		]
	}
}
`
window.grindstoneFromCrafting2 = grindstoneFromCrafting2;

const grindstoneFromCrafting3 = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):grindstone_from_(wood_type)3"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"!#!",
			"~ ~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:stone_slab3"
			},
			"!": {
				"item": "minecraft:stick"
			}
		},
		"result": [
			{
				"item": "minecraft:grindstone",
				"count": 1
			}
		]
	}
}
`
window.grindstoneFromCrafting3 = grindstoneFromCrafting3;

const grindstoneFromCrafting4 = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):grindstone_from_(wood_type)4"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"!#!",
			"~ ~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:stone_slab4"
			},
			"!": {
				"item": "minecraft:stick"
			}
		},
		"result": [
			{
				"item": "minecraft:grindstone",
				"count": 1
			}
		]
	}
}
`
window.grindstoneFromCrafting4 = grindstoneFromCrafting4;

const jukeboxFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):jukebox_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~~~",
			"~#~",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:diamond"
			}
		},
		"result": [
			{
				"item": "minecraft:jukebox",
				"count": 1
			}
		]
	}
}
`
window.jukeboxFromCrafting = jukeboxFromCrafting;

const lecternFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):lectern_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~~~",
			" # ",
			" ~ "
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_slab"
			},
			"#": {
				"item": "minecraft:bookshelf"
			}
		},
		"result": [
			{
				"item": "minecraft:lectern",
				"count": 1
			}
		]
	}
}
`
window.lecternFromCrafting = lecternFromCrafting;

const loomFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):loom_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"##",
			"~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:string"
			}
		},
		"result": [
			{
				"item": "minecraft:loom",
				"count": 1
			}
		]
	}
}
`
window.loomFromCrafting = loomFromCrafting;

const noteBlockFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):note_block_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~~~",
			"~#~",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:redstone"
			}
		},
		"result": [
			{
				"item": "minecraft:noteblock",
				"count": 1
			}
		]
	}
}
`
window.noteBlockFromCrafting = noteBlockFromCrafting;

const pistonFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):piston_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~~~",
			"#&#",
			"#!#"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:cobblestone"
			},
			"&": {
				"item": "minecraft:iron_ingot"
			},
			"!": {
				"item": "minecraft:redstone"
			}
		},
		"result": [
			{
				"item": "minecraft:piston",
				"data": 1,
				"count": 1
			}
		]
	}
}
`
window.pistonFromCrafting = pistonFromCrafting;

const shieldFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):shield_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~#~",
			"~~~",
			" ~ "
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:iron_ingot"
			}
		},
		"result": [
			{
				"item": "minecraft:shield",
				"count": 1
			}
		]
	}
}
`
window.shieldFromCrafting = shieldFromCrafting;

const smithingTableFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):smithing_table_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"##",
			"~~",
			"~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:iron_ingot"
			}
		},
		"result": [
			{
				"item": "minecraft:smithing_table",
				"count": 1
			}
		]
	}
}
`
window.smithingTableFromCrafting = smithingTableFromCrafting;

const stickFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):stick_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~",
			"~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			}
		},
		"result": [
			{
				"item": "minecraft:stick",
				"count": 4
			}
		]
	}
}
`
window.stickFromCrafting = stickFromCrafting;

const tripwireHookFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):tripwire_hook_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"!",
			"#",
			"~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:stick"
			},
			"!": {
				"item": "minecraft:iron_ingot"
			}
		},
		"result": [
			{
				"item": "minecraft:tripwire_hook",
				"count": 2
			}
		]
	}
}
`
window.tripwireHookFromCrafting = tripwireHookFromCrafting;

const woodenAxeFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):wooden_axe_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~~",
			"~#",
			" #"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:stick"
			}
		},
		"result": [
			{
				"item": "minecraft:wooden_axe",
				"count": 1
			}
		]
	}
}
`
window.woodenAxeFromCrafting = woodenAxeFromCrafting;

const woodenHoeFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):wooden_hoe_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~~",
			" #",
			" #"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:stick"
			}
		},
		"result": [
			{
				"item": "minecraft:wooden_hoe",
				"count": 1
			}
		]
	}
}
`
window.woodenHoeFromCrafting = woodenHoeFromCrafting;

const woodenPickaxeFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):wooden_pickaxe_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~~~",
			" # ",
			" # "
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:stick"
			}
		},
		"result": [
			{
				"item": "minecraft:wooden_pickaxe",
				"count": 1
			}
		]
	}
}
`
window.woodenPickaxeFromCrafting = woodenPickaxeFromCrafting;

const woodenShovelFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):wooden_shovel_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~",
			"#",
			"#"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:stick"
			}
		},
		"result": [
			{
				"item": "minecraft:wooden_shovel",
				"count": 1
			}
		]
	}
}
`
window.woodenShovelFromCrafting = woodenShovelFromCrafting;

const woodenSwordFromCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):wooden_sword_from_(wood_type)"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~",
			"~",
			"#"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:stick"
			}
		},
		"result": [
			{
				"item": "minecraft:wooden_sword",
				"count": 1
			}
		]
	}
}
`
window.woodenSwordFromCrafting = woodenSwordFromCrafting;

const boatCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "(identifier):(wood_type)_boat"
		},
		"tags": [
			"crafting_table"
		],
		"pattern": [
			"~#~",
			"~~~"
		],
		"key": {
			"~": {
				"item": "(identifier):(wood_type)_planks"
			},
			"#": {
				"item": "minecraft:wooden_shovel"
			}
		},
		"result": [
			{
				"item": "(identifier):(wood_type)_boat",
				"count": 1
			}
		]
	}
}
`
window.boatCrafting = boatCrafting;

const chestBoatCrafting = `
{
	"format_version": "1.16.0",
	"minecraft:recipe_shapeless": {
		"description": {
			"identifier": "(identifier):(wood_type)_chest_boat"
		},
		"tags": [
			"crafting_table"
		],
		"ingredients": [
			{
				"item": "(identifier):(wood_type)_boat"
			},
			{
				"item": "minecraft:chest"
			}
		],
		"result": {
			"item": "(identifier):(wood_type)_chest_boat",
			"count": 1
		}
	}
}
`
window.chestBoatCrafting = chestBoatCrafting;

//RP
const animationControllerTemplate = `
{
	"format_version": "1.10.0",
	"animation_controllers": {
		"controller.animation.custom_boat.damage": {
			"initial_state": "state_filter",
			"states": {
				"state_filter": {
					"transitions": [{"damage": "q.is_sheared"}],
					"blend_transition": 0.1
				},
				"damage": {
					"animations": ["damage"],
					"transitions": [{"state_filter": "!q.is_sheared"}],
					"blend_transition": 0.1
				}
			}
		},
		"controller.animation.custom_boat.movement": {
			"initial_state": "state_filter",
			"states": {
				"state_filter": {
					"transitions": [{"damage": "q.is_moving"}],
					"blend_transition": 0.1
				},
				"damage": {
					"animations": ["move"],
					"transitions": [{"state_filter": "!q.is_moving"}],
					"blend_transition": 0.1
				}
			}
		}
	}
}
`
window.animationControllerTemplate = animationControllerTemplate;

const animationTemplate = `
{
	"format_version": "1.8.0",
	"animations": {
		"animation.custom_boat.setup": {
			"loop": true,
			"bones": {
				"boat": {
					"rotation": [0, 90, 0]
				}
			}
		},
		"animation.custom_boat.move": {
			"loop": true,
			"animation_length": 1.12,
			"bones": {
				"paddle_right": {
					"rotation": {
						"0.0": [0, 0, 0],
						"1.12": [0, 0, 360]
					}
				},
				"paddle_left": {
					"rotation": {
						"0.0": [0, 0, 0],
						"1.12": [0, 0, 360]
					}
				}
			}
		},
		"animation.custom_boat.damage": {
			"loop": true,
			"bones": {
				"boat": {
					"rotation": ["math.sin(query.anim_time*100)*3", 0, "math.sin(query.anim_time*500)*10"]
				}
			}
		}
	}
}
`
window.animationTemplate = animationTemplate;

//Client Entities
const boatEntityTemplate = `
{
	"format_version": "1.10.0",
	"minecraft:client_entity": {
		"description": {
			"identifier": "(identifier):(wood_type)_boat",
			"materials": {
				"default": "entity_alphatest",
				"water": "entity_alphablend"
			},
			"textures": {
				"default": "textures/entity/boat/(wood_type)_boat"
			},
			"geometry": {
				"default": "geometry.custom_boat"
			},
			"render_controllers": [
				"controller.render.(wood_type)_boat"
			],
			"animations": {
				"setup": "animation.custom_boat.setup",
				"move": "animation.custom_boat.move",
				"damage": "animation.custom_boat.damage",
				"dammage.c": "controller.animation.custom_boat.damage",
				"movement.c": "controller.animation.custom_boat.movement"
			},
			"scripts": {
				"animate": [
					"setup",
					"dammage.c",
					"movement.c"
				]
			}
		}
	}
}
`
window.boatEntityTemplate = boatEntityTemplate;

const chestBoatEntityTemplate = `
{
	"format_version": "1.10.0",
	"minecraft:client_entity": {
		"description": {
			"identifier": "(identifier):(wood_type)_chest_boat",
			"materials": {
				"default": "entity_alphatest",
				"water": "entity_alphablend"
			},
			"textures": {
				"default": "textures/entity/boat/(wood_type)_chest_boat"
			},
			"geometry": {
				"default": "geometry.custom_chest_boat"
			},
			"render_controllers": [
				"controller.render.(wood_type)_boat"
			],
			"animations": {
				"setup": "animation.custom_boat.setup",
				"move": "animation.custom_boat.move",
				"damage": "animation.custom_boat.damage",
				"dammage.c": "controller.animation.custom_boat.damage",
				"movement.c": "controller.animation.custom_boat.movement"
			},
			"scripts": {
				"animate": [
					"setup",
					"dammage.c",
					"movement.c"
				]
			}
		}
	}
}
`
window.chestBoatEntityTemplate = chestBoatEntityTemplate;

const doorGeoTemplate = `
{
	"format_version": "1.12.0",
	"minecraft:geometry": [
		{
			"description": {
				"identifier": "geometry.custom_door",
				"texture_width": 16,
				"texture_height": 16,
				"visible_bounds_width": 2,
				"visible_bounds_height": 2.5,
				"visible_bounds_offset": [
					0,
					0.75,
					0
				]
			},
			"bones": [
				{
					"name": "door",
					"pivot": [
						0,
						0,
						0
					]
				},
				{
					"name": "lower_close",
					"parent": "door",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								16,
								16,
								3
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									],
									"material_instance": "lower"
								},
								"east": {
									"uv": [
										3,
										0
									],
									"uv_size": [
										-3,
										16
									],
									"material_instance": "lower"
								},
								"south": {
									"uv": [
										16,
										0
									],
									"uv_size": [
										-16,
										16
									],
									"material_instance": "lower"
								},
								"west": {
									"uv": [
										13,
										0
									],
									"uv_size": [
										3,
										16
									],
									"material_instance": "lower"
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-3
									],
									"material_instance": "lower"
								}
							}
						}
					]
				},
				{
					"name": "lower_open",
					"parent": "door",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								16,
								16,
								3
							],
							"uv": {
								"north": {
									"uv": [
										16,
										0
									],
									"uv_size": [
										-16,
										16
									],
									"material_instance": "lower"
								},
								"east": {
									"uv": [
										16,
										0
									],
									"uv_size": [
										-3,
										16
									],
									"material_instance": "lower"
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									],
									"material_instance": "lower"
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										3,
										16
									],
									"material_instance": "lower"
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-3
									],
									"material_instance": "lower"
								}
							}
						}
					]
				},
				{
					"name": "upper_close",
					"parent": "door",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								16,
								16,
								3
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									],
									"material_instance": "upper"
								},
								"east": {
									"uv": [
										3,
										0
									],
									"uv_size": [
										-3,
										16
									],
									"material_instance": "upper"
								},
								"south": {
									"uv": [
										16,
										0
									],
									"uv_size": [
										-16,
										16
									],
									"material_instance": "upper"
								},
								"west": {
									"uv": [
										13,
										0
									],
									"uv_size": [
										3,
										16
									],
									"material_instance": "upper"
								},
								"up": {
									"uv": [
										16,
										3
									],
									"uv_size": [
										-16,
										-3
									],
									"material_instance": "upper"
								}
							}
						}
					]
				},
				{
					"name": "upper_open",
					"parent": "door",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								16,
								16,
								3
							],
							"uv": {
								"north": {
									"uv": [
										16,
										0
									],
									"uv_size": [
										-16,
										16
									],
									"material_instance": "upper"
								},
								"east": {
									"uv": [
										16,
										0
									],
									"uv_size": [
										-3,
										16
									],
									"material_instance": "upper"
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									],
									"material_instance": "upper"
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										3,
										16
									],
									"material_instance": "upper"
								},
								"up": {
									"uv": [
										16,
										3
									],
									"uv_size": [
										-16,
										-3
									],
									"material_instance": "upper"
								}
							}
						}
					]
				}
			]
		}
	]
}
`
window.doorGeoTemplate = doorGeoTemplate;

const gateGeoTemplate = `
{
	"format_version": "1.12.0",
	"minecraft:geometry": [
		{
			"description": {
				"identifier": "geometry.custom_fence_gate",
				"texture_width": 16,
				"texture_height": 16,
				"visible_bounds_width": 2,
				"visible_bounds_height": 2.5,
				"visible_bounds_offset": [0, 0.75, 0]
			},
			"bones": [
				{
					"name": "render",
					"pivot": [0, 0, 0],
					"cubes": [
						{
							"origin": [-1, 5, 6],
							"size": [2, 11, 2],
							"uv": {
								"north": {"uv": [7, 0], "uv_size": [2, 11]},
								"east": {"uv": [0, 0], "uv_size": [2, 11]},
								"south": {"uv": [7, 0], "uv_size": [2, 11]},
								"west": {"uv": [14, 0], "uv_size": [2, 11]},
								"up": {"uv": [9, 16], "uv_size": [-2, -2]},
								"down": {"uv": [9, 2], "uv_size": [-2, -2]}
							}
						},
						{
							"origin": [-1, 5, -8],
							"size": [2, 11, 2],
							"uv": {
								"north": {"uv": [7, 0], "uv_size": [2, 11]},
								"east": {"uv": [14, 0], "uv_size": [2, 11]},
								"south": {"uv": [7, 0], "uv_size": [2, 11]},
								"west": {"uv": [0, 0], "uv_size": [2, 11]},
								"up": {"uv": [9, 2], "uv_size": [-2, -2]},
								"down": {"uv": [9, 16], "uv_size": [-2, -2]}
							}
						},
						{
							"origin": [-1, 8, -6],
							"size": [2, 7, 12],
							"uv": {
								"north": {"uv": [0, 0], "uv_size": [2, 3]},
								"east": {"uv": [2, 1], "uv_size": [12, 7]},
								"south": {"uv": [0, 0], "uv_size": [2, 3]},
								"west": {"uv": [2, 1], "uv_size": [12, 7]},
								"up": {"uv": [9, 14], "uv_size": [-2, -12]},
								"down": {"uv": [2, 12], "uv_size": [-2, -12]}
							}
						}
					]
				},
				{
					"name": "fence_gate",
					"pivot": [0, -4.8, 0]
				},
				{
					"name": "northsouth",
					"parent": "fence_gate",
					"pivot": [0, -4.8, 0],
					"cubes": [
						{
							"origin": [-8, 0.2, -1],
							"size": [2, 11, 2],
							"uv": {
								"north": {"uv": [0, 0], "uv_size": [2, 11]},
								"east": {"uv": [7, 0], "uv_size": [2, 11]},
								"south": {"uv": [14, 0], "uv_size": [2, 11]},
								"west": {"uv": [7, 0], "uv_size": [2, 11]},
								"up": {"uv": [16, 9], "uv_size": [-2, -2]},
								"down": {"uv": [16, 9], "uv_size": [-2, -2]}
							}
						},
						{
							"origin": [6, 0.2, -1],
							"size": [2, 11, 2],
							"uv": {
								"north": {"uv": [14, 0], "uv_size": [2, 11]},
								"east": {"uv": [7, 0], "uv_size": [2, 11]},
								"south": {"uv": [0, 0], "uv_size": [2, 11]},
								"west": {"uv": [7, 0], "uv_size": [2, 11]},
								"up": {"uv": [2, 9], "uv_size": [-2, -2]},
								"down": {"uv": [2, 9], "uv_size": [-2, -2]}
							}
						}
					]
				},
				{
					"name": "nsclose",
					"parent": "northsouth",
					"pivot": [0, -4.8, 0],
					"cubes": [
						{
							"origin": [-6, 1.2, -1],
							"size": [12, 3, 2],
							"uv": {
								"north": {"uv": [2, 7], "uv_size": [12, 3]},
								"east": {"uv": [0, 0], "uv_size": [2, 3]},
								"south": {"uv": [2, 7], "uv_size": [12, 3]},
								"west": {"uv": [0, 0], "uv_size": [2, 3]},
								"up": {"uv": [2, 7], "uv_size": [12, 2]},
								"down": {"uv": [14, 9], "uv_size": [-12, -2]}
							}
						},
						{
							"origin": [-2, 4.2, -1],
							"size": [4, 3, 2],
							"uv": {
								"north": {"uv": [6, 4], "uv_size": [4, 3]},
								"east": {"uv": [7, 4], "uv_size": [2, 3]},
								"south": {"uv": [6, 4], "uv_size": [4, 3]},
								"west": {"uv": [7, 4], "uv_size": [2, 3]},
								"up": {"uv": [4, 2], "uv_size": [-4, -2]},
								"down": {"uv": [4, 2], "uv_size": [-4, -2]}
							}
						},
						{
							"origin": [-6, 7.2, -1],
							"size": [12, 3, 2],
							"uv": {
								"north": {"uv": [2, 1], "uv_size": [12, 3]},
								"east": {"uv": [0, 0], "uv_size": [2, 3]},
								"south": {"uv": [2, 1], "uv_size": [12, 3]},
								"west": {"uv": [0, 0], "uv_size": [2, 3]},
								"up": {"uv": [14, 9], "uv_size": [-12, -2]},
								"down": {"uv": [14, 9], "uv_size": [-12, -2]}
							}
						}
					]
				},
				{
					"name": "nsopen_north",
					"parent": "northsouth",
					"pivot": [0, -4.8, 0],
					"cubes": [
						{
							"origin": [6, 7.2, -7],
							"size": [2, 3, 6],
							"uv": {
								"north": {"uv": [14, 1], "uv_size": [2, 3]},
								"east": {"uv": [9, 1], "uv_size": [6, 3]},
								"south": {"uv": [0, 0], "uv_size": [2, 3]},
								"west": {"uv": [1, 1], "uv_size": [6, 3]},
								"up": {"uv": [2, 7], "uv_size": [-2, -6]},
								"down": {"uv": [2, 6], "uv_size": [-2, -6]}
							}
						},
						{
							"origin": [6, 1.2, -7],
							"size": [2, 3, 6],
							"uv": {
								"north": {"uv": [14, 7], "uv_size": [2, 3]},
								"east": {"uv": [9, 7], "uv_size": [6, 3]},
								"south": {"uv": [0, 0], "uv_size": [2, 3]},
								"west": {"uv": [1, 7], "uv_size": [6, 3]},
								"up": {"uv": [0, 1], "uv_size": [2, 6]},
								"down": {"uv": [2, 15], "uv_size": [-2, -6]}
							}
						},
						{
							"origin": [6, 4.2, -7],
							"size": [2, 3, 2],
							"uv": {
								"north": {"uv": [14, 4], "uv_size": [2, 3]},
								"east": {"uv": [13, 4], "uv_size": [2, 3]},
								"south": {"uv": [14, 4], "uv_size": [2, 3]},
								"west": {"uv": [1, 4], "uv_size": [2, 3]},
								"up": {"uv": [2, 2], "uv_size": [-2, -2]},
								"down": {"uv": [2, 2], "uv_size": [-2, -2]}
							}
						},
						{
							"origin": [-8, 1.2, -7],
							"size": [2, 3, 6],
							"uv": {
								"north": {"uv": [0, 7], "uv_size": [2, 3]},
								"east": {"uv": [9, 7], "uv_size": [6, 3]},
								"south": {"uv": [0, 0], "uv_size": [2, 3]},
								"west": {"uv": [1, 7], "uv_size": [6, 3]},
								"up": {"uv": [14, 1], "uv_size": [2, 6]},
								"down": {"uv": [16, 15], "uv_size": [-2, -6]}
							}
						},
						{
							"origin": [-8, 7.2, -7],
							"size": [2, 3, 6],
							"uv": {
								"north": {"uv": [0, 1], "uv_size": [2, 3]},
								"east": {"uv": [9, 1], "uv_size": [6, 3]},
								"south": {"uv": [0, 0], "uv_size": [2, 3]},
								"west": {"uv": [1, 1], "uv_size": [6, 3]},
								"up": {"uv": [16, 7], "uv_size": [-2, -6]},
								"down": {"uv": [2, 6], "uv_size": [-2, -6]}
							}
						},
						{
							"origin": [-8, 4.2, -7],
							"size": [2, 3, 2],
							"uv": {
								"north": {"uv": [0, 4], "uv_size": [2, 3]},
								"east": {"uv": [13, 4], "uv_size": [2, 3]},
								"south": {"uv": [0, 4], "uv_size": [2, 3]},
								"west": {"uv": [1, 4], "uv_size": [2, 3]},
								"up": {"uv": [2, 2], "uv_size": [-2, -2]},
								"down": {"uv": [2, 2], "uv_size": [-2, -2]}
							}
						}
					]
				},
				{
					"name": "nsopen_south",
					"parent": "northsouth",
					"pivot": [0, -4.8, 8],
					"cubes": [
						{
							"origin": [6, 1.2, 1],
							"size": [2, 3, 6],
							"uv": {
								"north": {"uv": [14, 7], "uv_size": [2, 3]},
								"east": {"uv": [1, 7], "uv_size": [6, 3]},
								"south": {"uv": [0, 0], "uv_size": [2, 3]},
								"west": {"uv": [9, 7], "uv_size": [6, 3]},
								"up": {"uv": [0, 9], "uv_size": [2, 6]},
								"down": {"uv": [2, 7], "uv_size": [-2, -6]}
							}
						},
						{
							"origin": [6, 4.2, 5],
							"size": [2, 3, 2],
							"uv": {
								"north": {"uv": [14, 4], "uv_size": [2, 3]},
								"east": {"uv": [1, 4], "uv_size": [2, 3]},
								"south": {"uv": [14, 4], "uv_size": [2, 3]},
								"west": {"uv": [13, 4], "uv_size": [2, 3]},
								"up": {"uv": [2, 2], "uv_size": [-2, -2]},
								"down": {"uv": [2, 2], "uv_size": [-2, -2]}
							}
						},
						{
							"origin": [6, 7.2, 1],
							"size": [2, 3, 6],
							"uv": {
								"north": {"uv": [14, 1], "uv_size": [2, 3]},
								"east": {"uv": [1, 1], "uv_size": [6, 3]},
								"south": {"uv": [0, 0], "uv_size": [2, 3]},
								"west": {"uv": [9, 1], "uv_size": [6, 3]},
								"up": {"uv": [2, 15], "uv_size": [-2, -6]},
								"down": {"uv": [2, 7], "uv_size": [-2, -6]}
							}
						},
						{
							"origin": [-8, 1.2, 1],
							"size": [2, 3, 6],
							"uv": {
								"north": {"uv": [0, 7], "uv_size": [2, 3]},
								"east": {"uv": [1, 7], "uv_size": [6, 3]},
								"south": {"uv": [0, 0], "uv_size": [2, 3]},
								"west": {"uv": [9, 7], "uv_size": [6, 3]},
								"up": {"uv": [14, 9], "uv_size": [2, 6]},
								"down": {"uv": [16, 7], "uv_size": [-2, -6]}
							}
						},
						{
							"origin": [-8, 7.2, 1],
							"size": [2, 3, 6],
							"uv": {
								"north": {"uv": [0, 1], "uv_size": [2, 3]},
								"east": {"uv": [1, 1], "uv_size": [6, 3]},
								"south": {"uv": [0, 0], "uv_size": [2, 3]},
								"west": {"uv": [9, 1], "uv_size": [6, 3]},
								"up": {"uv": [16, 15], "uv_size": [-2, -6]},
								"down": {"uv": [16, 7], "uv_size": [-2, -6]}
							}
						},
						{
							"origin": [-8, 4.2, 5],
							"size": [2, 3, 2],
							"uv": {
								"north": {"uv": [0, 4], "uv_size": [2, 3]},
								"east": {"uv": [1, 4], "uv_size": [2, 3]},
								"south": {"uv": [0, 4], "uv_size": [2, 3]},
								"west": {"uv": [13, 4], "uv_size": [2, 3]},
								"up": {"uv": [2, 2], "uv_size": [-2, -2]},
								"down": {"uv": [2, 2], "uv_size": [-2, -2]}
							}
						}
					]
				},
				{
					"name": "westeast",
					"parent": "fence_gate",
					"pivot": [0, -4.8, 0],
					"cubes": [
						{
							"origin": [-1, 0.2, 6],
							"size": [2, 11, 2],
							"uv": {
								"north": {"uv": [7, 0], "uv_size": [2, 11]},
								"east": {"uv": [0, 0], "uv_size": [2, 11]},
								"south": {"uv": [7, 0], "uv_size": [2, 11]},
								"west": {"uv": [14, 0], "uv_size": [2, 11]},
								"up": {"uv": [9, 16], "uv_size": [-2, -2]},
								"down": {"uv": [9, 2], "uv_size": [-2, -2]}
							}
						},
						{
							"origin": [-1, 0.2, -8],
							"size": [2, 11, 2],
							"uv": {
								"north": {"uv": [7, 0], "uv_size": [2, 11]},
								"east": {"uv": [14, 0], "uv_size": [2, 11]},
								"south": {"uv": [7, 0], "uv_size": [2, 11]},
								"west": {"uv": [0, 0], "uv_size": [2, 11]},
								"up": {"uv": [9, 2], "uv_size": [-2, -2]},
								"down": {"uv": [9, 16], "uv_size": [-2, -2]}
							}
						}
					]
				},
				{
					"name": "weclose",
					"parent": "westeast",
					"pivot": [0, -4.8, 0],
					"cubes": [
						{
							"origin": [-1, 1.2, -6],
							"size": [2, 3, 12],
							"uv": {
								"north": {"uv": [0, 0], "uv_size": [2, 3]},
								"east": {"uv": [2, 7], "uv_size": [12, 3]},
								"south": {"uv": [0, 0], "uv_size": [2, 3]},
								"west": {"uv": [2, 7], "uv_size": [12, 3]},
								"up": {"uv": [7, 2], "uv_size": [2, 12]},
								"down": {"uv": [9, 14], "uv_size": [-2, -12]}
							}
						},
						{
							"origin": [-1, 7.2, -6],
							"size": [2, 3, 12],
							"uv": {
								"north": {"uv": [0, 0], "uv_size": [2, 3]},
								"east": {"uv": [2, 1], "uv_size": [12, 3]},
								"south": {"uv": [0, 0], "uv_size": [2, 3]},
								"west": {"uv": [2, 1], "uv_size": [12, 3]},
								"up": {"uv": [9, 14], "uv_size": [-2, -12]},
								"down": {"uv": [2, 12], "uv_size": [-2, -12]}
							}
						},
						{
							"origin": [-1, 4.2, -2],
							"size": [2, 3, 4],
							"uv": {
								"north": {"uv": [7, 4], "uv_size": [2, 3]},
								"east": {"uv": [6, 4], "uv_size": [4, 3]},
								"south": {"uv": [7, 4], "uv_size": [2, 3]},
								"west": {"uv": [6, 4], "uv_size": [4, 3]},
								"up": {"uv": [2, 4], "uv_size": [-2, -4]},
								"down": {"uv": [2, 4], "uv_size": [-2, -4]}
							}
						}
					]
				},
				{
					"name": "weopen_west",
					"parent": "westeast",
					"pivot": [0, -4.8, 0],
					"cubes": [
						{
							"origin": [-7, 1.2, -8],
							"size": [6, 3, 2],
							"uv": {
								"north": {"uv": [1, 7], "uv_size": [6, 3]},
								"east": {"uv": [14, 7], "uv_size": [2, 3]},
								"south": {"uv": [9, 7], "uv_size": [6, 3]},
								"west": {"uv": [0, 0], "uv_size": [2, 3]},
								"up": {"uv": [9, 0], "uv_size": [6, 2]},
								"down": {"uv": [15, 16], "uv_size": [-6, -2]}
							}
						},
						{
							"origin": [-7, 7.2, -8],
							"size": [6, 3, 2],
							"uv": {
								"north": {"uv": [1, 1], "uv_size": [6, 3]},
								"east": {"uv": [14, 1], "uv_size": [2, 3]},
								"south": {"uv": [9, 1], "uv_size": [6, 3]},
								"west": {"uv": [0, 0], "uv_size": [2, 3]},
								"up": {"uv": [15, 2], "uv_size": [-6, -2]},
								"down": {"uv": [6, 2], "uv_size": [-6, -2]}
							}
						},
						{
							"origin": [-7, 4.2, -8],
							"size": [2, 3, 2],
							"uv": {
								"north": {"uv": [1, 4], "uv_size": [2, 3]},
								"east": {"uv": [14, 4], "uv_size": [2, 3]},
								"south": {"uv": [13, 4], "uv_size": [2, 3]},
								"west": {"uv": [0, 0], "uv_size": [2, 3]},
								"up": {"uv": [2, 2], "uv_size": [-2, -2]},
								"down": {"uv": [2, 2], "uv_size": [-2, -2]}
							}
						},
						{
							"origin": [-7, 1.2, 6],
							"size": [6, 3, 2],
							"uv": {
								"north": {"uv": [1, 7], "uv_size": [6, 3]},
								"east": {"uv": [0, 7], "uv_size": [2, 3]},
								"south": {"uv": [9, 7], "uv_size": [6, 3]},
								"west": {"uv": [0, 0], "uv_size": [2, 3]},
								"up": {"uv": [9, 14], "uv_size": [6, 2]},
								"down": {"uv": [15, 2], "uv_size": [-6, -2]}
							}
						},
						{
							"origin": [-7, 4.2, 6],
							"size": [2, 3, 2],
							"uv": {
								"north": {"uv": [1, 4], "uv_size": [2, 3]},
								"east": {"uv": [0, 4], "uv_size": [2, 3]},
								"south": {"uv": [13, 4], "uv_size": [2, 3]},
								"west": {"uv": [0, 0], "uv_size": [2, 3]},
								"up": {"uv": [2, 2], "uv_size": [-2, -2]},
								"down": {"uv": [2, 2], "uv_size": [-2, -2]}
							}
						},
						{
							"origin": [-7, 7.2, 6],
							"size": [6, 3, 2],
							"uv": {
								"north": {"uv": [1, 1], "uv_size": [6, 3]},
								"east": {"uv": [0, 1], "uv_size": [2, 3]},
								"south": {"uv": [9, 1], "uv_size": [6, 3]},
								"west": {"uv": [0, 0], "uv_size": [2, 3]},
								"up": {"uv": [15, 16], "uv_size": [-6, -2]},
								"down": {"uv": [6, 2], "uv_size": [-6, -2]}
							}
						}
					]
				},
				{
					"name": "weopen_east",
					"parent": "westeast",
					"pivot": [8, -4.8, 0],
					"cubes": [
						{
							"origin": [1, 1.2, -8],
							"size": [6, 3, 2],
							"uv": {
								"north": {"uv": [9, 7], "uv_size": [6, 3]},
								"east": {"uv": [14, 7], "uv_size": [2, 3]},
								"south": {"uv": [1, 7], "uv_size": [6, 3]},
								"west": {"uv": [0, 7], "uv_size": [2, 3]},
								"up": {"uv": [1, 0], "uv_size": [6, 2]},
								"down": {"uv": [7, 16], "uv_size": [-6, -2]}
							}
						},
						{
							"origin": [1, 7.2, -8],
							"size": [6, 3, 2],
							"uv": {
								"north": {"uv": [9, 1], "uv_size": [6, 3]},
								"east": {"uv": [14, 1], "uv_size": [2, 3]},
								"south": {"uv": [1, 1], "uv_size": [6, 3]},
								"west": {"uv": [0, 1], "uv_size": [2, 3]},
								"up": {"uv": [7, 2], "uv_size": [-6, -2]},
								"down": {"uv": [6, 2], "uv_size": [-6, -2]}
							}
						},
						{
							"origin": [5, 4.2, -8],
							"size": [2, 3, 2],
							"uv": {
								"north": {"uv": [13, 4], "uv_size": [2, 3]},
								"east": {"uv": [14, 4], "uv_size": [2, 3]},
								"south": {"uv": [1, 4], "uv_size": [2, 3]},
								"west": {"uv": [0, 4], "uv_size": [2, 3]},
								"up": {"uv": [2, 2], "uv_size": [-2, -2]},
								"down": {"uv": [2, 2], "uv_size": [-2, -2]}
							}
						},
						{
							"origin": [1, 1.2, 6],
							"size": [6, 3, 2],
							"uv": {
								"north": {"uv": [9, 7], "uv_size": [6, 3]},
								"east": {"uv": [0, 7], "uv_size": [2, 3]},
								"south": {"uv": [1, 7], "uv_size": [6, 3]},
								"west": {"uv": [14, 7], "uv_size": [2, 3]},
								"up": {"uv": [1, 14], "uv_size": [6, 2]},
								"down": {"uv": [7, 2], "uv_size": [-6, -2]}
							}
						},
						{
							"origin": [5, 4.2, 6],
							"size": [2, 3, 2],
							"uv": {
								"north": {"uv": [13, 4], "uv_size": [2, 3]},
								"east": {"uv": [0, 4], "uv_size": [2, 3]},
								"south": {"uv": [1, 4], "uv_size": [2, 3]},
								"west": {"uv": [14, 4], "uv_size": [2, 3]},
								"up": {"uv": [2, 2], "uv_size": [-2, -2]},
								"down": {"uv": [2, 2], "uv_size": [-2, -2]}
							}
						},
						{
							"origin": [1, 7.2, 6],
							"size": [6, 3, 2],
							"uv": {
								"north": {"uv": [9, 1], "uv_size": [6, 3]},
								"east": {"uv": [0, 1], "uv_size": [2, 3]},
								"south": {"uv": [1, 1], "uv_size": [6, 3]},
								"west": {"uv": [14, 1], "uv_size": [2, 3]},
								"up": {"uv": [7, 16], "uv_size": [-6, -2]},
								"down": {"uv": [6, 2], "uv_size": [-6, -2]}
							}
						}
					]
				}
			]
		}
	]
}
`
window.gateGeoTemplate = gateGeoTemplate;

const fenceGeoTemplate = `
{
	"format_version": "1.12.0",
	"minecraft:geometry": [
		{
			"description": {
				"identifier": "geometry.custom_fence",
				"texture_width": 16,
				"texture_height": 16,
				"visible_bounds_width": 3,
				"visible_bounds_height": 2.5,
				"visible_bounds_offset": [0, 0.75, 0]
			},
			"bones": [
				{
					"name": "render",
					"pivot": [0, 0, 0],
					"rotation": [0, 90, 0],
					"cubes": [
						{
							"origin": [6.4, 4, -0.8],
							"size": [1.6, 1.6, 1.6],
							"uv": {
								"north": {"uv": [0, 8], "uv_size": [2, 2]},
								"east": {"uv": [7, 1], "uv_size": [2, 3]},
								"south": {"uv": [0, 7], "uv_size": [2, 2]},
								"west": {"uv": [7, 2], "uv_size": [2, 2]},
								"up": {"uv": [2, 9], "uv_size": [-2, -2]},
								"down": {"uv": [16, 9], "uv_size": [-2, -2]}
							}
						},
						{
							"origin": [6.4, 9.6, -0.8],
							"size": [1.6, 1.6, 1.6],
							"uv": {
								"north": {"uv": [0, 2], "uv_size": [2, 2]},
								"east": {"uv": [7, 1], "uv_size": [2, 3]},
								"south": {"uv": [0, 2], "uv_size": [2, 2]},
								"west": {"uv": [7, 2], "uv_size": [2, 2]},
								"up": {"uv": [2, 9], "uv_size": [-2, -2]},
								"down": {"uv": [16, 9], "uv_size": [-2, -2]}
							}
						},
						{
							"origin": [-3.2, 4, -0.8],
							"size": [6.4, 1.6, 1.6],
							"uv": {
								"north": {"uv": [4, 8], "uv_size": [8, 2]},
								"east": {"uv": [7, 7], "uv_size": [2, 3]},
								"south": {"uv": [4, 7], "uv_size": [8, 2]},
								"west": {"uv": [7, 7], "uv_size": [2, 3]},
								"up": {"uv": [12, 9], "uv_size": [-8, -2]},
								"down": {"uv": [12, 9], "uv_size": [-8, -2]}
							}
						},
						{
							"origin": [-3.2, 9.6, -0.8],
							"size": [6.4, 1.6, 1.6],
							"uv": {
								"north": {"uv": [4, 2], "uv_size": [8, 2]},
								"east": {"uv": [7, 1], "uv_size": [2, 3]},
								"south": {"uv": [4, 2], "uv_size": [8, 2]},
								"west": {"uv": [7, 1], "uv_size": [2, 3]},
								"up": {"uv": [12, 9], "uv_size": [-8, -2]},
								"down": {"uv": [12, 9], "uv_size": [-8, -2]}
							}
						},
						{
							"origin": [3.2, 0, -1.6],
							"size": [3.2, 12.8, 3.2],
							"uv": {
								"north": {"uv": [12, 0], "uv_size": [4, 16]},
								"east": {"uv": [6, 0], "uv_size": [4, 16]},
								"south": {"uv": [0, 0], "uv_size": [4, 16]},
								"west": {"uv": [6, 0], "uv_size": [4, 16]},
								"up": {"uv": [4, 10], "uv_size": [-4, -4]},
								"down": {"uv": [16, 10], "uv_size": [-4, -4]}
							}
						},
						{
							"origin": [-6.4, 0, -1.6],
							"size": [3.2, 12.8, 3.2],
							"uv": {
								"north": {"uv": [0, 0], "uv_size": [4, 16]},
								"east": {"uv": [6, 0], "uv_size": [4, 16]},
								"south": {"uv": [12, 0], "uv_size": [4, 16]},
								"west": {"uv": [6, 0], "uv_size": [4, 16]},
								"up": {"uv": [16, 10], "uv_size": [-4, -4]},
								"down": {"uv": [4, 10], "uv_size": [-4, -4]}
							}
						},
						{
							"origin": [-8, 4, -0.8],
							"size": [1.6, 1.6, 1.6],
							"uv": {
								"north": {"uv": [14, 8], "uv_size": [2, 2]},
								"east": {"uv": [7, 2], "uv_size": [2, 2]},
								"south": {"uv": [14, 7], "uv_size": [2, 2]},
								"west": {"uv": [7, 1], "uv_size": [2, 3]},
								"up": {"uv": [2, 9], "uv_size": [-2, -2]},
								"down": {"uv": [16, 9], "uv_size": [-2, -2]}
							}
						},
						{
							"origin": [-8, 9.6, -0.8],
							"size": [1.6, 1.6, 1.6],
							"uv": {
								"north": {"uv": [14, 2], "uv_size": [2, 2]},
								"east": {"uv": [7, 2], "uv_size": [2, 2]},
								"south": {"uv": [14, 2], "uv_size": [2, 2]},
								"west": {"uv": [7, 1], "uv_size": [2, 3]},
								"up": {"uv": [2, 9], "uv_size": [-2, -2]},
								"down": {"uv": [16, 9], "uv_size": [-2, -2]}
							}
						}
					]
				},
				{
					"name": "fence",
					"pivot": [0, -1.8, 0],
					"cubes": [
						{
							"origin": [-2, -4.8, -2],
							"size": [4, 16, 4],
							"uv": {
								"north": {"uv": [6, 0], "uv_size": [4, 16]},
								"east": {"uv": [6, 0], "uv_size": [4, 16]},
								"south": {"uv": [6, 0], "uv_size": [4, 16]},
								"west": {"uv": [6, 0], "uv_size": [4, 16]},
								"up": {"uv": [10, 10], "uv_size": [-4, -4]},
								"down": {"uv": [10, 10], "uv_size": [-4, -4]}
							}
						}
					]
				},
				{
					"name": "north",
					"parent": "fence",
					"pivot": [0, -1.8, 0],
					"cubes": [
						{
							"origin": [-1, 7.2, -8],
							"size": [2, 3, 6],
							"uv": {
								"north": {"uv": [7, 1], "uv_size": [2, 3]},
								"east": {"uv": [10, 1], "uv_size": [6, 3]},
								"south": {"uv": [7, 1], "uv_size": [2, 3]},
								"west": {"uv": [0, 1], "uv_size": [6, 3]},
								"up": {"uv": [9, 6], "uv_size": [-2, -6]},
								"down": {"uv": [9, 16], "uv_size": [-2, -6]}
							}
						},
						{
							"origin": [-1, 1.2, -8],
							"size": [2, 3, 6],
							"uv": {
								"north": {"uv": [7, 7], "uv_size": [2, 3]},
								"east": {"uv": [10, 7], "uv_size": [6, 3]},
								"south": {"uv": [7, 7], "uv_size": [2, 3]},
								"west": {"uv": [0, 7], "uv_size": [6, 3]},
								"up": {"uv": [9, 6], "uv_size": [-2, -6]},
								"down": {"uv": [9, 16], "uv_size": [-2, -6]}
							}
						}
					]
				},
				{
					"name": "south",
					"parent": "fence",
					"pivot": [0, -1.8, 0],
					"cubes": [
						{
							"origin": [-1, 7.2, 2],
							"size": [2, 3, 6],
							"uv": {
								"north": {"uv": [7, 1], "uv_size": [2, 3]},
								"east": {"uv": [0, 1], "uv_size": [6, 3]},
								"south": {"uv": [7, 1], "uv_size": [2, 3]},
								"west": {"uv": [10, 1], "uv_size": [6, 3]},
								"up": {"uv": [9, 16], "uv_size": [-2, -6]},
								"down": {"uv": [9, 6], "uv_size": [-2, -6]}
							}
						},
						{
							"origin": [-1, 1.2, 2],
							"size": [2, 3, 6],
							"uv": {
								"north": {"uv": [7, 7], "uv_size": [2, 3]},
								"east": {"uv": [0, 7], "uv_size": [6, 3]},
								"south": {"uv": [7, 7], "uv_size": [2, 3]},
								"west": {"uv": [10, 7], "uv_size": [6, 3]},
								"up": {"uv": [9, 16], "uv_size": [-2, -6]},
								"down": {"uv": [9, 6], "uv_size": [-2, -6]}
							}
						}
					]
				},
				{
					"name": "west",
					"parent": "fence",
					"pivot": [0, -1.8, 0],
					"cubes": [
						{
							"origin": [2, 1.2, -1],
							"size": [6, 3, 2],
							"uv": {
								"north": {"uv": [10, 7], "uv_size": [6, 3]},
								"east": {"uv": [7, 7], "uv_size": [2, 3]},
								"south": {"uv": [0, 7], "uv_size": [6, 3]},
								"west": {"uv": [7, 7], "uv_size": [2, 3]},
								"up": {"uv": [6, 9], "uv_size": [-6, -2]},
								"down": {"uv": [16, 9], "uv_size": [-6, -2]}
							}
						},
						{
							"origin": [2, 7.2, -1],
							"size": [6, 3, 2],
							"uv": {
								"north": {"uv": [10, 1], "uv_size": [6, 3]},
								"east": {"uv": [7, 1], "uv_size": [2, 3]},
								"south": {"uv": [0, 1], "uv_size": [6, 3]},
								"west": {"uv": [7, 1], "uv_size": [2, 3]},
								"up": {"uv": [6, 9], "uv_size": [-6, -2]},
								"down": {"uv": [16, 9], "uv_size": [-6, -2]}
							}
						}
					]
				},
				{
					"name": "east",
					"parent": "fence",
					"pivot": [0, -1.8, 0],
					"cubes": [
						{
							"origin": [-8, 1.2, -1],
							"size": [6, 3, 2],
							"uv": {
								"north": {"uv": [0, 7], "uv_size": [6, 3]},
								"east": {"uv": [7, 7], "uv_size": [2, 3]},
								"south": {"uv": [10, 7], "uv_size": [6, 3]},
								"west": {"uv": [7, 7], "uv_size": [2, 3]},
								"up": {"uv": [16, 9], "uv_size": [-6, -2]},
								"down": {"uv": [6, 9], "uv_size": [-6, -2]}
							}
						},
						{
							"origin": [-8, 7.2, -1],
							"size": [6, 3, 2],
							"uv": {
								"north": {"uv": [0, 1], "uv_size": [6, 3]},
								"east": {"uv": [7, 1], "uv_size": [2, 3]},
								"south": {"uv": [10, 1], "uv_size": [6, 3]},
								"west": {"uv": [7, 1], "uv_size": [2, 3]},
								"up": {"uv": [16, 9], "uv_size": [-6, -2]},
								"down": {"uv": [6, 9], "uv_size": [-6, -2]}
							}
						}
					]
				}
			]
		}
	]
}
`
window.fenceGeoTemplate = fenceGeoTemplate;

const saplingGeoTemplate = `
{
	"format_version": "1.12.0",
	"minecraft:geometry": [
		{
			"description": {
				"identifier": "geometry.custom_sapling_model",
				"texture_width": 16,
				"texture_height": 16,
				"visible_bounds_width": 2,
				"visible_bounds_height": 2.5,
				"visible_bounds_offset": [
					0,
					0.75,
					0
				]
			},
			"bones": [
				{
					"name": "all",
					"pivot": [
						0,
						0,
						0
					],
					"rotation": [
						0,
						-45,
						0
					],
					"cubes": [
						{
							"origin": [
								0,
								0,
								-8
							],
							"size": [
								0,
								16,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										0,
										16
									]
								},
								"east": {
									"uv": [
										32,
										32
									],
									"uv_size": [
										0,
										0
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										0,
										16
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"up": {
									"uv": [
										16,
										0
									],
									"uv_size": [
										-16,
										0
									]
								},
								"down": {
									"uv": [
										16,
										0
									],
									"uv_size": [
										-16,
										0
									]
								}
							}
						},
						{
							"origin": [
								-8,
								0,
								0
							],
							"size": [
								16,
								16,
								0
							],
							"uv": {
								"north": {
									"uv": [
										32,
										32
									],
									"uv_size": [
										0,
										0
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										0,
										16
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										0,
										16
									]
								},
								"up": {
									"uv": [
										16,
										0
									],
									"uv_size": [
										-16,
										0
									]
								},
								"down": {
									"uv": [
										16,
										0
									],
									"uv_size": [
										-16,
										0
									]
								}
							}
						}
					]
				}
			]
		}
	]
}
`
window.saplingGeoTemplate = saplingGeoTemplate;

const slabTopGeoTemplate = `
{
	"format_version": "1.12.0",
	"minecraft:geometry": [
		{
			"description": {
				"identifier": "geometry.custom_slab_top",
				"texture_width": 16,
				"texture_height": 16,
				"visible_bounds_width": 2,
				"visible_bounds_height": 2.5,
				"visible_bounds_offset": [
					0,
					0.75,
					0
				]
			},
			"bones": [
				{
					"name": "unknown_bone",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								8,
								-8
							],
							"size": [
								16,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								}
							}
						}
					]
				}
			]
		}
	]
}
`
window.slabTopGeoTemplate = slabTopGeoTemplate;

const slabBottomGeoTemplate = `
{
	"format_version": "1.12.0",
	"minecraft:geometry": [
		{
			"description": {
				"identifier": "geometry.custom_slab_bottom",
				"texture_width": 16,
				"texture_height": 16,
				"visible_bounds_width": 2,
				"visible_bounds_height": 1.5,
				"visible_bounds_offset": [
					0,
					0.25,
					0
				]
			},
			"bones": [
				{
					"name": "unknown_bone",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								16,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"east": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"west": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								}
							}
						}
					]
				}
			]
		}
	]
}
`
window.slabBottomGeoTemplate = slabBottomGeoTemplate;

const stairsGeoTemplate = `
{
	"format_version": "1.12.0",
	"minecraft:geometry": [
		{
			"description": {
				"identifier": "geometry.custom_stairs",
				"texture_width": 16,
				"texture_height": 16,
				"visible_bounds_width": 2,
				"visible_bounds_height": 2.5,
				"visible_bounds_offset": [
					0,
					0.75,
					0
				]
			},
			"bones": [
				{
					"name": "north",
					"pivot": [
						0,
						0,
						0
					]
				},
				{
					"name": "normaln",
					"parent": "north",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								16,
								16,
								8
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"east": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"up": {
									"uv": [
										16,
										8
									],
									"uv_size": [
										-16,
										-8
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-8
									]
								}
							}
						},
						{
							"origin": [
								-8,
								0,
								0
							],
							"size": [
								16,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"east": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"west": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-8
									]
								},
								"down": {
									"uv": [
										16,
										8
									],
									"uv_size": [
										-16,
										-8
									]
								}
							}
						}
					]
				},
				{
					"name": "upsiden",
					"parent": "north",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								8,
								0
							],
							"size": [
								16,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"west": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-8
									]
								},
								"down": {
									"uv": [
										16,
										8
									],
									"uv_size": [
										-16,
										-8
									]
								}
							}
						},
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								16,
								16,
								8
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"east": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"up": {
									"uv": [
										16,
										8
									],
									"uv_size": [
										-16,
										-8
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-8
									]
								}
							}
						}
					]
				},
				{
					"name": "south",
					"pivot": [
						0,
						0,
						0
					]
				},
				{
					"name": "normals",
					"parent": "south",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								16,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"east": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"west": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										16,
										8
									],
									"uv_size": [
										-16,
										-8
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-8
									]
								}
							}
						},
						{
							"origin": [
								-8,
								0,
								0
							],
							"size": [
								16,
								16,
								8
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"west": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-8
									]
								},
								"down": {
									"uv": [
										16,
										8
									],
									"uv_size": [
										-16,
										-8
									]
								}
							}
						}
					]
				},
				{
					"name": "upsides",
					"parent": "south",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								8,
								-8
							],
							"size": [
								16,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"east": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										16,
										8
									],
									"uv_size": [
										-16,
										-8
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-8
									]
								}
							}
						},
						{
							"origin": [
								-8,
								0,
								0
							],
							"size": [
								16,
								16,
								8
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"west": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-8
									]
								},
								"down": {
									"uv": [
										16,
										8
									],
									"uv_size": [
										-16,
										-8
									]
								}
							}
						}
					]
				},
				{
					"name": "west",
					"pivot": [
						0,
						0,
						0
					]
				},
				{
					"name": "normalw",
					"parent": "west",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								8,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						},
						{
							"origin": [
								0,
								0,
								-8
							],
							"size": [
								8,
								16,
								16
							],
							"uv": {
								"north": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"up": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						}
					]
				},
				{
					"name": "upsidew",
					"parent": "west",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								8,
								-8
							],
							"size": [
								8,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						},
						{
							"origin": [
								0,
								0,
								-8
							],
							"size": [
								8,
								16,
								16
							],
							"uv": {
								"north": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"up": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						}
					]
				},
				{
					"name": "east",
					"pivot": [
						0,
						0,
						0
					]
				},
				{
					"name": "normale",
					"parent": "east",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								0,
								0,
								-8
							],
							"size": [
								8,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						},
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								8,
								16,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"south": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						}
					]
				},
				{
					"name": "upsidee",
					"parent": "east",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								0,
								8,
								-8
							],
							"size": [
								8,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						},
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								8,
								16,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"south": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						}
					]
				},
				{
					"name": "shape_down",
					"pivot": [
						0,
						0,
						0
					]
				},
				{
					"name": "inner_right0",
					"parent": "shape_down",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								0,
								8,
								-8
							],
							"size": [
								8,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										-8,
										-8
									]
								},
								"down": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										-8,
										-8
									]
								}
							}
						},
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								8,
								16,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"south": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						},
						{
							"origin": [
								0,
								0,
								-8
							],
							"size": [
								8,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						}
					]
				},
				{
					"name": "inner_right1",
					"parent": "shape_down",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								0,
								8,
								0
							],
							"size": [
								8,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-8
									]
								},
								"down": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										-8,
										-8
									]
								}
							}
						},
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								8,
								16,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"south": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						},
						{
							"origin": [
								0,
								0,
								-8
							],
							"size": [
								8,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						}
					]
				},
				{
					"name": "outer_right0",
					"parent": "shape_down",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								16,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"east": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"west": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								}
							}
						},
						{
							"origin": [
								0,
								8,
								-8
							],
							"size": [
								8,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										-8,
										-8
									]
								},
								"down": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										-8,
										-8
									]
								}
							}
						}
					]
				},
				{
					"name": "outer_right1",
					"parent": "shape_down",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								16,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"east": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"west": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								}
							}
						},
						{
							"origin": [
								0,
								8,
								0
							],
							"size": [
								8,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-8
									]
								},
								"down": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										-8,
										-8
									]
								}
							}
						}
					]
				},
				{
					"name": "inner_left0",
					"parent": "shape_down",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								8,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						},
						{
							"origin": [
								0,
								0,
								-8
							],
							"size": [
								8,
								16,
								16
							],
							"uv": {
								"north": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"up": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						},
						{
							"origin": [
								-8,
								8,
								-8
							],
							"size": [
								8,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										16,
										8
									],
									"uv_size": [
										-8,
										-8
									]
								},
								"down": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										-8,
										-8
									]
								}
							}
						}
					]
				},
				{
					"name": "inner_left1",
					"parent": "shape_down",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								8,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						},
						{
							"origin": [
								0,
								0,
								-8
							],
							"size": [
								8,
								16,
								16
							],
							"uv": {
								"north": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"up": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						},
						{
							"origin": [
								-8,
								8,
								0
							],
							"size": [
								8,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-8
									]
								},
								"down": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										-8,
										-8
									]
								}
							}
						}
					]
				},
				{
					"name": "outer_left0",
					"parent": "shape_down",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								16,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"east": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"west": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								}
							}
						},
						{
							"origin": [
								-8,
								8,
								-8
							],
							"size": [
								8,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										16,
										8
									],
									"uv_size": [
										-8,
										-8
									]
								},
								"down": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										-8,
										-8
									]
								}
							}
						}
					]
				},
				{
					"name": "outer_left1",
					"parent": "shape_down",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								16,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"east": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"west": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								}
							}
						},
						{
							"origin": [
								-8,
								8,
								0
							],
							"size": [
								8,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-8
									]
								},
								"down": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										-8,
										-8
									]
								}
							}
						}
					]
				},
				{
					"name": "shape_up",
					"pivot": [
						0,
						0,
						0
					]
				},
				{
					"name": "inner_right0u",
					"parent": "shape_up",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								0,
								0,
								-8
							],
							"size": [
								8,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"down": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-8
									]
								}
							}
						},
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								8,
								16,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"south": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						},
						{
							"origin": [
								0,
								8,
								-8
							],
							"size": [
								8,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						}
					]
				},
				{
					"name": "inner_right1u",
					"parent": "shape_up",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								0,
								0,
								0
							],
							"size": [
								8,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"down": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										-8,
										-8
									]
								}
							}
						},
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								8,
								16,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"south": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						},
						{
							"origin": [
								0,
								8,
								-8
							],
							"size": [
								8,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						}
					]
				},
				{
					"name": "outer_right0u",
					"parent": "shape_up",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								8,
								-8
							],
							"size": [
								16,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								}
							}
						},
						{
							"origin": [
								0,
								0,
								-8
							],
							"size": [
								8,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"down": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-8
									]
								}
							}
						}
					]
				},
				{
					"name": "outer_right1u",
					"parent": "shape_up",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								8,
								-8
							],
							"size": [
								16,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								}
							}
						},
						{
							"origin": [
								0,
								0,
								0
							],
							"size": [
								8,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"down": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										-8,
										-8
									]
								}
							}
						}
					]
				},
				{
					"name": "inner_left0u",
					"parent": "shape_up",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								8,
								-8
							],
							"size": [
								8,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						},
						{
							"origin": [
								0,
								0,
								-8
							],
							"size": [
								8,
								16,
								16
							],
							"uv": {
								"north": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"up": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						},
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								8,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-8
									]
								}
							}
						}
					]
				},
				{
					"name": "inner_left1u",
					"parent": "shape_up",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								8,
								-8
							],
							"size": [
								8,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						},
						{
							"origin": [
								0,
								0,
								-8
							],
							"size": [
								8,
								16,
								16
							],
							"uv": {
								"north": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										16
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"up": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								},
								"down": {
									"uv": [
										8,
										16
									],
									"uv_size": [
										-8,
										-16
									]
								}
							}
						},
						{
							"origin": [
								-8,
								0,
								0
							],
							"size": [
								8,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"down": {
									"uv": [
										16,
										8
									],
									"uv_size": [
										-8,
										-8
									]
								}
							}
						}
					]
				},
				{
					"name": "outer_left0u",
					"parent": "shape_up",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								8,
								-8
							],
							"size": [
								16,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								}
							}
						},
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								8,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										8,
										0
									],
									"uv_size": [
										8,
										8
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-8,
										-8
									]
								}
							}
						}
					]
				},
				{
					"name": "outer_left1u",
					"parent": "shape_up",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								8,
								-8
							],
							"size": [
								16,
								8,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										8
									]
								},
								"up": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								}
							}
						},
						{
							"origin": [
								-8,
								0,
								0
							],
							"size": [
								8,
								8,
								8
							],
							"uv": {
								"north": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"east": {
									"uv": [
										0,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"south": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"west": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"up": {
									"uv": [
										8,
										8
									],
									"uv_size": [
										8,
										8
									]
								},
								"down": {
									"uv": [
										16,
										8
									],
									"uv_size": [
										-8,
										-8
									]
								}
							}
						}
					]
				}
			]
		}
	]
}
`
window.stairsGeoTemplate = stairsGeoTemplate;

const trapdoorGeoTemplate = `
{
	"format_version": "1.12.0",
	"minecraft:geometry": [
		{
			"description": {
				"identifier": "geometry.custom_trapdoor",
				"texture_width": 16,
				"texture_height": 16,
				"visible_bounds_width": 2,
				"visible_bounds_height": 2.5,
				"visible_bounds_offset": [
					0,
					0.75,
					0
				]
			},
			"bones": [
				{
					"name": "trapdoor",
					"pivot": [
						0,
						0,
						0
					]
				},
				{
					"name": "up_open",
					"parent": "trapdoor",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								0,
								5
							],
							"size": [
								16,
								16,
								3
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										3,
										16
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"west": {
									"uv": [
										3,
										0
									],
									"uv_size": [
										-3,
										16
									]
								},
								"up": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										3
									]
								},
								"down": {
									"uv": [
										16,
										3
									],
									"uv_size": [
										-16,
										-3
									]
								}
							}
						}
					]
				},
				{
					"name": "down_open",
					"parent": "trapdoor",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								0,
								5
							],
							"size": [
								16,
								16,
								3
							],
							"uv": {
								"north": {
									"uv": [
										0,
										16
									],
									"uv_size": [
										16,
										-16
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										3,
										16
									]
								},
								"south": {
									"uv": [
										0,
										16
									],
									"uv_size": [
										16,
										-16
									]
								},
								"west": {
									"uv": [
										3,
										0
									],
									"uv_size": [
										-3,
										16
									]
								},
								"up": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										3
									]
								},
								"down": {
									"uv": [
										16,
										3
									],
									"uv_size": [
										-16,
										-3
									]
								}
							}
						}
					]
				},
				{
					"name": "up_close",
					"parent": "trapdoor",
					"pivot": [
						0,
						12,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								13,
								-8
							],
							"size": [
								16,
								3,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										3
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										3
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										3
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										3
									]
								},
								"up": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								}
							}
						}
					]
				},
				{
					"name": "down_close",
					"parent": "trapdoor",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-8,
								0,
								-8
							],
							"size": [
								16,
								3,
								16
							],
							"uv": {
								"north": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										3
									]
								},
								"east": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										3
									]
								},
								"south": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										3
									]
								},
								"west": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										3
									]
								},
								"up": {
									"uv": [
										0,
										0
									],
									"uv_size": [
										16,
										16
									]
								},
								"down": {
									"uv": [
										16,
										16
									],
									"uv_size": [
										-16,
										-16
									]
								}
							}
						}
					]
				}
			]
		}
	]
}
`
window.trapdoorGeoTemplate = trapdoorGeoTemplate;


const boatGeoTemplate = `
{
	"format_version": "1.12.0",
	"minecraft:geometry": [
		{
			"description": {
				"identifier": "geometry.custom_boat",
				"texture_width": 128,
				"texture_height": 64,
				"visible_bounds_width": 5,
				"visible_bounds_height": 3,
				"visible_bounds_offset": [
					0,
					0.5,
					0
				]
			},
			"bones": [
				{
					"name": "boat",
					"pivot": [
						0,
						-5,
						0
					]
				},
				{
					"name": "paddle_right",
					"parent": "boat",
					"pivot": [
						4,
						9,
						9
					],
					"cubes": [
						{
							"origin": [
								-9.5,
								14,
								-5.5
							],
							"size": [
								2,
								2,
								18
							],
							"pivot": [
								-1,
								0,
								-5
							],
							"rotation": [
								142.5,
								130,
								180
							],
							"uv": {
								"north": {
									"uv": [
										80,
										18
									],
									"uv_size": [
										2,
										2
									]
								},
								"east": {
									"uv": [
										62,
										18
									],
									"uv_size": [
										18,
										2
									]
								},
								"south": {
									"uv": [
										100,
										18
									],
									"uv_size": [
										2,
										2
									]
								},
								"west": {
									"uv": [
										82,
										18
									],
									"uv_size": [
										18,
										2
									]
								},
								"up": {
									"uv": [
										80,
										0
									],
									"uv_size": [
										2,
										18
									]
								},
								"down": {
									"uv": [
										82,
										18
									],
									"uv_size": [
										2,
										-18
									]
								}
							}
						},
						{
							"origin": [
								-9.49,
								13,
								8.5
							],
							"size": [
								1,
								6,
								7
							],
							"pivot": [
								-1,
								0,
								-5
							],
							"rotation": [
								142.5,
								130,
								180
							],
							"uv": {
								"north": {
									"uv": [
										69,
										7
									],
									"uv_size": [
										1,
										6
									]
								},
								"east": {
									"uv": [
										62,
										7
									],
									"uv_size": [
										7,
										6
									]
								},
								"south": {
									"uv": [
										77,
										7
									],
									"uv_size": [
										1,
										6
									]
								},
								"west": {
									"uv": [
										70,
										7
									],
									"uv_size": [
										7,
										6
									]
								},
								"up": {
									"uv": [
										69,
										0
									],
									"uv_size": [
										1,
										7
									]
								},
								"down": {
									"uv": [
										70,
										7
									],
									"uv_size": [
										1,
										-7
									]
								}
							}
						}
					]
				},
				{
					"name": "paddle_left",
					"parent": "boat",
					"pivot": [
						4,
						9,
						-9
					],
					"cubes": [
						{
							"origin": [
								-1.5,
								10,
								-10.5
							],
							"size": [
								2,
								2,
								18
							],
							"pivot": [
								-1,
								0,
								-5
							],
							"rotation": [
								142.5,
								57.5,
								180
							],
							"uv": {
								"north": {
									"uv": [
										80,
										18
									],
									"uv_size": [
										2,
										2
									]
								},
								"east": {
									"uv": [
										62,
										18
									],
									"uv_size": [
										18,
										2
									]
								},
								"south": {
									"uv": [
										100,
										18
									],
									"uv_size": [
										2,
										2
									]
								},
								"west": {
									"uv": [
										82,
										18
									],
									"uv_size": [
										18,
										2
									]
								},
								"up": {
									"uv": [
										80,
										0
									],
									"uv_size": [
										2,
										18
									]
								},
								"down": {
									"uv": [
										82,
										18
									],
									"uv_size": [
										2,
										-18
									]
								}
							}
						},
						{
							"origin": [
								-0.49,
								9,
								3.5
							],
							"size": [
								1,
								6,
								7
							],
							"pivot": [
								-1,
								0,
								-5
							],
							"rotation": [
								142.5,
								57.5,
								180
							],
							"uv": {
								"north": {
									"uv": [
										69,
										7
									],
									"uv_size": [
										1,
										6
									]
								},
								"east": {
									"uv": [
										62,
										7
									],
									"uv_size": [
										7,
										6
									]
								},
								"south": {
									"uv": [
										77,
										7
									],
									"uv_size": [
										1,
										6
									]
								},
								"west": {
									"uv": [
										70,
										7
									],
									"uv_size": [
										7,
										6
									]
								},
								"up": {
									"uv": [
										69,
										0
									],
									"uv_size": [
										1,
										7
									]
								},
								"down": {
									"uv": [
										70,
										7
									],
									"uv_size": [
										1,
										-7
									]
								}
							}
						}
					]
				},
				{
					"name": "left",
					"parent": "boat",
					"pivot": [
						0,
						19,
						9
					],
					"cubes": [
						{
							"origin": [
								-14,
								3,
								8
							],
							"size": [
								28,
								6,
								2
							],
							"uv": {
								"north": {
									"uv": [
										30,
										45
									],
									"uv_size": [
										-28,
										6
									]
								},
								"east": {
									"uv": [
										32,
										45
									],
									"uv_size": [
										-2,
										6
									]
								},
								"south": {
									"uv": [
										60,
										45
									],
									"uv_size": [
										-28,
										6
									]
								},
								"west": {
									"uv": [
										2,
										45
									],
									"uv_size": [
										-2,
										6
									]
								},
								"up": {
									"uv": [
										30,
										43
									],
									"uv_size": [
										-28,
										2
									]
								},
								"down": {
									"uv": [
										58,
										45
									],
									"uv_size": [
										-28,
										-2
									]
								}
							}
						}
					]
				},
				{
					"name": "right",
					"parent": "boat",
					"pivot": [
						0,
						19,
						-9
					],
					"rotation": [
						0,
						-180,
						0
					],
					"cubes": [
						{
							"origin": [
								-14,
								3,
								-10
							],
							"size": [
								28,
								6,
								2
							],
							"uv": {
								"north": {
									"uv": [
										30,
										37
									],
									"uv_size": [
										-28,
										6
									]
								},
								"east": {
									"uv": [
										32,
										37
									],
									"uv_size": [
										-2,
										6
									]
								},
								"south": {
									"uv": [
										60,
										37
									],
									"uv_size": [
										-28,
										6
									]
								},
								"west": {
									"uv": [
										2,
										37
									],
									"uv_size": [
										-2,
										6
									]
								},
								"up": {
									"uv": [
										30,
										35
									],
									"uv_size": [
										-28,
										2
									]
								},
								"down": {
									"uv": [
										58,
										37
									],
									"uv_size": [
										-28,
										-2
									]
								}
							}
						}
					]
				},
				{
					"name": "front",
					"parent": "boat",
					"pivot": [
						15,
						19,
						0
					],
					"rotation": [
						0,
						90,
						0
					],
					"cubes": [
						{
							"origin": [
								7,
								3,
								-1
							],
							"size": [
								16,
								6,
								2
							],
							"uv": {
								"north": {
									"uv": [
										18,
										29
									],
									"uv_size": [
										-16,
										6
									]
								},
								"east": {
									"uv": [
										20,
										29
									],
									"uv_size": [
										-2,
										6
									]
								},
								"south": {
									"uv": [
										36,
										29
									],
									"uv_size": [
										-16,
										6
									]
								},
								"west": {
									"uv": [
										2,
										29
									],
									"uv_size": [
										-2,
										6
									]
								},
								"up": {
									"uv": [
										18,
										27
									],
									"uv_size": [
										-16,
										2
									]
								},
								"down": {
									"uv": [
										34,
										29
									],
									"uv_size": [
										-16,
										-2
									]
								}
							}
						}
					]
				},
				{
					"name": "back",
					"parent": "boat",
					"pivot": [
						-15,
						19,
						0
					],
					"rotation": [
						0,
						-90,
						0
					],
					"cubes": [
						{
							"origin": [
								-24,
								3,
								-1
							],
							"size": [
								18,
								6,
								2
							],
							"uv": {
								"north": {
									"uv": [
										20,
										21
									],
									"uv_size": [
										-18,
										6
									]
								},
								"east": {
									"uv": [
										22,
										21
									],
									"uv_size": [
										-2,
										6
									]
								},
								"south": {
									"uv": [
										40,
										21
									],
									"uv_size": [
										-18,
										6
									]
								},
								"west": {
									"uv": [
										2,
										21
									],
									"uv_size": [
										-2,
										6
									]
								},
								"up": {
									"uv": [
										20,
										19
									],
									"uv_size": [
										-18,
										2
									]
								},
								"down": {
									"uv": [
										38,
										21
									],
									"uv_size": [
										-18,
										-2
									]
								}
							}
						}
					]
				},
				{
					"name": "bottom",
					"parent": "boat",
					"pivot": [
						0,
						13,
						0
					],
					"rotation": [
						90,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-14,
								5,
								-13
							],
							"size": [
								28,
								16,
								3
							],
							"uv": {
								"north": {
									"uv": [
										31,
										3
									],
									"uv_size": [
										-28,
										16
									]
								},
								"east": {
									"uv": [
										34,
										3
									],
									"uv_size": [
										-3,
										16
									]
								},
								"south": {
									"uv": [
										62,
										3
									],
									"uv_size": [
										-28,
										16
									]
								},
								"west": {
									"uv": [
										3,
										3
									],
									"uv_size": [
										-3,
										16
									]
								},
								"up": {
									"uv": [
										31,
										0
									],
									"uv_size": [
										-28,
										3
									]
								},
								"down": {
									"uv": [
										59,
										3
									],
									"uv_size": [
										-28,
										-3
									]
								}
							}
						}
					]
				},
				{
					"name": "water",
					"parent": "boat",
					"pivot": [
						0,
						-5,
						0
					],
					"cubes": [
						{
							"origin": [
								-14,
								3,
								-8
							],
							"size": [
								28,
								6,
								16
							],
							"uv": {
								"north": {
									"uv": [
										112,
										0
									],
									"uv_size": [
										16,
										6
									]
								},
								"east": {
									"uv": [
										100,
										0
									],
									"uv_size": [
										28,
										6
									]
								},
								"south": {
									"uv": [
										112,
										22
									],
									"uv_size": [
										16,
										6
									]
								},
								"west": {
									"uv": [
										100,
										0
									],
									"uv_size": [
										28,
										6
									]
								},
								"up": {
									"uv": [
										112,
										0
									],
									"uv_size": [
										16,
										28
									]
								},
								"down": {
									"uv": [
										112,
										28
									],
									"uv_size": [
										16,
										-28
									]
								}
							}
						}
					]
				}
			]
		}
	]
}
`
window.boatGeoTemplate = boatGeoTemplate;

const chestBoatGeoTemplate = `
{
	"format_version": "1.12.0",
	"minecraft:geometry": [
		{
			"description": {
				"identifier": "geometry.custom_chest_boat",
				"texture_width": 128,
				"texture_height": 128,
				"visible_bounds_width": 5,
				"visible_bounds_height": 3,
				"visible_bounds_offset": [
					0,
					0.5,
					0
				]
			},
			"bones": [
				{
					"name": "boat",
					"pivot": [
						0,
						-5,
						0
					]
				},
				{
					"name": "left",
					"parent": "boat",
					"pivot": [
						0,
						19,
						9
					],
					"cubes": [
						{
							"origin": [
								-14,
								3,
								8
							],
							"size": [
								28,
								6,
								2
							],
							"uv": {
								"north": {
									"uv": [
										30,
										45
									],
									"uv_size": [
										-28,
										6
									]
								},
								"east": {
									"uv": [
										32,
										45
									],
									"uv_size": [
										-2,
										6
									]
								},
								"south": {
									"uv": [
										60,
										45
									],
									"uv_size": [
										-28,
										6
									]
								},
								"west": {
									"uv": [
										2,
										45
									],
									"uv_size": [
										-2,
										6
									]
								},
								"up": {
									"uv": [
										30,
										43
									],
									"uv_size": [
										-28,
										2
									]
								},
								"down": {
									"uv": [
										58,
										45
									],
									"uv_size": [
										-28,
										-2
									]
								}
							}
						}
					]
				},
				{
					"name": "right",
					"parent": "boat",
					"pivot": [
						0,
						19,
						-9
					],
					"rotation": [
						0,
						-180,
						0
					],
					"cubes": [
						{
							"origin": [
								-14,
								3,
								-10
							],
							"size": [
								28,
								6,
								2
							],
							"uv": {
								"north": {
									"uv": [
										30,
										37
									],
									"uv_size": [
										-28,
										6
									]
								},
								"east": {
									"uv": [
										32,
										37
									],
									"uv_size": [
										-2,
										6
									]
								},
								"south": {
									"uv": [
										60,
										37
									],
									"uv_size": [
										-28,
										6
									]
								},
								"west": {
									"uv": [
										2,
										37
									],
									"uv_size": [
										-2,
										6
									]
								},
								"up": {
									"uv": [
										30,
										35
									],
									"uv_size": [
										-28,
										2
									]
								},
								"down": {
									"uv": [
										58,
										37
									],
									"uv_size": [
										-28,
										-2
									]
								}
							}
						}
					]
				},
				{
					"name": "front",
					"parent": "boat",
					"pivot": [
						15,
						19,
						0
					],
					"rotation": [
						0,
						90,
						0
					],
					"cubes": [
						{
							"origin": [
								7,
								3,
								-1
							],
							"size": [
								16,
								6,
								2
							],
							"uv": {
								"north": {
									"uv": [
										18,
										29
									],
									"uv_size": [
										-16,
										6
									]
								},
								"east": {
									"uv": [
										20,
										29
									],
									"uv_size": [
										-2,
										6
									]
								},
								"south": {
									"uv": [
										36,
										29
									],
									"uv_size": [
										-16,
										6
									]
								},
								"west": {
									"uv": [
										2,
										29
									],
									"uv_size": [
										-2,
										6
									]
								},
								"up": {
									"uv": [
										18,
										27
									],
									"uv_size": [
										-16,
										2
									]
								},
								"down": {
									"uv": [
										34,
										29
									],
									"uv_size": [
										-16,
										-2
									]
								}
							}
						}
					]
				},
				{
					"name": "back",
					"parent": "boat",
					"pivot": [
						-15,
						19,
						0
					],
					"rotation": [
						0,
						-90,
						0
					],
					"cubes": [
						{
							"origin": [
								-24,
								3,
								-1
							],
							"size": [
								18,
								6,
								2
							],
							"uv": {
								"north": {
									"uv": [
										20,
										21
									],
									"uv_size": [
										-18,
										6
									]
								},
								"east": {
									"uv": [
										22,
										21
									],
									"uv_size": [
										-2,
										6
									]
								},
								"south": {
									"uv": [
										40,
										21
									],
									"uv_size": [
										-18,
										6
									]
								},
								"west": {
									"uv": [
										2,
										21
									],
									"uv_size": [
										-2,
										6
									]
								},
								"up": {
									"uv": [
										20,
										19
									],
									"uv_size": [
										-18,
										2
									]
								},
								"down": {
									"uv": [
										38,
										21
									],
									"uv_size": [
										-18,
										-2
									]
								}
							}
						}
					]
				},
				{
					"name": "bottom",
					"parent": "boat",
					"pivot": [
						0,
						13,
						0
					],
					"rotation": [
						90,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-14,
								5,
								-13
							],
							"size": [
								28,
								16,
								3
							],
							"uv": {
								"north": {
									"uv": [
										31,
										3
									],
									"uv_size": [
										-28,
										16
									]
								},
								"east": {
									"uv": [
										34,
										3
									],
									"uv_size": [
										-3,
										16
									]
								},
								"south": {
									"uv": [
										62,
										3
									],
									"uv_size": [
										-28,
										16
									]
								},
								"west": {
									"uv": [
										3,
										3
									],
									"uv_size": [
										-3,
										16
									]
								},
								"up": {
									"uv": [
										31,
										0
									],
									"uv_size": [
										-28,
										3
									]
								},
								"down": {
									"uv": [
										59,
										3
									],
									"uv_size": [
										-28,
										-3
									]
								}
							}
						}
					]
				},
				{
					"name": "water",
					"parent": "boat",
					"pivot": [
						0,
						-5,
						0
					],
					"cubes": [
						{
							"origin": [
								-14,
								3,
								-8
							],
							"size": [
								28,
								6,
								16
							],
							"uv": {
								"north": {
									"uv": [
										112,
										0
									],
									"uv_size": [
										16,
										12
									]
								},
								"east": {
									"uv": [
										100,
										0
									],
									"uv_size": [
										28,
										12
									]
								},
								"south": {
									"uv": [
										112,
										44
									],
									"uv_size": [
										16,
										12
									]
								},
								"west": {
									"uv": [
										100,
										0
									],
									"uv_size": [
										28,
										12
									]
								},
								"up": {
									"uv": [
										112,
										0
									],
									"uv_size": [
										16,
										56
									]
								},
								"down": {
									"uv": [
										112,
										56
									],
									"uv_size": [
										16,
										-56
									]
								}
							}
						}
					]
				},
				{
					"name": "paddle_left",
					"parent": "boat",
					"pivot": [
						4,
						9,
						-9
					],
					"cubes": [
						{
							"origin": [
								-1.5,
								10,
								-10.5
							],
							"size": [
								2,
								2,
								18
							],
							"pivot": [
								-1,
								0,
								-5
							],
							"rotation": [
								142.5,
								57.5,
								180
							],
							"uv": {
								"north": {
									"uv": [
										80,
										18
									],
									"uv_size": [
										2,
										2
									]
								},
								"east": {
									"uv": [
										62,
										18
									],
									"uv_size": [
										18,
										2
									]
								},
								"south": {
									"uv": [
										100,
										18
									],
									"uv_size": [
										2,
										2
									]
								},
								"west": {
									"uv": [
										82,
										18
									],
									"uv_size": [
										18,
										2
									]
								},
								"up": {
									"uv": [
										80,
										0
									],
									"uv_size": [
										2,
										18
									]
								},
								"down": {
									"uv": [
										82,
										18
									],
									"uv_size": [
										2,
										-18
									]
								}
							}
						},
						{
							"origin": [
								-0.49,
								9,
								3.5
							],
							"size": [
								1,
								6,
								7
							],
							"pivot": [
								-1,
								0,
								-5
							],
							"rotation": [
								142.5,
								57.5,
								180
							],
							"uv": {
								"north": {
									"uv": [
										69,
										7
									],
									"uv_size": [
										1,
										6
									]
								},
								"east": {
									"uv": [
										62,
										7
									],
									"uv_size": [
										7,
										6
									]
								},
								"south": {
									"uv": [
										77,
										7
									],
									"uv_size": [
										1,
										6
									]
								},
								"west": {
									"uv": [
										70,
										7
									],
									"uv_size": [
										7,
										6
									]
								},
								"up": {
									"uv": [
										69,
										0
									],
									"uv_size": [
										1,
										7
									]
								},
								"down": {
									"uv": [
										70,
										7
									],
									"uv_size": [
										1,
										-7
									]
								}
							}
						}
					]
				},
				{
					"name": "paddle_right",
					"parent": "boat",
					"pivot": [
						4,
						9,
						9
					],
					"cubes": [
						{
							"origin": [
								-9.5,
								14,
								-5.5
							],
							"size": [
								2,
								2,
								18
							],
							"pivot": [
								-1,
								0,
								-5
							],
							"rotation": [
								142.5,
								130,
								180
							],
							"uv": {
								"north": {
									"uv": [
										80,
										18
									],
									"uv_size": [
										2,
										2
									]
								},
								"east": {
									"uv": [
										62,
										18
									],
									"uv_size": [
										18,
										2
									]
								},
								"south": {
									"uv": [
										100,
										18
									],
									"uv_size": [
										2,
										2
									]
								},
								"west": {
									"uv": [
										82,
										18
									],
									"uv_size": [
										18,
										2
									]
								},
								"up": {
									"uv": [
										80,
										0
									],
									"uv_size": [
										2,
										18
									]
								},
								"down": {
									"uv": [
										82,
										18
									],
									"uv_size": [
										2,
										-18
									]
								}
							}
						},
						{
							"origin": [
								-9.49,
								13,
								8.5
							],
							"size": [
								1,
								6,
								7
							],
							"pivot": [
								-1,
								0,
								-5
							],
							"rotation": [
								142.5,
								130,
								180
							],
							"uv": {
								"north": {
									"uv": [
										69,
										7
									],
									"uv_size": [
										1,
										6
									]
								},
								"east": {
									"uv": [
										62,
										7
									],
									"uv_size": [
										7,
										6
									]
								},
								"south": {
									"uv": [
										77,
										7
									],
									"uv_size": [
										1,
										6
									]
								},
								"west": {
									"uv": [
										70,
										7
									],
									"uv_size": [
										7,
										6
									]
								},
								"up": {
									"uv": [
										69,
										0
									],
									"uv_size": [
										1,
										7
									]
								},
								"down": {
									"uv": [
										70,
										7
									],
									"uv_size": [
										1,
										-7
									]
								}
							}
						}
					]
				},
				{
					"name": "chest",
					"parent": "boat",
					"pivot": [
						0,
						0,
						0
					],
					"cubes": [
						{
							"origin": [
								-14,
								3,
								-6
							],
							"size": [
								12,
								8,
								12
							],
							"uv": {
								"north": {
									"uv": [
										36,
										88
									],
									"uv_size": [
										12,
										8
									]
								},
								"east": {
									"uv": [
										0,
										88
									],
									"uv_size": [
										12,
										8
									]
								},
								"south": {
									"uv": [
										24,
										88
									],
									"uv_size": [
										12,
										8
									]
								},
								"west": {
									"uv": [
										12,
										88
									],
									"uv_size": [
										12,
										8
									]
								},
								"up": {
									"uv": [
										24,
										88
									],
									"uv_size": [
										-12,
										-12
									]
								},
								"down": {
									"uv": [
										36,
										88
									],
									"uv_size": [
										-12,
										-12
									]
								}
							}
						},
						{
							"origin": [
								-14,
								10,
								-6
							],
							"size": [
								12,
								5,
								12
							],
							"uv": {
								"north": {
									"uv": [
										36,
										71
									],
									"uv_size": [
										12,
										5
									]
								},
								"east": {
									"uv": [
										0,
										71
									],
									"uv_size": [
										12,
										5
									]
								},
								"south": {
									"uv": [
										24,
										71
									],
									"uv_size": [
										12,
										5
									]
								},
								"west": {
									"uv": [
										12,
										71
									],
									"uv_size": [
										12,
										5
									]
								},
								"up": {
									"uv": [
										24,
										71
									],
									"uv_size": [
										-12,
										-12
									]
								},
								"down": {
									"uv": [
										36,
										71
									],
									"uv_size": [
										-12,
										-12
									]
								}
							}
						},
						{
							"origin": [
								-2,
								8,
								-1
							],
							"size": [
								1,
								4,
								2
							],
							"uv": {
								"north": {
									"uv": [
										2,
										60
									],
									"uv_size": [
										1,
										4
									]
								},
								"east": {
									"uv": [
										0,
										60
									],
									"uv_size": [
										2,
										4
									]
								},
								"south": {
									"uv": [
										3,
										60
									],
									"uv_size": [
										1,
										4
									]
								},
								"west": {
									"uv": [
										4,
										60
									],
									"uv_size": [
										2,
										4
									]
								},
								"up": {
									"uv": [
										3,
										61
									],
									"uv_size": [
										-1,
										-2
									]
								},
								"down": {
									"uv": [
										4,
										61
									],
									"uv_size": [
										-1,
										-2
									]
								}
							}
						}
					]
				}
			]
		}
	]
}
`
window.chestBoatGeoTemplate = chestBoatGeoTemplate;

const renderControllerTemplate = `
{
	"format_version": "1.8.0",
	"render_controllers": {
		"controller.render.(wood_type)_boat": {
			"geometry": "geometry.default",
			"materials": [
				{
					"*": "material.default"
				},
				{
					"water": "material.water"
				}
			],
			"textures": [
				"texture.default"
			],
			"is_hurt_color": {},
			"on_fire_color": {}
		}
	}
}
`
window.renderControllerTemplate = renderControllerTemplate;

const blocksTemplate = `
{
	"format_version": [
		1,
		1,
		0
	],
	"(identifier):(wood_type)_planks": {
		"textures": "(wood_type)_planks",
		"sound": "wood"
	},
	"(identifier):(wood_type)_log": {
		"textures": "(wood_type)_log",
		"sound": "wood"
	},
	"(identifier):stripped_(wood_type)_log": {
		"textures": "stripped_(wood_type)_log",
		"sound": "wood"
	},
	"(identifier):(wood_type)_slab": {
		"textures": "(wood_type)_planks",
		"sound": "wood"
	},
	"(identifier):(wood_type)_leaves": {
		"textures": "(wood_type)_leaves",
		"sound": "grass"
	},
	"(identifier):(wood_type)_sapling_block": {
		"textures": "(wood_type)_sapling_block",
		"sound": "grass"
	},
	"(identifier):(wood_type)_fence": {
		"textures": "(wood_type)_planks",
		"sound": "wood"
	},
	"(identifier):(wood_type)_fence_gate": {
		"textures": "(wood_type)_planks",
		"sound": "wood"
	},
	"(identifier):(wood_type)_trapdoor": {
		"textures": "(wood_type)_trapdoor",
		"sound": "wood"
	},
	"(identifier):(wood_type)_wood": {
		"textures": "(wood_type)_wood",
		"sound": "wood"
	},
	"(identifier):stripped_(wood_type)_wood": {
		"textures": "stripped_(wood_type)_wood",
		"sound": "wood"
	},
	"(identifier):(wood_type)_stairs": {
		"textures": "(wood_type)_planks",
		"sound": "wood"
	},
	"(identifier):(wood_type)_door_tile": {
		"textures": "(wood_type)_door_lower",
		"sound": "wood"
	}
}
`
window.blocksTemplate = blocksTemplate;

const terrainTextureTemplate = `
{
	"num_mip_levels": 4,
	"padding": 8,
	"resource_pack_name": "(identifier)_(wood_type)",
	"texture_name": "atlas.terrain",
	"texture_data": {
		"(wood_type)_planks": {
			"textures": "textures/blocks/(wood_type)_planks"
		},
		"(wood_type)_log": {
			"textures": "textures/blocks/(wood_type)_log"
		},
		"(wood_type)_log_top": {
			"textures": "textures/blocks/(wood_type)_log_top"
		},
		"(wood_type)_stripped_log": {
			"textures": "textures/blocks/(wood_type)_stripped_log"
		},
		"(wood_type)_stripped_log_top": {
			"textures": "textures/blocks/(wood_type)_stripped_log_top"
		},
		"(wood_type)_leaves": {
			"textures": "textures/blocks/(wood_type)_leaves"
		},
		"(wood_type)_leaves_opaque": {
			"textures": "textures/blocks/(wood_type)_leaves_opaque"
		},
		"(wood_type)_sapling": {
			"textures": "textures/blocks/(wood_type)_sapling"
		},
		"(wood_type)_trapdoor": {
			"textures": "textures/blocks/(wood_type)_trapdoor"
		},
		"(wood_type)_door_lower": {
			"textures": "textures/blocks/(wood_type)_door_lower"
		},
		"(wood_type)_door_upper": {
			"textures": "textures/blocks/(wood_type)_door_upper"
		}
	}
}
`
window.terrainTextureTemplate = terrainTextureTemplate;

const itemTextureTemplate = `
{
	"resource_pack_name": "(identifier)_(wood_type)",
	"texture_name": "atlas.items",
	"texture_data": {
		"(wood_type)_sapling": {
			"textures": "textures/blocks/(wood_type)_sapling"
		},
		"(wood_type)_door": {
			"textures": "textures/items/(wood_type)_door"
		},
		"(wood_type)_boat": {
			"textures": "textures/items/(wood_type)_boat"
		},
		"(wood_type)_chest_boat": {
			"textures": "textures/items/(wood_type)_chest_boat"
		}
	}
}
`
window.itemTextureTemplate = itemTextureTemplate;

const bpManifestTemplate = `
{
	"format_version": 2,
	"header": {
	  "description": "pack.description",
	  "name": "pack.name",
	  "uuid": "(uuid0)",
	  "version": [0, 0, 1],
	  "min_engine_version": [1,20,32]
	},
	"modules": [
	  {
		"type": "data",
		"uuid": "(uuid2)",
		"version": [0, 0, 1]
	  }
	],
	"dependencies": [
	  {
		"uuid": "(uuid1)",
		"version": [0, 0, 1]
	  }
	],
	"metadata": {
	  "authors": [
		"Donthedev",
		"Wood Type Generator"
	  ]
	}
  }
`
window.bpManifestTemplate = bpManifestTemplate;
const rpManifestTemplate = `
{
	"format_version": 2,
	"header": {
	  "description": "pack.description",
	  "name": "pack.name",
	  "uuid": "(uuid1)",
	  "version": [0, 0, 1],
	  "min_engine_version": [1,20,32]
	},
	"modules": [
	  {
		"type": "resources",
		"uuid": "(uuid3)",
		"version": [0, 0, 1]
	  }
	],
	"dependencies": [
	  {
		"uuid": "(uuid0)",
		"version": [0, 0, 1]
	  }
	],
	"metadata": {
	  "authors": [
		"Donthedev",
		"Wood Type Generator"
	  ]
	}
  } 
`
window.rpManifestTemplate = rpManifestTemplate;

const serverLangTemplate = `pack.name=(identifier)'s (wood_type) pack
pack.description=Made with Don's Wood Type Generator.
`
window.serverLangTemplate = serverLangTemplate;

const clientLangTemplate = `pack.name=(identifier.clean)'s (wood_type.clean) pack
pack.description=Made with Don's Wood Type Generator.
tile.(identifier):(wood_type)_door.name=(wood_type.clean) Door
tile.(identifier):(wood_type)_fence.name=(wood_type.clean) Fence
tile.(identifier):(wood_type)_fence_gate.name=(wood_type.clean) Fence Gate
tile.(identifier):(wood_type)_leaves.name=(wood_type.clean) Leaves
tile.(identifier):(wood_type)_log.name=(wood_type.clean) Log
tile.(identifier):stripped_(wood_type)_log.name=Stripped (wood_type.clean) Log
tile.(identifier):(wood_type)_planks.name=Planks (wood_type.clean)
tile.(identifier):(wood_type)_sapling_block.name=(wood_type.clean) Sapling Block
tile.(identifier):(wood_type)_slab.name=(wood_type.clean) Slab
tile.(identifier):(wood_type)_stairs.name=(wood_type.clean) Stairs
tile.(identifier):stripped_(wood_type)_wood.name=Stripped (wood_type.clean) Wood
tile.(identifier):(wood_type)_trapdoor.name=(wood_type.clean) Trapdoor
tile.(identifier):(wood_type)_wood.name=(wood_type.clean) Wood
entity.(identifier):(wood_type)_boat.name=(wood_type.clean) Boat
entity.(identifier):(wood_type)_chest_boat.name=(wood_type.clean) Chest Boat
item.(identifier):(wood_type)_boat.name=(wood_type.clean) Boat
item.(identifier):(wood_type)_chest_boat.name=(wood_type.clean) Chest Boat
item.(identifier):(wood_type)_door.name=(wood_type.clean) Door
item.(identifier):(wood_type)_sapling.name=(wood_type.clean) Sapling
`
window.clientLangTemplate = clientLangTemplate;

const languagesTemplate = `
[
	"en_US"
]
`
window.langTemplate = languagesTemplate;