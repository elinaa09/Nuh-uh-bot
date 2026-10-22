# Nuh-uh-bot

A sassy chatbot that disagrees with everything you say. Built with HTML, CSS and JavaScript.

You type a message and the bot finds the closest question in bot.json and replies with its answer. If nothing matches, it gives a random sassy line. Your chat is saved, so it stays after a refresh. It does not use AI, I wrote every reply myself.

<img width="542" height="536" alt="botpfp" src="https://github.com/user-attachments/assets/2b4fe4d3-abf4-4bdc-b74e-819cce30169d" />

#how i made it
I tried an API first, but it needed a key and a server to hide it, and I found it too hard. Then I built it in Python, which worked on my computer but would not run easily live. So I rebuilt it in JavaScript with a JSON file, which runs right in the browser.

#What I struggled with
-Broken braces left code outside any function, so the bot kept saying "my brain broke".
-Typos
-"whats your name" did not match "what is your name", so I had to clean the text.

#What I learned
-How to read the Console and follow an error to the exact line.
-How fetch and localStorage work.
-The bot does not understand anything, it only picks from what I wrote.
