#nodemon --exec python main.py (to run the file through nodemon)
#create and print a date object
from datetime import date
from datetime import datetime
d = date(2019, 4, 13)
print("date from datetime:")
print(d)

print("datetime from datetime:")
print(datetime.now())

print(datetime.now().strftime("%d/%m/%Y %H:%M:%S"))