from dotenv import load_dotenv, dotenv_values

dotenv_values = dotenv_values()
print(dotenv_values.get("MY_VARIABLE"))


#alternative way

import os #equals to node process.env
load_dotenv()
print(os.getenv("MY_VARIABLE"))