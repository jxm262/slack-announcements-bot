# slack-announcements-bot
Bot to auto-send any info from the Node.js [announcements](https://nodejs.org/en/foundation/announcements/) or [blog](https://nodejs.org/en/blog/) pages to the [node.js slack community](nodeslackers.io).  This bot runs every day at 12 noon.

## Development
To use this, you must supply the `config.js` file with a slack outgoing webhook url.  This is used to direct the resulting output to Slack itself.  

**Scripts**
+ `npm run build` - compiles the application to the dist directory
+ `npm start` - starts the app
+ `npm test` - run tests (currently integration tests which posts to live slack) 

