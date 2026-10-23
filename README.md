<img width="542" height="536" alt="botpfp" src="https://github.com/user-attachments/assets/1e336ee3-f582-4c20-b249-170b44cbb018" />
# Nuh-uh-bot

A sassy chatbot that disagrees with everything you say. Built with HTML, CSS and JavaScript.

Live demo: https://elinaa09.github.io/Nuh-uh-bot/


You type a message and the bot finds the closest question in bot.json and replies with its answer. If nothing matches, it gives a random sassy line. Your chat is saved, so it stays after a refresh. It does not use AI, I wrote every reply myself.

#How I made it

I tried an API first, but it needed a key and a server to hide it, and I found it too hard. Then I built it in Python, which worked on my computer but would not run easily live. So I rebuilt it in JavaScript with a JSON file, which runs right in the browser.

#What I struggled with

-Broken braces left code outside any function, so the bot kept saying "my brain broke".
-Typos. JavaScript is case sensitive.
-The browser kept an old copy of my file. A hard refresh (Ctrl+Shift+R) fixed it.
-"whats your name" did not match "what is your name", so I had to clean the text.

(please ignore then python files,it took me lot of time to understand how it works in python so i didnt removed it)

#What I learned
-How to read the Console and follow an error to the exact line.
-How fetch and localStorage work.
-The bot does not understand anything, it only picks from what I wrote.


