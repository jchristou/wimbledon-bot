# Wimbledon Tickets Telegram Notifier Bot

> Queries the wimbledon ticket website every minute.
> If tickets are available, posts to telegram.

The bot does not run outside working hours. Wimbledon does not add new tickets in that time.

## Usage

### Update .env file.

```
TELEGRAM_TOKEN=EXAMPLE_TOKEN
TELEGRAM_CHAT_ID=@wimbledonticketnotifier
TELEGRAM_OWNER_CHAT_ID=@yourusername
```

- TELEGRAM_TOKEN = Your Telegram bot's API key
- TELEGRAM_CHAT_ID = The chat id your bot will notify in
- TELEGRAM_OWNER_CHAT_ID = The admin's chat id, used to receive error messages if something's going wrong.

### Update src/wimbledon.js

You will need to update your access token every day. This isn't automated. Sorry. Check the comment on what to do in the wimbledon.js file.

### How to run

- Make sure you have bun installed. If not run "npm install -g bun"
- Run "npm start"
