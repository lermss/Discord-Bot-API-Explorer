# Discord Bot API Explorer

A simple web-based interface for exploring your Discord bot's information and managing guilds using the Discord API.

## Features

- **Bot Information**: Load and display your bot's username, ID, and avatar.
- **Guild Management**: View all guilds (servers) your bot is in.
- **Search & Sort**: Search guilds by name and sort them alphabetically.
- **Responsive Design**: Works on desktop and mobile devices.

## Setup

1. **Clone or Download** this repository.

2. **Configure Your Bot Token**:
   - Open `config.js`.
   - Replace `'YOUR_BOT_TOKEN_HERE'` with your actual Discord bot token.
   - **Security Warning**: This is a client-side application. Your bot token will be visible in the browser's network requests. Only use this for development/testing and never expose it publicly.

3. **Open the Application**:
   - Open `index.html` in your web browser.
   - Click "Load Bot Info" to fetch your bot's details.
   - Click "Load Guilds" to view your bot's servers.

## Requirements

- A valid Discord bot token with appropriate permissions.
- A modern web browser with JavaScript enabled.
- Internet connection to access the Discord API.

## API Used

This application uses the [Discord API v10](https://discord.com/developers/docs/reference).

## Security Note

Since this is a client-side web app, all API requests are made directly from the browser. This means your bot token is sent with each request and could be visible in browser developer tools or network logs. Use this tool responsibly and only with test bots or in secure environments.

## Technologies

- HTML5
- CSS3
- JavaScript (ES6+)
- Discord API


## 👤 Author/Contributors

Lerma Magno – Project Lead /API Integration / Developer

Jonalyn Ignacio – Frontend Developer

Angeline Santos – UI/UX Designer


GitHub: https://github.com/lermss/Discord-Bot-API-Explorer

---

## License

This project is for educational purposes. Please refer to Discord's Developer Terms of Service for API usage guidelines.