import requests
import uuid
import time
import json

api_url = 'https://eq3t9cbwa1.apigw.ntruss.com/custom/v1/22900/aae0b9c44590f05dea53815a382d50ef3c304795c0d0ecccbe28ffd1946bcdce/infer'
secret_key = 'bEpZb2hMZ1BnYXpuZ3ZQcFlweXpkV094Qkd5aU1obW0='

image_file = 'pre3.jpg'
output_file = 'output.json'

request_json = {
    'images': [
        {
            'format': 'jpg',
            'name': 'demo'
        }
    ],
    'requestId': str(uuid.uuid4()),
    'version': 'V2',
    'timestamp': int(round(time.time() * 1000))
}

payload = {'message': json.dumps(request_json).encode('UTF-8')}
files = [
  ('file', open(image_file,'rb'))
]
headers = {
  'X-OCR-SECRET': secret_key
}

response = requests.request("POST", api_url, headers=headers, data = payload, files = files)

res = json.loads(response.text.encode('utf8'))

with open(output_file, 'w', encoding='utf-8') as outfile:
    json.dump(res, outfile, indent=4, ensure_ascii=False)