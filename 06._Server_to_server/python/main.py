from fastapi import FastAPI
from datetime import datetime
import requests

app = FastAPI()

@app.get("/date")
def get_date():
    return datetime.now()

@app.get("/datefromexpress")
def get_date_from_express():
    r = requests.get('http://127.0.0.1:3000/date')
    return r.json()

@app.get("/datengrok")
def _():
    response = requests.get('link/date')
    date = response.json()
    return date