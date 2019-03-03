
# Photomosaic Front End

The UI for the services you set up [here](https://github.com/rjvanvoorhis/photomosaic_open_faas)

## Installation
Make sure you have node and yarn installed

```bash
# node
sudo apt-get update && sudo apt-get install nodejs

#yarn 
sudo apt-get update && sudo apt-get install yarn
```
or with brew on Mac

```bash
# install homebrew if you don't have it already
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

brew install node
brew install yarn
```


## Usage
Now `cd` into the project directory and start up the the dev server with `yarn start`

You should see this
```bash
yarn run v1.12.3
$ python setup.py && webpack-dev-server --host 0.0.0.0 --port 8081
Looking for apiUrl at http://10.0.0.237:5000/api/v1/photomosaic
Project is running at http://0.0.0.0:8081/
ℹ ｢wdm｣: webpack output is served from /
ℹ ｢wdm｣: 404s will fallback to /index.html
ℹ ｢wdm｣: Hash: 5587bd268dd4f03202a8
Version: webpack 4.29.0
```
Then a bunch of output before finally
```
ℹ ｢wdm｣: Compiled successfully.

```

Now you can go to the site at `http://localhost:8081/`

## License
[MIT](https://choosealicense.com/licenses/mit/)