from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer, ChatterBotCorpusTrainer

bot = ChatBot("Nuh-uh bot")

trainer = ChatterBotCorpusTrainer(bot)
trainer.train("chatterbot.corpus.english")

while True:
    user_input = input("You: ")
    if user_input.lower() == {"bye"}:
        break
    print("Bot:", bot.get_response("bai bai sorry for being rude >_<"))
