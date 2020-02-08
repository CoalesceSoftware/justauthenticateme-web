<p align="center"><a href="https://www.justauthenticate.me" target="_blank" rel="noopener noreferrer"><img width="100" src="https://justauthenticateme.netlify.com/favicon.png" alt="JustAuthenticateMe logo"></a></p>
<p align="center">
  <a href="https://prettier.io/">
    <img alt="types: typescript" src="https://badgen.net/badge/code style/prettier/ff69b4">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img alt="types: typescript" src="https://badgen.net/badge/types/TypeScript/blue">
  </a>
</p>
<h1 align="center">JustAuthenticateMe Web JS SDK</h1>

## Introduction

[JustAuthenticateMe](https://www.justauthenticate.me) offers simple magic link based authentication as a service for web apps. This is a tiny library for using JustAuthenticateMe intended for use from within a browser. If you're looking for the sdk for use on the backend in nodejs, see [justauthenticateme-node](https://github.com/CoalesceSoftware/justauthenticateme-node).

## Browser Compatibility

This library uses [async functions](https://caniuse.com/#feat=async-functions) and [fetch](https://caniuse.com/#feat=fetch) and does not support IE.

## Getting Started

### Package Manager with Bundler

Installing via npm or yarn

```
npm install --save justauthenticateme-web
yarn add justauthenticateme-web
```

Importing

```js
import JustAuthenticateMe from "justauthenticateme-web";
```

### Directly from unpkg with ESModules

```js
import JustAuthenticateMe from "https://unpkg.com/justauthenticateme-web@latest/dist/index.js";
```

### Initializing the library

Pass your App ID from the JustAuthenticateMe dashboard to the constructor.

```js
const appId = "dcd6555e-edff-4f3d-83c9-3af79ea8f895";
const jam = new JustAuthenticateMe(appId);
```

## Use Cases

### Authenticating a User

```js
await jam.initAuth("someone@example.com");
```

This will generate a magic link and send it to the email argument. Upon clicking the magic link the user will be redirected to the Redirect URL specified for your app in the JustAuthenticateMe Dashboard with an ID Token and Refresh Token (if enabled) as query string parameters.
Successful promise completion means the email was successfully generated and sent.

### Grabbing the ID Token and Refresh Token from the URL

```js
const { idToken, refreshToken } = jam.getTokensFromURL();
```

Once the user clicks the magic link and gets redirected back to your site, you need to get the tokens from the query string. This is a helper function to do just that.
`refreshToken` will be `null` if your app is not configured to allow refresh using the JustAuthenticateMe Dashboard.

### Getting a new ID Token using a Refresh Token

```js
const newIdToken = await jam.refresh(refreshToken);
```

### Deleting a Refresh Token

```js
await jam.deleteRefreshToken(idToken, refreshToken);
```

`idToken` must be a valid ID Token for the user. `refreshToken` will no longer be valid after calling this function. It's recommended to call this function when logging out in addition to deleting the `refreshToken` from local memory.

### Deleting all Refresh Tokens (Sign Out Everywhere)

```js
await jam.deleteAllRefreshTokens(idToken);
```

`idToken` must be a valid ID Token for the user. Calling this function will invalidate all existing `refreshToken`s for the user, effectively logging the user out from all devices.

## License

[MIT](http://opensource.org/licenses/MIT)
