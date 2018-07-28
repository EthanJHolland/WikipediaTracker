import re
import json
import subprocess
from flask_cors import CORS
from flask import Flask, request

application = Flask(__name__)
#app.config['DEBUG'] = True #automatically refresh on changes
#CORS(application) #enable CORS for all use cases
CORS(application, resources={r"/wikipediatracker": {"origins": "*"}}) 

articlesFile='articles.txt'

@application.route('/wikipediatracker', methods=['GET','POST'])
def getArticles():
    if request.method == 'GET':
        #GET
        if 'n' in request.args:
            n=request.args['n']
        else:
            n=5 #default to 5 articles
        s=subprocess.check_output(['tail','-n',str(n),articlesFile]).decode('utf-8') #use tail to efficiently get the end of the file and store stdout in s
        return json.dumps(re.split('\r?\n',s))  #split result of tail on newlines accounting for the possibility of \r\n
    else:
        #POST
        #expects json body of the form {"article":"Malcolm_Gladwell"}
        with open(articlesFile,'a') as f:
            if request.get_json():
                f.write('\n'+request.get_json()['article']) #append new article to end of file
                return json.dumps({'success': True})
        return json.dumps({'success': False})

if __name__ == "__main__":
    application.run(host='0.0.0.0')

