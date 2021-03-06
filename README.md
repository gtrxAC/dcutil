# dcutil
A simple image editor bot for [Discord](https://discord.com) based on [Discord.js](https://discord.js.org) and [Canvas](https://github.com/Automattic/node-canvas/).
* [Invite Link](https://discord.com/oauth2/authorize?client_id=715447131883962419&scope=bot&permissions=52224)
* [Command List](commands.md)


## Functionality
What dcutil can do:
* create new images
* get user avatars
* resize images
* paste images over images
* write text to images
* draw shapes to images
* crop and add borders to images

What dcutil can't do:
* meme generation without your own templates
* add effects to images (check out [NotSoBot](https://discord.com/oauth2/authorize?client_id=439205512425504771&scope=bot) for that)
* live up to people's expectations


## Example
* `_color black`
* `_new`</br>
![Creates a new image.](images/new.png)

* `_color white`
* `_rect 2 2 46 46 4`</br>
![Draws a 46×46 rectangle starting at (2,2) with 4px outline.](images/rect.png)

* `_color red`
* `_circle 50 0 50 50`</br>
![Draws a 50x50 diameter circle starting at (50,0).](images/circle.png)

* `_color darkslateblue`
* `_text 10 60 14 monospace`
* `dcutil`</br>
![Writes "dcutil" starting at (10,60) with 14px monospace font.](images/text.png)


## Self-hosting
1. Clone the repository.
2. Install the dependencies. `npm i discord.js canvas`
3. Create a token.txt file in the root directory and paste your bot token there.
4. Run the bot. `node index.js`
