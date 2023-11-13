<p align="center">
  <img src="https://github.com/veryscarycary/Relister/assets/16945851/06a9f81c-752c-4c76-926c-9b96453fd0d6" />
</p>

Automate relisting your posts on secondhand seller sites

## Site Support

Currently, Relister supports relisting active listings for the following listing sites:

- Craigslist
- Facebook Marketplace

### Fields

Currently, only the following fields are supported. If you complete other fields on your posts, they will not be automatically filled on the next repost.

##### Craigslist
- category
- condition (optional)
- description
- location
- manufacturer (optional)
- name
- neighborhood
- phone number
- price
- title
- zip code

##### Facebook Marketplace
- category
- condition
- description
- hide from friends
- location
- price
- title

## Download

### git

Clone the project to your computer by running the following in your terminal:
```
git clone https://github.com/veryscarycary/Relister.git
```

### zip

Download the zip file from the green "Code" button on https://nodejs.org/en/download and unzip it somewhere. 

## Requirements

* [Node.js](http://nodejs.org/)

Tested working with Node v16.20.1 (npm v8.19.4) (There are known issues when using Node v18)

If you don't already have Node installed, download Node. If you want to switch between Node versions with ease, I recommend installing NVM(Node Version Manager) to enable you to switch between Node versions.

#### Node Installation Option #1 Standard - Mac & Windows

Download Node via https://nodejs.org/en/download. Choose your operating system to download the installer and follow the prompts.

#### Node Installation Option #2 NVM - Mac

1. Download homebrew by pasting and running this in your terminal:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Install NVM: 
```
brew update
brew install nvm
mkdir ~/.nvm
echo "export NVM_DIR=~/.nvm" >> ~/.zshrc
echo "source $(brew --prefix nvm)/nvm.sh" >> ~/.zshrc
source ~/.zshrc
```

3. Install Node version 16 via NVM:
```
nvm install 16
nvm use 16
```

### Installation Steps

1. `cd` into the project directory(whereever you git cloned this project)
2. Run `npm install`
3. Run `npm run start`

e.g.
```
cd [path-where-you-ran-git-clone]/Relister
npm install
npm run start
```

After running the final command, the electron app should launch on your screen:

<p align="center">
  <img src="https://github.com/veryscarycary/Relister/assets/16945851/9e486f80-66e7-4ecf-8888-827e1abb5422" />
</p>

### Notes on Electron Forge

Currently, the app cannot be built and packaged as a .app file due to its reliance on .env variables. The app will need to be rearchitected to make use of AppData instead in order to function correctly. Until then, you can use `npm start` to run the application normally, or please feel free to make a pull request to complete its transition into a standalone app!

## CLI

The earliest version of this app was designed without a GUI and was intended to be used only through the command line. The benefit of the command line interface is that so you can set up the commands to be run on a consistent cadence, via cron for example, and continuously relist your postings without any direct interaction. You are still able to use this app in this fashion if you so choose.

Follow the steps below to setup environment variables which will be used in the creation/relisting of posts via command line.

## CLI Setup

Create a .env file at the root of the project with the following values filled and tailored to you:

```
# GENERAL

PRICE_DROP="10"

# FACEBOOK VALUES

USERNAME_FB="example@yahoo.com"
PASSWORD_FB="password123"

RELISTER_LOCATION_FB="San Diego, CA"

# CRAIGSLIST VALUES

USERNAME_CL="example@yahoo.com"
PASSWORD_CL="password123"

RELISTER_LOCATION_CL="city of san diego"
RELISTER_MANUFACTURER="Samsung"
RELISTER_NAME="John Smith"
RELISTER_NEIGHBORHOOD="Santa Monica"
RELISTER_PHONE_NUMBER="8881234567"
RELISTER_ZIP_CODE="92111"
```

## CLI Usage

To automatically relist all active postings on Craigslist, run the following command:

```
npm run cl
```

To automatically relist all active postings on Facebook Marketplace, run the following command:

```
npm run fb
```

If you want to drop the price of the posting on the next repost, change the PRICE_DROP variable in your .env file to a number to drop the price by a fixed amount, or a percentage to drop it by a percentage. If you want to keep the price the same, leave the field empty or remove it altogether.

e.g.
```
PRICE_DROP="20"
PRICE_DROP="10%"
PRICE_DROP=
```
