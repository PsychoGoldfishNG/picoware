var _Manifests = {
     "levels": {
          "psychogoldfish": {
               "emojiman": {
                    "difficulty": 0,
                    "logo": {
                         "team": "psychogoldfish",
                         "image": "sir_reginald_emojiman.png"
                    },
                    "character": {
                         "team": "psychogoldfish",
                         "sheet": "sir_reginald_emojiman_sheet.webp"
                    },
                    "transition": {
                         "team": "psychogoldfish",
                         "name": "emojis"
                    },
                    "intro": {
                         "team": "psychogoldfish",
                         "video": "intro.mp4"
                    },
                    "outro": {
                         "team": "psychogoldfish",
                         "video": "outro.mp4"
                    },
                    "microgames": {
                         "rounds": [
                              1
                         ],
                         "games": [
                              {
                                   "team": "psychogoldfish",
                                   "game": "push_the_button"
                              },
                              {
                                   "team": "psychogoldfish",
                                   "game": "thwomp-stomp"
                              }
                         ]
                    },
                    "bossgame": {
                         "team": "psychogoldfish",
                         "game": "space_face"
                    },
                    "team": "psychogoldfish"
               }
          }
     },
     "microgames": {
          "psychogoldfish": {
               "push_the_button": {
                    "name": "Push the Button",
                    "sceneClass": "microgames.psychogoldfish.push_the_button",
                    "jsFiles": [
                         "push-the-button.js"
                    ],
                    "atlases": [
                         {
                              "key": "gameSprites",
                              "texture": "gameSprites.png",
                              "atlas": "gameSprites.json"
                         }
                    ],
                    "credits": [
                         {
                              "credit": "designer",
                              "name": "PsychoGoldfish"
                         }
                    ],
                    "team": "psychogoldfish"
               },
               "thwomp-stomp": {
                    "name": "Thwomp Stomp",
                    "sceneClass": "microgames.psychogoldfish.thwomp_stomp",
                    "parent": {
                         "team": "psychogoldfish",
                         "name": "push_the_button"
                    },
                    "jsFiles": [
                         "thwomp-stomp.js"
                    ],
                    "atlases": [
                         {
                              "key": "gameSprites",
                              "texture": "gameSprites.png",
                              "atlas": "gameSprites.json"
                         }
                    ],
                    "credits": [
                         {
                              "credit": "designer",
                              "name": "PsychoGoldfish"
                         }
                    ],
                    "team": "psychogoldfish"
               }
          }
     },
     "bossgames": {
          "psychogoldfish": {
               "space_face": {
                    "name": "Space Face",
                    "sceneClass": "bossgames.psychogoldfish.space_face",
                    "jsFiles": [
                         "space-face.js"
                    ],
                    "atlases": [
                         {
                              "key": "gameSprites",
                              "texture": "gameSprites.png",
                              "atlas": "gameSprites.json"
                         }
                    ],
                    "credits": [
                         {
                              "credit": "designer",
                              "name": "PsychoGoldfish"
                         }
                    ],
                    "team": "psychogoldfish"
               }
          }
     },
     "transitions": {
          "psychogoldfish": {
               "emojis": {
                    "name": "Emojis",
                    "sceneClass": "transitions.psychogoldfish.emojis",
                    "jsFiles": [
                         "emojis.js"
                    ],
                    "spritesheets": [
                         {
                              "key": "numberStrip",
                              "image": "numberStrip.png",
                              "frameWidth": 90,
                              "frameHeight": 140
                         }
                    ],
                    "atlases": [
                         {
                              "key": "emojiSprites",
                              "texture": "emojiSprites.png",
                              "atlas": "emojiSprites.json"
                         }
                    ],
                    "credits": [
                         {
                              "credit": "designer",
                              "name": "PsychoGoldfish"
                         }
                    ],
                    "team": "psychogoldfish"
               }
          }
     }
};
