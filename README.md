# [SocioBay](https://video-app-0109-4335-dev.twil.io?passcode=73920201094335)

#### Live Version: [Here](https://video-app-0109-4335-dev.twil.io?passcode=73920201094335)

##### NOTE - If the link asks for password in landing page, it is '73920201094335'. Twilio deployment has added the passcode feature for security purposes. Without it, anyone can use the video app and incur charges on my Twilio account. Also, it needs redeployment every week as the password get expired after every week.

## What is it

Multi User Video Chat Application built with [Twilio's Programmable Video JS SDK](https://github.com/twilio/twilio-video.js), [Twilio's Conversations JS SDK](https://www.npmjs.com/package/@twilio/conversations), and [Create React App](https://github.com/facebook/create-react-app).

![App Preview](https://user-images.githubusercontent.com/12685223/94631109-cfca1c80-0284-11eb-8b72-c97276cf34e4.png)

## Features

The Video app has the following features:

:heavy_check_mark: Video conferencing with real-time video and audio\
:heavy_check_mark: Chat support for textual and file-based messaging\
:heavy_check_mark: Enable/disable camera\
:heavy_check_mark: Mute/unmute mic\
:heavy_check_mark: Screen sharing\
:heavy_check_mark: Dominant speaker indicator\
:heavy_check_mark: Network quality indicator\
:heavy_check_mark: Defines participant bandwidth usage with the Bandwidth Profile API

## Prerequisites

You must have the following installed:

- [Node.js v12+](https://nodejs.org/en/download/)
- NPM v6+ (comes installed with newer Node versions)

## Install Dependencies

Run `npm install` to install all dependencies from NPM.

If you want to use `yarn` to install dependencies, first run the [yarn import](https://classic.yarnpkg.com/en/docs/cli/import/) command. This will ensure that yarn installs the package versions that are specified in `package-lock.json`.

## Install Twilio CLI

The app is deployed to Twilio using the Twilio CLI. Install twilio-cli with:

    $ npm install -g twilio-cli

Login to the Twilio CLI. You will be prompted for your Account SID and Auth Token, both of which you can find on the dashboard of your [Twilio console](https://twilio.com/console).

    $ twilio login

This app requires an additional plugin. Install the CLI plugin with:

    $ twilio plugins:install @twilio-labs/plugin-rtc

**Note:** If you have previously installed the `@twilio-labs/plugin-rtc` plugin, please make sure that you are using the most recent version. You can upgrade the plugin by running `twilio plugins:update`. The chat feature requires version 0.8.1 or greater of `@twilio-labs/plugin-rtc`.

### Running a local token server

This application requires an access token to connect to a Room for Video and a Conversation for Chat. The included local token [server](server/index.ts) provides the application with access tokens. This token server can be used to run the app locally, and it is the server that is used when this app is run in development mode with `npm start`. Perform the following steps to setup the local token server:

- Create an account in the [Twilio Console](https://www.twilio.com/console).
- Click on 'Settings' and take note of your Account SID.
- Create a new API Key in the [API Keys Section](https://www.twilio.com/console/video/project/api-keys) under Programmable Video Tools in the Twilio Console. Take note of the SID and Secret of the new API key.
- Create a new Conversations service in the [Services section](https://www.twilio.com/console/conversations/services) under the Conversations tab in the Twilio Console. Take note of the SID generated.
- Store your Account SID, API Key SID, API Key Secret, and Conversations Service SID in a new file called `.env` in the root level of the application (example below).

```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_API_KEY_SID=SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_API_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_CONVERSATIONS_SERVICE_SID=ISxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Now the local token server (see [server/index.ts](server/index.ts)) can dispense Access Tokens to connect to a Room and a Conversation. See [.env.example](.env.example) for information on additional environment variables that can be used.

**Note:** the use of Twilio Conversations is optional. If you wish to opt out, simply run or build this app with the `REACT_APP_DISABLE_TWILIO_CONVERSATIONS` environment variable set to `true`.

### Running the App locally

Run the app locally with

    $ npm start

This will start the local token server and run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to see the application in the browser.

The page will reload if you make changes to the source code in `src/`.
You will also see any linting errors in the console. Start the token server locally with

    $ npm run server

The token server runs on port 8081 and expects a `POST` request at the `/token` route with the following JSON parameters:

```
{
  "user_identity": string, // the user's identity
  "room_name": string, // the room name
}
```

### Multiple Participants in a Room

If you want to see how the application behaves with multiple participants, you can simply open `localhost:3000` in multiple tabs in your browser and connect to the same room using different user names.

### Building

Build the React app with

    $ npm run build

This script will build the static assets for the application in the `build/` directory.

## Agile Methodology

Keeping in mind the Agile Methodology, inclusion of chat feature as part of the Adapt phase can be easily removed by just changing an environment variable if not found suitable and can be easily updated as well, without distrupting the working of the entire application. See [.env.example](.env.example) for information on that environment variable ( REACT_APP_DISABLE_TWILIO_CONVERSATIONS ).

## Acknowledgment

[Twilio Video React APP](https://github.com/twilio/twilio-video-app-react)
