# **lobot**
Lobot's a fun and easy-to-use discord bot. Coded in Node.JS with the discord.js library. Features includes a sardoche's soundboard, other fun sounds and more.

___

## Installation

### 1. Dependencies

##### 1.0 Node.JS & supervisor
 * Download the LTS version from [the Node.JS website](https://nodejs.org/en/download/).
 * Make sure `node`is available in your path.
   * Run Windows+R, type `cmd` and then type `node`. If you see a Node.JS interpretor, all good. If you see some kind of error, follow [this guide](http://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/) (with Node.JS instead of adb, obviously).
 * In an elevated command prompt, type `npm install supervisor -g`. 

##### 1.1 Python 2.7
 * Download Python 2.7 from [Python website](https://www.python.org/download/releases/2.7/).
 * Make sure `python` available in the path.
   * Run Windows+R, type `cmd` and then type `python`. If you see a python interpretor, all good. If you see some kind of error, follow [this guide](http://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/) (with Python instead of adb, obviously).


##### 1.2 FFMPEG 

 * Instructions [here](http://adaptivesamples.com/how-to-install-ffmpeg-on-windows/).


##### 1.3 C++ Build Tools
 * If you have Visual Studio 2013 or 2015, make sure C++ Build Tools are installed. Simply create a new Empty C++ project. If prompted to install the C++ files, do so. 
 * Alternatively, you can install only the Visual C++ Build Tools as a standalone [here](http://landinghub.visualstudio.com/visual-cpp-build-tools).


 ### 2. Installation
 
  * Download lobot from GitHub.
  * Extract the folder.
  * In an elevated command prompt, type `npm install` to install all needed modules.


### 3. Run
 * In an elevated command prompt, type `supervisor app.js`.
 * Enjoy!


---

## Troubleshooting

##### 1.1 Audio not working
Follow these steps, every command should be run in an **elevated** command prompt.

 * Do again steps 1.1 to 1.3
 * Some users have reported that installing VLC helps with codec dependencies, so try that. 
 * Run the following commands to re-install discord.js
   * `npm cache clean`
   * `npm install -g npm`
   * `npm install --save --msvs_version=2015 discord.js`
 * If any errors show, attempt to re-install node-opus manually: 

   * `npm cache clean`
   * `npm install node-opus`

Credits to LuckyEvie#4611 on the Discord API server for this.
