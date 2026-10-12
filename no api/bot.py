from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer

bot = ChatBot("Nuh-uh bot")
trainer = ListTrainer(bot)

while True:
    user_input = input("You: ")
    if user_input.lower() in {"bye","exit","quit"}:
        break
    print("Bot:", bot.get_response("user_input"))
