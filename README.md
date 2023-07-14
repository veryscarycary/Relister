# Relister

Automating relisting posts on secondhand seller sites

## Site Support

Currently, Relister supports relisting active listings for the following listing sites:

Craigslist
Facebook Marketplace.


## Dependencies
### Node

Tested working with Node v18.16.1

If you don't already have Node installed, download Node. I recommend using NVM(Node Version Manager) to enable you to switch between Node versions.

#### Node Installation - Mac

1. Download homebrew by pasting and running this in your terminal:
`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

2. Install NVM by pasting and running the following commands in your terminal: 
```brew update
brew install nvm
mkdir ~/.nvm
echo "export NVM_DIR=~/.nvm" >> ~/.zshrc
echo "source $(brew --prefix nvm)/nvm.sh" >> ~/.zshrc
source ~/.zshrc```

3. Install Node version 18(paste/run the commands)
```nvm install 18
nvm use 18```

### Project Dependencies

`cd` into the project directory(whereever you git cloned this project) and run `npm install` to install the project dependencies.

e.g.
```cd ~/relister
npm install```

## Setup

1. Create a .env file at the root of the project with the following values filled and tailored to you:

```# FACEBOOK VALUES

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
ZIP_CODE="92111"```

