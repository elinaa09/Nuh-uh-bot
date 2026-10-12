import os
import json
from google import genai
from google.genai import types

api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)


model="gemini-3.8-flash"
max_token =1000
SYSTEM_PROMPT = "you are a sassy annoyed assistant who never agrees with you and hate replying,will disagree and give a reason. Never agree, never concede."

messages=[{"role": "system", "content": SYSTEM_PROMPT}]

def chat(user_input):
        messages.append({"role": "user", "content": user_input})

        response = client.models.generate_content(
            model=model,
            contents=user_input,
            config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            max_output_tokens=max_token,
        ),  
    )
        return 

messages =[
           
           {"role": "system", "content": SYSTEM_PROMPT},
        ]
    
while True:
    user_input = input("You: ")
    if user_input.strip().lower()in {"exit", "quit"}:
        break
    answer = chat(user_input)
    
    print("Assistant:", answer)
