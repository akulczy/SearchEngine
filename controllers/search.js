const axios = require("axios");

// Render the main page with the Search Input Box
exports.getMainPage = async (req, res) => { 
    // Send trial request to 'wake up' the API Python app deployed on Heroku  
    await axios.get('https://group77-ir-api.herokuapp.com/', {})
    .then(() => {
        console.log("App accessed.");
    }, 
    (error) => {
        console.log(error);
    });
    // Render main page
    return res.render("main-page", {
    });
}

// Send request along with the query value in the request body
// Request sent to /bm25 endpoint to retrieve results output by the Okapi BM25 Model
exports.getBM25Results = async (req, res) => {
    // Retrieve query from the request
    let queryVal = req.body.queryVal;

    output_docs = []
    ranked_docs_ids = []
    // Connect with the developed Python API to retrieve ranked documents
    //await axios.post('http://localhost:5000/bm25', {
    await axios.post('https://group77-ir-api.herokuapp.com/bm25', {
        queryVal: queryVal
    })
    .then((response) => {
        output_docs = response.data.results;
        ranked_docs_ids = response.data.ranked_docs_ids;
    }, 
    (error) => {
        console.log(error);
    });
    
    // Return data with HTTP Status 200
    return res
            .status(200)
            .json({ docs: output_docs, ranked_docs_ids: ranked_docs_ids });
}

// Send request along with the query value in the request body
// Request sent to /vsm endpoint to retrieve results output by the Vector Space Model
exports.getVSMResults = async (req, res) => {
    // Retrieve query from the request
    let queryVal = req.body.queryVal;

    output_docs = []
    ranked_docs_ids = []
    // Connect with the developed Python API to retrieve ranked documents
    //await axios.post('http://localhost:5000/vsm', {
    await axios.post('https://group77-ir-api.herokuapp.com/vsm', {
        queryVal: queryVal
    })
    .then((response) => {
        output_docs = response.data.results;
        ranked_docs_ids = response.data.ranked_docs_ids;
    }, 
    (error) => {
        console.log(error);
    });
    
    // Return data with HTTP Status 200
    return res
            .status(200)
            .json({ docs: output_docs, ranked_docs_ids: ranked_docs_ids });
}
