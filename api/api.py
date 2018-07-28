import re
import json
import subprocess
from flask_cors import CORS
from flask import Flask, request

app = Flask(__name__)
app.config['DEBUG'] = True #automatically refresh on changes
# CORS(app) #enable CORS for all use cases
CORS(app, resources={r"*": {"origins": "*"}}) 

articlesFile='articles.txt'

@app.route('/wikipediatracker', methods=['GET'])
def getArticles():
    if 'n' in request.args:
        n=request.args['n']
    else:
        n=5 #default to 5 articles
    print(n)
    s=subprocess.check_output(['tail','-n',str(n),articlesFile]).decode('utf-8')
    return json.dumps(re.split('\r?\n',s))

@app.route('/wikipediatracker', methods=['POST'])
def addArticle():
    '''
    append new article to end of file
    expects json body of the form {"article":"Malcolm_Gladwell"}
    '''
    with open(articlesFile,'a') as f:
        f.write('\n'+request.get_json()['article'])

    return json.dumps({'success': True})

if __name__ == "__main__":
    app.run()