from fastapi import FastAPI, Request, Response
#formdata python multipart/form-data
from python_multipart import parse
app = FastAPI()


@app.post("/githubwebhook")
async def githubwebhook(request: Request, response: Response):
    if request.headers.get("content-type") == "application/x-www-form-urlencoded":
        payload = await request.json()
    
        print(payload)
        response.status_code = 200
    else:
        response.status_code = 400