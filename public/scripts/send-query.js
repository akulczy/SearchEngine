let currentQuery = "";

// Method to send the query that was inserted into the input box
const sendQuery = () => {
    // Check which model was selected
    let modelType = $("#select-model").val();

    $("#display-docs").removeClass("container");
    $("#display-docs").empty();
    let queryVal = $("#query-text").val();
    currentQuery = queryVal;

    // Query cannot be submitted if the  field is left empty
    if(queryVal.replace(/\s+/g, "") == "") {
        return alert("Please input your query before submitting.");
    }

    // Number of documents
    let docNo = $("#doc-no").val();
    if(parseInt(docNo) <= 0 || parseInt(docNo) > 1400) {
        return alert("Please enter a number between 1 and 1400.");
    }

    // Displaying spinner element once the submit button is clicked
    if(!($("#loading-space").hasClass(".activeLoad"))) {
        $("#loading-space").append('<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>');
        $("#loading-space").addClass(".activeLoad");
    }

    // Determine the right request to submit query to either BM25 or VSM model
    let urlPath = "";
    if(modelType == "0") {
        urlPath = "/query/send/bm25";
    } else {
        urlPath = "/query/send/vsm";
    }

    // Post query to back-end
    $.ajax({
        url: urlPath,
        method: "POST",
        data: { queryVal: queryVal, docNo: docNo },
        // Actions depending on the status code in the response
        statusCode: {
            200: (data) => {
                console.log(data.docs);
                let documents = data.docs;
                let ranked_docs_ids = data.ranked_docs_ids;
                $("#loading-space").removeClass(".activeLoad");
                $(".spinner-border").remove();

                $("#display-docs").addClass("container");

                $("#display-docs").append(`<div class="doc-container"><b><div class="row g-2"><div class="col-sm-10">Documents</div><div class="col-sm-2 checkbox-col">Relevant</div></div></b></div>`);

                $("#display-docs").append(`<div class="title-line"></div>`);

                for(let i = 0; i < documents.length; i++) {
                    $("#display-docs").append(`<div class="doc-container"><div class="docs-id"><b>${i+1}.</b> (ID: ${ranked_docs_ids[i]})</div> </br> <div class="row g-2"><div class="col-sm-10">${documents[i]}</div><div class="col-sm-2 checkbox-col"><input class="form-check-input feedback-check" type="checkbox" value="${ranked_docs_ids[i]}"></div></div></div><div class="title-line"></div>`);
                }

                // Append button which submit relevance feedback
                $("#display-docs").append(`<div class="btn-align">
                    <button type="button" class="btn btn-primary" id="submit-feedback">Submit Relevance Feedback</button>
                </div>`);

                $("#submit-feedback").click(() => {
                    submitRelevanceFeedback();
                });
            },
            400: () => {
                $("#loading-space").removeClass(".activeLoad");
                $(".spinner-border").remove();
                return alert("An error occurred while processing your request. Please try again.");
            }
        }
    });
}

$("#submit-query").click(() => {
    sendQuery();
});

const submitRelevanceFeedback = () => {
    // Collect all checkboxes
    let checkboxes = $(".feedback-check");
    // Object to store checkboxes and corresponding values
    let checkboxesObj = [];
    for(let i = 0; i < checkboxes.length; i++) {
        let checkb = checkboxes[i];
        if($(checkb).prop("checked")) {
            checkboxesObj.push(1);
        } else {
            checkboxesObj.push(0);
        }
    }

    // Check how many documents
    let docNo = checkboxes.length;
    // Check which model was selected
    let modelType = $("#select-model").val();

    $("#display-docs").removeClass("container");
    $("#display-docs").empty();

    // Displaying spinner element once the submit button is clicked
    if(!($("#loading-space").hasClass(".activeLoad"))) {
        $("#loading-space").append('<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>');
        $("#loading-space").addClass(".activeLoad");
    }

    // Determine the right request to submit query to either BM25 or VSM model
    let urlPath = "";
    if(modelType == "0") {
        urlPath = "/query/send/bm25/feedback";
    } else {
        urlPath = "/query/send/vsm/feedback";
    }

    // Post data to back-end
    $.ajax({
        url: urlPath,
        method: "POST",
        data: { docNo: docNo, queryVal: currentQuery, checkboxesObj: JSON.stringify(checkboxesObj) },
        // Actions depending on the status code in the response
        statusCode: {
            200: (data) => {
                console.log(data.docs);
                let documents = data.docs;
                let ranked_docs_ids = data.ranked_docs_ids;
                $("#loading-space").removeClass(".activeLoad");
                $(".spinner-border").remove();

                $("#display-docs").addClass("container");                

                $("#display-docs").append(`<div class="title-line"></div>`);

                for(let i = 0; i < documents.length; i++) {
                    $("#display-docs").append(`<div class="doc-container">
                        <div class="docs-id">
                            <b>${i+1}.</b> (ID: ${ranked_docs_ids[i]})
                        </div> </br> 
                        <div class="row g-2">
                            <div class="col-sm-12">${documents[i]}</div>
                        </div>
                        </div>
                        <div class="title-line"></div>`);
                }

                
            },
            400: () => {
                $("#loading-space").removeClass(".activeLoad");
                $(".spinner-border").remove();
                return alert("An error occurred while processing your request. Please try again.");
            }
        }
    });
}