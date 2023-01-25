# MUSAIK

### Vision
The Musaik team has a vision of making connection through music a much easier process. We want our users to view our app as a hub for finding and connecting with others that share the same musical taste. 

### Description
New music discovery is a souless, intensive experience. If you want to find new artists, you'll have to sift through playlist on top of playlist for hours. Musaik will connect users through streaming parties and auto-match chats. Users will discover new music easily and enjoyably.

### Deployment
~~Our app is now running at https://www.musaik.ml.~~ (deprecated from 01/2023)
- CI & CD is also implemented using GitHub Actions.

### How to Run
How to run our app on your computer.
1. Download npm if it hasn't been installed.
```
# check if npm is already installed
npm -v

# if not, install npm on your computer
npm install -g npm
```
2. Install all the requirements.
```
# root directory
npm install 

# front-end
cd front-end
npm install

# back-end
cd ../back-end
npm install
```
3. Create a build file at ```/front-end```.
```
# under front-end directory
npm run build
```
4. Create a ```.env``` file under the root directory with necessary credentials. For the vaules with [], you need to provide your own credentials. 
* CLIENT_ID, CLIENT_SECRET: Your dedicated ID and secret key from Spotify Developer account
* SESSION_SECRET: Your secret key for expression session
* DB_CONNECTION_STRING: MongoDB connection string
```
NODE_ENV=production
ROOT_URL=http://localhost:8080
CLIENT_ID=[SPOTIFY_CLIENT_ID]
CLIENT_SECRET=[SPOTIFY_CLIENT_SECRET]
SESSION_SECRET=[YOUR_SESSION_SECRET]
DB_CONNECTION_STRING=[YOUR_DB_CONNECTION_STRING]
```
5. Run the server.
```
cd back-end
npm start
```
Now MUSAIK is running on http://localhost:8080.

### Core team members
- [Ahmad Almesned](https://github.com/Ahmadhcs)
- [Alima Zhagufarova](https://github.com/alima2104)
- [Chinedu Nnorom](https://github.com/chinedunnorom)
- [Jeongin Lee](https://github.com/jjeongin)
- [Ryan Rochmanofenna](https://github.com/ryanroch)
- [Zain Faruqi](https://github.com/zain-faruqi)

### History and Collaboration
This project has started from [Zain](https://github.com/zain-faruqi)'s idea to build a social platform for music lovers where listners can recommend musics they love and connect with people who have similar taste.

* [Contribution Guide for Our Core Team](CONTRIBUTING.md)

### Resources
* [UX Design Guide](UX-DESIGN.md)
