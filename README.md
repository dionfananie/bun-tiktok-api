# Tiktok API using Bun

This project cover how to using tiktok API login (for now) using Bun serve.
TikTok API usage from [Tiktok Developer](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project) using bun 1.2.3

## Tech Stack

**Server:** Bun, Typescript

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CLIENT_KEY` //get client key from https://developers.tiktok.com/doc/getting-started-create-an-app

`CLIENT_SECRET` // get client secret from https://developers.tiktok.com/doc/getting-started-create-an-app

`CLIENT_SCOPES` // scopes that you defined in your tiktok app. ex: "user.info.basic,user.info.stats"

`URL_REDIRECT` // redirect or callback url after oauth success

`URL_FETCH` // url for get access_token

`URL_AUTH` // url tiktok api /v2

`HTTPS_KEY` // file path for your key.pem, for ssl (https)

`HTTPS_CERT`// file path your cert.pem location, for ssl (https)

`PORT` // port of your server listen

## Run Locally

Clone the project

```bash
  git clone https://github.com/dionfananie/bun-tiktok-api.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  bun i or bun install
```

Start the server

```bash
  bun start
```

Start the development

```bash
  bun dev
```
