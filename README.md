# Twitch Alertbox

This is a simple Twitch Alertbox that displays alerts for Twitch follows, raids, and other events directly on your stream. The alert system supports different sound notifications and animations for each event.

## Features

- **Follow Alerts**: Displays a custom alert when someone follows your channel.
- **Raid Alerts**: Shows an alert with the number of viewers when your channel is raided.
- **Customizable Sounds**: Different sounds for each event.
- **Queue System**: Alerts are queued if one is already being displayed.
- **Animations**: Alerts slide in and out with animation for a dynamic look.

## Installation

1. Clone the repository or download the files.
    ```bash
    git clone https://github.com/your-username/twitch-alertbox.git
    ```

2. Ensure you have the necessary files:
    - `index.html`: Main HTML structure.
    - `style.css`: Styling for the alertbox.
    - `script.js`: JavaScript for handling events and alerts.
    - `tmi.js`: Twitch Messaging Interface (TMI) library.
    - Sound files: `bit.mp3`, `sub.mp3`, `follow.mp3`, `raid.mp3`.

3. Replace the placeholders in `script.js`:
    - `Bot_Name_Here`: Replace with your bot's Twitch username.
    - `OAuth_Token_Here`: Replace with your bot's OAuth token. You can get it from [Twitch OAuth Token Generator](https://twitchapps.com/tmi/).
    - `You_Channel_Here`: Replace with your Twitch channel name.

4. Customize your sound files and alerts. Ensure you have the sound files (`bit.mp3`, `sub.mp3`, `follow.mp3`, `raid.mp3`) in your project directory or modify the `<audio>` tags in `index.html`.

## Usage

1. Open `index.html` in a web browser to test the alerts.
2. Use the commands `!testfollow` and `!testraid` in your chat to simulate a follow and raid event respectively. These commands will trigger the alert system and play the corresponding sounds.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
Copyright

## Copyright
© 2025 MiseryJane on Twitch

## Configuration

You can configure the bot further by adjusting the settings in `script.js`, such as changing the alert text, sound files, or even the animation style in `style.css`.

### Example:

```javascript
client.on('follow', (channel, username) => {
    showAlert(`${username} just followed!`, 'follow.gif');
});

client.on('raid', (channel, username, viewers) => {
    showAlert(`${username} raided with ${viewers} viewers!`, 'raid.gif');
});```

