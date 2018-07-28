import re
import json
import subprocess
from flask_cors import CORS, cross_origin
from flask import Flask, request

application = Flask(__name__)
#app.config['DEBUG'] = True #automatically refresh on changes
CORS(application) #enable CORS for all use cases
#CORS(application, resources={r"*": {"origins": "*"}}) 

articlesFile='articles.txt'

@application.route('/wikipediatracker', methods=['GET','POST'])
@cross_origin()
def getArticles():
    if 'n' in request.args:
        n=request.args['n']
    else:
        n=5 #default to 5 articles
    print(n)
    s=subprocess.check_output(['tail','-n',str(n),articlesFile]).decode('utf-8')
    return json.dumps(re.split('\r?\n',s))

#@application.route('/wikipediatracker', methods=['POST'])
#@cross_origin()
#def addArticle():
#    '''
#    append new article to end of file
#    expects json body of the form {"article":"Malcolm_Gladwell"}
#    '''
#    with open(articlesFile,'a') as f:
#        f.write('\n'+request.get_json()['article'])
#
#    return json.dumps({'success': True})

if __name__ == "__main__":
    application.run(host='0.0.0.0')

