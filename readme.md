# Bux.ph Notification Postback API

> Use With Thriftshop Site as a Serverless Function

## Requirements
- netlify-cli
- postman

## Development
- [ ] Clone this Repo

```sh
git clone https://github.com/goldcoders/bux.ph-notify
cd  bux.ph-notify
```

- [ ] Edit ENV: `cp .env.example .env && nvim .env`

- [ ] Install Any NPM Dependencies type: `yarn`

- [ ] Run Local Server: `netlify dev`

- [ ] open postman and set url to `http://localhost:8888/api` method: ***POST***

- [ ] Add Raw JSON

```json
{
    "req_id": "inv_001",
    "status": "Paid"
}
```

- [ ] Click Send, Receive the Response

<details>
  <summary>Response JSON</summary>

> Failed:
```json
{"message":"Payment link does not exist","status":"failed"}
```

</details>

## 1 Click Install For Production

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/goldcoders/bux.ph-notify)

## Deploy on One Specific Site URL in Production

- Go to [Settings](https://app.netlify.com/sites/tss-test/settings/general)

- Click Change Site Name `bux.ph-notify.${yourdomain}.com`

## Production

- make post request with Needed *payload* to `bux.ph-notify.${yourdomain}.com/api`

