from typing import List, Any, Dict
from fastapi import FastAPI, Request
from pydantic import BaseModel

from source import getInfos, updateRules

app = FastAPI()

# Route to obtain rule validation
@app.get("/api/configBackend/{age}/{incoming}")
def getInfo(age: int, incoming: int):
    return getInfos(age, incoming)

# Route to update rules by creating a new csv
@app.post("/api/configBackend/")
async def updateRule(data: List[Dict[str, Any]]):
    try:
        if data == [{}]:
            print("It is necessary to fill in the body")
        else:
            return updateRules(data)
    except Exception as e:
        print(f"Error: {e}")