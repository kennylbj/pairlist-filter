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

```json
"pairlists": [
    {
        "method": "RemotePairList",
        "mode": "blacklist",
        "pairlist_url": "file:///pairs/blacklist_gateio.json",
        "refresh_period": 1800,
        "keep_pairlist_on_failure": true,
    }
]
```

## Supported Exchanges

- gate.io
