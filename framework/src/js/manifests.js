var _Manifests = {
     "levels": {
          "dingus": {},
          "psychogoldfish": {}
     },
     "microgames": {
          "dingus": {},
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
          "dingus": {},
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
          "dingus": {},
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
                         },
                         {
                              "key": "hearts",
                              "image": "hearts.png",
                              "frameWidth": 120,
                              "frameHeight": 120
                         },
                         {
                              "key": "levelPhrases",
                              "image": "levelPhrases.png",
                              "frameWidth": 500,
                              "frameHeight": 80
                         }
                    ],
                    "images": [
                         {
                              "key": "happyface",
                              "image": "happyface.png"
                         },
                         {
                              "key": "catface",
                              "image": "catface.png"
                         },
                         {
                              "key": "angryface",
                              "image": "angryface.png"
                         },
                         {
                              "key": "sadface",
                              "image": "sadface.png"
                         },
                         {
                              "key": "evilface",
                              "image": "evilface.png"
                         },
                         {
                              "key": "brickhole",
                              "image": "brickhole.png"
                         },
                         {
                              "key": "gameOver",
                              "image": "gameOver.png"
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
