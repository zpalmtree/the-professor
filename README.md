# the-professor

Simple as hell bot which simply applies the 'Student' role to anyone who types
'!student' (Or the chosen prefix)

## Prerequisites

* npm
* python-2

## Setup

* Go [here](https://discordapp.com/developers/applications/me#top) to make a bot.
* Give your bot a name, and then click `Create Application`.
* Scroll down to `Create a Bot User` and click that.
* Note down the `Client ID` for later.
* Now you can get your bot token by clicking `click to reveal` in the bot user section.
* Copy the file `src/config.ts.example` to `src/config.ts` (`cp src/config.ts.example src/config.ts`)
* Enter your token in `config.ts`.
* **Don't reveal this token to anyone!**
* Next you need to get the Channel ID you want the bot to run in.
* In Discord, follow these steps-

   1. Click on `User Settings`(small gear icon to right of name in the bottom left) 
   
   2. Click on `Appearance` 
   
   3. Enable `Developer Mode`.
   
* Edit this link, replacing the string of numbers after `client_id=` with the Client ID you noted down earlier.
`https://discordapp.com/oauth2/authorize?client_id=498258111572738048&scope=bot&permissions=268437568`
* Open said link and choose the server you wish to add the bot to. You must have `Manage Server` permissions.

## Usage

`npm install`
`node -r ts-node/register -r tsconfig-paths/register src/index.ts`
