var _Manifests = {
     "levels": {
          "psychogoldfish": {}
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
                    ]
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
                    ]
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
                    ]
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
                    ]
               }
          }
     }
};
