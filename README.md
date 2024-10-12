<p align="center">
  <span>Pairlist Filter</span>
</p>

## Description

A pairlist filter to generate whitelist or blacklist for Freqtrade

## Installation (for native approach)

```bash
$ npm i
$ npm i -g pm2
```

## Running

Pairlist filter can be deployed by pm2 (native) or docker approach.

```bash

# development
$ npm run start

# pm2 usage, please ensure pm2 is pre-installed
$ npm run start:pm2
$ npm run stop:pm2
$ npm run logs:pm2

# docker compose usage
$ docker compose build
$ docker compose up -d
$ docker compose down

```

## Usage

Add RemotePairList to freqtrade's config and set it as blacklist mode.
Use 172.17.0.1 if you are using docker, 127.0.0.1 otherwise.

```json
"pairlists": [
    {
        "method": "RemotePairList",
        "mode": "blacklist",
        "pairlist_url": "http://172.17.0.1:3000/blacklist/gateio",
        "number_assets": 10,
        "refresh_period": 1800,
        "read_timeout": 60,
        "keep_pairlist_on_failure": true,
    }
]
```

## Supported Exchanges

- gate.io
