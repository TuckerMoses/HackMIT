# importing the requests library 
import requests 

# defining the api-endpoint  
API_ENDPOINT = 'http://max-text-summarizer.codait-prod-41208c73af8fca213512856c7a09db52-0000.us-east.containers.appdomain.cloud/model/predict'
# API_ENDPOINT = 'https://d582ef04b003a1051d035b44f200e783.m.pipedream.net'
headers = {'Content-Type' : 'application/json', 'accept': 'application/json'}

# data to be sent to api 
data = {
  "text": [
    "West experimented with a variety of musical genres on subsequent acclaimed studio albums, including Late Registration (2005), Graduation (2007), and 808s & Heartbreak (2008). Drawing inspiration from maximalism and minimalism, respectively, West's fifth album My Beautiful Dark Twisted Fantasy (2010) and sixth album Yeezus (2013) were also critical successes. He went on to release The Life of Pablo (2016), Ye (2018), and Jesus Is King (2019). West's discography also includes the full-length collaborations Watch the Throne (2011) and Kids See Ghosts (2018) with Jay-Z and Kid Cudi, respectively."
  ]
}
print(data)

# sending post request and saving response as response object 
r = requests.post(url = API_ENDPOINT, json = data, headers = headers) 
# extracting response text  
print(r)
pastebin_url = r.text
print(pastebin_url)