# Caldera Roguelike Video Game

Caldera is an online roguelike, turn-based strategy dungeon crawler with procedurally generated heroes, monsters, weapons, spells, and dungeon rooms. The game uses the binary space partitioning algorithm to create random levels and a custom entity component system that applies unique tags to each enemy and weapon for unlimited diversity in the gameplay. Caldera is programmed in JavaScript with the Phaser 3 framework.

!['banner image'](/screenshots/banner-image.png)

## Run Locally
If the Vercel link does not work for you for any reason (please use the latest version of Google Chrome on Desktop to try it), you can run the project locally. You must have node.js and Google Chrome installed. Then, use the node package manager to install a live server:

```
npm install -g live-server
```

Clone this project and change the current directory from your terminal:

```
git clone https://github.com/saarthak2002/caldera-roguelike
cd caldera-roguelike
```

Run the live server:

```
live-server
```

Navigate to http://127.0.0.1:8080 (this is the default, check the output of the live-server command for the exact address) in Google Chrome (may not work on other browsers) to play the game.

## How to play?

The player is spawned randomly in a walkable tile in the dungeon. Use the arrow keys ↑ ↓ → ← on the keyboard to move your hero around. Since this is a turn-based game, the player can only move or perform an action when it's their turn. Once the player's turn is over, every other entity in the dungeon performs their turn. Then, the game waits for the player's input again. The name of the entity whose turn it is currently is highlighted in green in the game UI.

The player has various points associated with them like:

- Health Points (HP): Health points go down when the player is attacked (or due to status effects like poison, burning, or cursed) and go up on using healing items like potions. The game is over if the player's HP hits 0.
- Movement Points (MP): This number controls the number of tiles the player can move in each turn and goes down by one on each move. This forms a critical part of the strategy for the game because both players and enemies are limited by their movement points.
- Action Points (AP): Action points are needed for attacking enemies and collecting items. Various enemies have multiple action points each turn, allowing them to attack the player multiple times for increased difficulty.

The "interact" action in Caldera is simply performed by walking into an entity with the arrow keys. An interaction may be picking up an item or attacking an enemy. The number keys (0-9) allow the player to switch between inventory items, which are displayed in the UI below the player stats. Consuming (e.g. potions) or equipping an item does not cost action points. The player can press space to end their current turn early before exhausting all their movement points. Every turn, the game log in the bottom right corner of the UI is updated with what events are taking place in the game (e.g. "Dwarf does 6 damage to Royal Bat with an Axe"), and players should keep an eye on it to come up with their strategies.

### Attack

Attacks are of two types:

#### Melee
If you have a melee weapon like a sword, dagger, or hammer equipped, simply walk toward an enemy on an adjacent tile to attack them.

#### Ranged
If you equip a ranged weapon like a bow, incantation, or spell, you can use the mouse pointer to hover over a tile with an enemy and left-click it to execute a ranged attack. Each weapon has a range, and the enemy must be within that tile range of the player.

The player's score increases for each enemy they kill, depending on how powerful the enemy is.

### Heroes
The five hero classes in the game are Warrior, Elf, Cleric, Dwarf, and Sorcerer. Each has different stats for HP, MP, AP, attack, and defense, as well as different weapons and abilities with random elements to make each session a new experience.

### Enemies
The game has increasingly powerful enemies that also have unique abilities, attacks, weapons, and randomized drops on destruction. For example, the Necromancer is a rare but dangerous enemy that moves very quickly and has powerful attacks. On destruction, the Necromancer spawns a number of additional monsters in the dungeon. The enemies built into the game are Bat, Cyclops, Slime, Troll, Wizard, and Necromancer. Enemies can also have the "royal" buff, which makes them much more powerful.

### Items
The game has many items like potions, weapons, incantations (lightning or fire), bows, cursed items, and shields that spawn randomly in the dungeon or are dropped by enemies. Items also have an internal tier system that includes standard, iron, silver, and golden tiers, with higher-tiered items being more powerful and having special abilities like weapons that restore HP or potions that can give attack or defense buffs to the player. Items can also inflict certain status effects on players and enemies, like poisoned, cursed, or burning.

## Acknowledgements
- Phaser 3 Framework: [Source](https://phaser.io/) (Creatve Commons)
- The sprite sheet used for Caldera is _Tiny Dungeon CC_ by Kenny: [Source](https://www.kenney.nl/assets/tiny-dungeon) (MIT)
- The background music used is _Glo in the Dark_ by iamoneabe: [Source](https://opengameart.org/content/glo-in-the-dark)
- Other sounds: [Hits](https://opengameart.org/content/37-hitspunches), [Upgrade](https://opengameart.org/content/level-up-power-up-coin-get-13-sounds), [Heal](https://opengameart.org/content/magic-sfx-sample), [Necromancer](https://pixabay.com/sound-effects/demonic-woman-scream-6333/), [Rise](https://opengameart.org/content/level-up-power-up-coin-get-13-sounds)
- RPG sounds by Kenney Vleugels: [Source](www.kenney.nl)
- _PathFinding.js_ by Xueqiao Xu 
- _Roguelike Development with JavaScript_ by Andre Alves Garzia

Note: Open Game Art license terms are found [here](https://opengameart.org/content/faq#q-proprietary).
