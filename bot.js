const chatBox = document.getElementById("chat");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

let knowledge = [];


chatBox.innerHTML = localStorage.getItem("chatHistory") || "";
chatBox.scrollTop = chatBox.scrollHeight;          

fetch("knowledge_base.json")
    .then(res => res.json())
    .then(data => {
        knowledge = data;
        if (chatBox.innerHTML === "") {
            addMessage("hello? what is it that you need now", "bot-message");
        }
    })
    .catch(() => {
        addMessage("couldnt load my brain (knowledge_base.json)", "bot-message");
    });

function addMessage(message, className) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", className);
    msgDiv.textContent = message;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "bot-message");
    typingDiv.textContent = "typing...";
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return typingDiv;
}

function cleanText(text) {
    return text.toLowerCase().trim();
}


function getScore(input, question) {
    const inputWords = cleanText(input).split(" ");
    const questionWords = cleanText(question).split(" ");
    let matches = 0;

    for (let i = 0; i < inputWords.length; i++) {
        if (questionWords.includes(inputWords[i])) {
            matches++;
        }
    }

   return matches / questionWords.length + matches / 100;
}

const fallbackReplies = [
    "Nuh-uh. I dont even know what you are trying to say but i disagree with it anyway, sweetheart.",

    "Nuh-uh. Say that again and i will still disagree, just louder this time darling.",

    "Nuh-uh. Not gonna agree with that, not gonna explain why either. thats the fun part honeybun.",

    "Nuh-uh. You really thought i would have an answer for that? cute. try again.",

    "Nuh-uh. I disagree with whatever that was, and i have a feeling you already knew that."
];


function getBotReply(message) {
    let bestScore = 0;
    let answers = [];

    for (let i = 0; i < knowledge.length; i++) {
        const score = getScore(message, knowledge[i].question);

        if (score > bestScore) {
            bestScore = score;
            answers = [knowledge[i].answer];
        } else if (score === bestScore && score > 0) {
            answers.push(knowledge[i].answer);
        }
    }

    if (bestScore < 0.4) {
        return "Nuh-uh.";
    }

    return answers[Math.floor(Math.random() * answers.length)];
}

sendBtn.onclick = async () => {
    const message = userInput.value.trim();
    if (message === "") return;
    addMessage(message, "user-message");
    userInput.value = "";

    const typingDiv = showTyping();

    // small pause so  typing text shows 
    await new Promise(resolve => setTimeout(resolve, 700));

    let botReply = getBotReply(message);
    if (["bye", "exit", "quit"].includes(message.toLowerCase())) {
        botReply = "bye. i still disagree with you.";
    }

    typingDiv.remove();
    addMessage(botReply, "bot-message");

    localStorage.setItem("chatHistory", chatBox.innerHTML);
};

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});
    