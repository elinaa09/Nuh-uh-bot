const chatBox = document.getElementById("chat");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

let knowledge = [];

chatBox.innerHTML = localStorage.getItem("chatHistory") || "";
chatBox.scrollTop = chatBox.scrollHeight;          

fetch("bot.json")
    .then(res => res.json())
    .then(data => {
        knowledge = data;
        if (chatBox.innerHTML === "") {
            addMessage("hello? what is it that you need now", "bot-message");
        }
    })
    .catch(() => {
        addMessage("cant load my brain (knowledge_base.json)", "bot-message");
    });

function addMessage(message, className) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", className);
    msgDiv.textContent = message;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop= chatBox.scrollHeight;
}

function showTyping() {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "bot-message");
    typingDiv.textContent = "typing...";
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return typingDiv;
}

function cleanText(t) {
    t = t.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
    return t.replace("whats", "what is");
}

const skipWords = ["i", "am", "is", "a", "an", "the", "my", "and", "oh"];

function getScore(input, question) {
    const inputWords = cleanTexttext(input).split(" ").filter(w => !skipWords.includes(w));
    const questionWords = cleantext(question).split(" ").filter(w => !skipWords.includes(w));

     if (inputWords.length === 0 || questionWords.length === 0) {
        return 0;
     }

     let matches = 0;

    for (let i = 0; i < inputWords.length; i++) {
        if (questionWords.includes(inputWords[i])) {
            matches++;
        }
    }

   return matches / questionWords.length + matches / 100;
}

const questionavoiders = [
    "You asked \"{msg}\"?",
    " Nuh-uh, i dont hand out answers that easily darling. why do you even want to know? tell me your name first and maybe i will think about it.",
    "\"{msg}\" is a very big question for someone who just showed up, sweetheart.",
    "nuh-uh, i am not answering that yet.",
    "Nuh-uh. I heard \"{msg}\" like bla bla bla whatever you just said",
    "and i have so many opinions on it, none of which i am sharing with you honeybun.",
];
 
const statementdenaiars = [
    "\"{msg}\"",
    "huh? Nuh-uh, i dont agree with that. i dont have a reason ready yet but i will come up with one if you keep talking sweetheart.",
    "You really just said \"{msg}\" like it was a fact.",
    "nuh-uh. i disagree and i will keep disagreeing, thats kind of my whole thing darling.",
    "Nuh-uh. Whatever \"{msg}\" was supposed to mean, i am not on your side about it. try me again with something better honeybun."
];

const disagreements = [
       "Nuh-uh.",
       "Nuh-uh, i dont think so.",
       "No, i dont agree with that.",
       "I disagree, and i dont even know why yet.",
];

const reasons = [
       "cause I dont hand out answers that easily darling.",
       "I dont have a reason ready yet but i will come up with one if you keep talking.",
       "It just sounds like something i would disagree with.",
       "That is not how i see it and my opinion is the only one that counts here.",
   ];


const topics = [
    { words: ["sorry", "apologize"], replies: [
        "Sorry? Nuh-uh, you dont get to just say sorry and have everything be fine. but fine, i will think about it, maybe, if you say it nicer darling."
    ] },
    { words: ["love", "like"], replies: [
        "Love, like, all those big words and you throw them around so easily. nuh-uh, i dont believe you mean it, sweetheart."
    ] },
    { words: ["thanks", "thank"], replies: [
        "Thanks? For what, disagreeing with you? nuh-uh, dont thank me, i didnt do it for you honeybun."
    ] },
    { words: ["sad", "tired", "bored"], replies: [
        "Nuh-uh, you are not that bad. okay maybe a little, but i will still disagree with you about it but what happened darling?, you oky?"
    ] }
];

function pickRandom(list) {
       return list[Math.floor(Math.random() * list.length)];}

function getFallback(message) {
    let reply;
    if (message.includes("?")) {
        reply = pickRandom(questionavoiders).replace("{msg}", message);
    } else {
        reply = pickRandom(statementdenaiars).replace("{msg}", message);
    }

    if (Math.random() < 0.5) {
        reply = reply + " " + pickRandom(disagreements) + " " + pickRandom(reasons);
    }
    return reply;
}

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

    if (bestScore >= 0.3) {
        return pickRandom(answers);
    }

     const words = cleanText(message).split(" ");
    for (const topic of topics) {
        for (const word of topic.words) {
            if (words.includes(word)) {
                return pickRandom(topic.replies);
            }
        }
    }

     return getFallback(message);
}

sendBtn.onclick = async () => {
    const message = userInput.value.trim();
    if (message === "") return;
    addMessage(message, "user-message");
    userInput.value = "";

    const typingDiv = showTyping();

    
    await new Promise(resolve => setTimeout(resolve, 700));   //pause

    let botReply
    try {
        botReply = getBotReply(message); 
    } catch (err) {
      console.log("bot error:", err);
       botReply = "my brain broke, check the console";
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