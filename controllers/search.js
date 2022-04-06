const axios = require("axios");

// Render the main page with the Search Input Box
exports.getMainPage = async (req, res) => {   
    return res.render("main-page", {
    });
}

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
