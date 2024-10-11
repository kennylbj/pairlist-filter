<p align="center">
  <span>Pairlist Filter</span>
</p>

## Description

A pairlist filter to generate whitelist or blacklist for freqtrade

## Installation

```bash
$ npm install
```

## Running

```bash

# development
$ npm run start

# start with pm2
$ npm run start:pm2

# production mode
$ npm run stop:pm2

```

## Usage

Add RemotePairList to pairlists and set as blacklist mode

```json
"pairlists": [
    {
        "method": "RemotePairList",
        "mode": "blacklist",
        "pairlist_url": "http://127.0.0.1:3000/blacklist/gateio",
        "number_assets": 10,
        "refresh_period": 1800,
        "read_timeout": 60,
        "keep_pairlist_on_failure": true,
    }
]
```

## Supported Exchanges

- gate.io
