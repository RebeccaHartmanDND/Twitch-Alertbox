// Configure the bot options
const client = new tmi.Client({
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true,
    },
    identity: {
        username: 'Bot_Name_Here', // Replace with your bot's username
        password: 'oauth:OAuth_Token_Here', // Replace with your OAuth token
    },
    channels: ['You_Channel_Here'], // Replace with your channel name
});

// Connect to Twitch
client.connect().catch(console.error);

let alertTimeout; // Variable to hold the timeout for alert removal
let isAlertVisible = false; // Flag to check if an alert is currently visible
let alertQueue = []; // Queue to hold the alerts that need to be shown

// Listen for new follows
client.on('follow', (channel, username) => {
    console.log(`${username} followed!`);
    showAlert(`${username} just followed!`, 'follow.gif'); // Example of showing an alert with a GIF
});

// Listen for raids
client.on('raid', (channel, username, viewers) => {
    console.log(`${username} raided with ${viewers} viewers!`);
    showAlert(`${username} raided with ${viewers} viewers!`, 'raid.gif'); // Example of showing an alert with a GIF
});

// Listen for new subscriptions
client.on('subscription', (channel, username, method) => {
    console.log(`${username} subscribed!`);
    showAlert(`${username} just subscribed!`, 'sub.gif');
});

// Listen for resubscriptions
client.on('resub', (channel, username, months, message, userstate) => {
    console.log(`${username} resubscribed for ${months} months!`);
    showAlert(`${username} resubscribed for ${months} months!`, 'resub.gif');
});

// Listen for bit donations
client.on('cheer', (channel, userstate, message) => {
    const bits = userstate.bits;
    const username = userstate.username;
    console.log(`${username} donated ${bits} bits!`);
    showAlert(`${username} donated ${bits} bits!`, 'bit.gif');
});

// Simulate follow with a test command
client.on('message', (channel, userstate, message, self) => {
    if (self) return; // Ignore messages from the bot

    // Test the follow simulation using a command
    if (message.toLowerCase() === '!testfollow') {
        const testUsername = 'TestFollower'; // You can choose any name here
        console.log(`${testUsername} followed!`);
        showAlert(`${testUsername} just followed!`, 'follow.gif');
    }
    // Test the raid simulation using a command
    else if (message.toLowerCase() === '!testraid') {
        const testUsername = 'TestFollower'; // You can choose any name here
        console.log(`${testUsername} raided!`);
        showAlert(`${testUsername} raided with 5 viewers!`, 'raid.gif');
    }
    // Test the sub simulation using a command
    else if (message.toLowerCase() === '!testsub') {
        const testUsername = 'TestSubscriber'; // You can choose any name here
        console.log(`${testUsername} subscribed!`);
        showAlert(`${testUsername} just subscribed!`, 'sub.gif');
    }
    // Test the resub simulation using a command
    else if (message.toLowerCase() === '!testresub') {
        const testUsername = 'TestSubscriber'; // You can choose any name here
        console.log(`${testUsername} resubscribed!`);
        showAlert(`${testUsername} resubscribed!`, 'resub.gif');
    }
    // Test the bit donation simulation using a command
    else if (message.toLowerCase() === '!testbit') {
        const testUsername = 'TestDonator'; // You can choose any name here
        const bits = 100; // You can adjust the number of bits for the test
        console.log(`${testUsername} donated ${bits} bits!`);
        showAlert(`${testUsername} donated ${bits} bits!`, 'bit.gif');
    }
});

// Display Alert (customize this based on how you'd like the alerts to appear)
function showAlert(message, image) {
    // If an alert is already visible, add the new one to the queue
    if (isAlertVisible) {
        alertQueue.push({ message, image });
        return; // Skip displaying the alert for now
    }

    // If no alert is visible, show the new one
    displayAlert(message, image);
}

// Display the alert and set up the timeout to remove it after 10 seconds
function displayAlert(message, image) {
    isAlertVisible = true; // Set the flag that an alert is visible

    const alertContainer = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.innerHTML = `<img src="${image}" alt="Alert"> <span>${message}</span>`;

    alertContainer.appendChild(alert);

    // Play the sound after the alert appears
    playSound(image); // Pass the image type to determine which sound to play (could be 'follow.gif' or 'raid.gif')

    // Reset the timeout if the alert is visible
    if (alertTimeout) {
        clearTimeout(alertTimeout);
    }

    // Remove the alert after 10 seconds
    alertTimeout = setTimeout(() => {
        alert.remove();
        isAlertVisible = false; // Reset the flag once the alert is removed

        // If there are queued alerts, show the next one
        if (alertQueue.length > 0) {
            const nextAlert = alertQueue.shift(); // Get the next alert from the queue
            displayAlert(nextAlert.message, nextAlert.image); // Display it
        }
    }, 10000); // 10 seconds
}

// Play Sound (you'd need to have sound elements in your HTML with IDs "followSound" and "raidSound")
function playSound(image) {
    let soundId;

    // Determine which sound to play based on the image type (could be either follow or raid)
    if (image === 'follow.gif') {
        soundId = 'followSound';
    } else if (image === 'raid.gif') {
        soundId = 'raidSound';
    } else if (image === 'sub.gif') {
        soundId = 'subSound';
    } else if (image === 'resub.gif') {
        soundId = 'resubSound';
    } else if (image === 'bit.gif') {
        soundId = 'bitSound';
    }

    // Play the sound
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.play().catch(error => console.error("Sound error:", error));
    }
}
