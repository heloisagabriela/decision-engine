from fastapi import FastAPI, Request
from pydantic import BaseModel

from source import getInfos

app = FastAPI()

@app.get("/api/configBackend/{age}/{incoming}")
def getInfo(age, incoming):
    return getInfos(age, incoming)

    

