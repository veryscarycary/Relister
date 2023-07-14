# Relister

Automating relisting posts on secondhand seller sites

## Site Support

Currently, Relister supports relisting active listings for the following listing sites:

- Craigslist
- Facebook Marketplace.

## Download

Clone the project to your computer by running the following in your terminal:
```
git clone https://github.com/veryscarycary/Relister.git
```

## Dependencies
### Node

Tested working with Node v18.16.1

If you don't already have Node installed, download Node. I recommend using NVM(Node Version Manager) to enable you to switch between Node versions.

#### Node Installation - Mac

1. Download homebrew by pasting and running this in your terminal:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

3. Install NVM by pasting and running the following commands in your terminal: 
```
brew update
brew install nvm
mkdir ~/.nvm
echo "export NVM_DIR=~/.nvm" >> ~/.zshrc
echo "source $(brew --prefix nvm)/nvm.sh" >> ~/.zshrc
source ~/.zshrc
```

3. Install Node version 18(paste/run the commands)
```
nvm install 18
nvm use 18
```

### Project Dependencies

`cd` into the project directory(whereever you git cloned this project) and run `npm install` to install the project dependencies.

e.g.
```
cd [path-where-you-ran-git-clone]/Relister
npm install
```

## Setup

1. Create a .env file at the root of the project with the following values filled and tailored to you:

```
# GENERAL

PRICE_DROP="10"

# FACEBOOK VALUES

USERNAME_FB="example@yahoo.com"
PASSWORD_FB="password123"

# CRAIGSLIST VALUES

USERNAME_CL="example@yahoo.com"
PASSWORD_CL="password123"
# This is the value of the 'subarea' on the first screen of new post creation(Note: MUST MATCH CRAIGSLIST'S VALUE)
SUBAREA="city of san diego"
# Free-form fields on the posting
NEIGHBORHOOD="Little Italy"
SELLER_NAME="John"
PHONE_NUMBER="7141234567"
ZIP_CODE="92111"
```

## Usage

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