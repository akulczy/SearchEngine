# Search Engine
Search Engine developed as part of the coursework for the ECS736P Information Retrieval module at Queen Mary University of London. This is the GUI of the application.
Two Information Retrieval models are employed: BM25 (Okapi BM25) and VSM (Vector Space Model). 
## Installation
In order to run the application on your local machine, please follow the steps outlined below.
1. Install Node.js (https://nodejs.org/en/download/).
2. Install the NPM package manager.
3. In order to install all the packages required for the application to run, please execute the following command in the main directory of the project:
```sh
npm install
```
4. In order to start the application, please execute the following command in the main directory of the project:
```sh
npm start
```
5. The application is running on port 3000.
## Endpoints
> GET /
Open the main page.
> POST /query/send/bm25
Send your query data to the BM25 model.
> POST /query/send/vsm
Send your query data to the VSM model. 
> POST /query/send/bm25/feedback
Send your query data to the BM25 model, along with the relevance feedback data.
> POST /query/send/vsm/feedback
Send your query data to the VSM model, along with the relevance feedback data.
