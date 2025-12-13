import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# --- CORS CONFIGURATION ---
# This block is crucial for your HTML to access this API
origins = ["*"] # In production, you would replace "*" with your specific website URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- THE ENDPOINT ---
@app.get("/countries")
def get_countries():
    # 1. Open the json file
    with open("country-api/country.json", "r") as f:
        # 2. Load data from file into a python variable
        data = json.load(f)
    
    # 3. Return the data
    return data