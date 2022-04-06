// Method to send the query that was inserted into the input box
const sendQuery = () => {
    $("#display-docs").removeClass("container");
    $("#display-docs").empty();
    let queryVal = $("#query-text").val();

    // Query cannot be submitted if the  field is left empty
    if(queryVal.replace(/\s+/g, "") == "") {
        return alert("Please input your query before submitting.");
    }

    // Displaying spinner element once the submit button is clicked
    if(!($("#loading-space").hasClass(".activeLoad"))) {
        $("#loading-space").append('<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>');
        $("#loading-space").addClass(".activeLoad");
    }

    // Post query to back-end
    $.ajax({
        url: "/query/send/bm25",
        method: "POST",
        data: { queryVal: queryVal },
        // Actions depending on the status code in the response
        statusCode: {
            200: (data) => {
                console.log(data.docs);
                let documents = data.docs;
                let ranked_docs_ids = data.ranked_docs_ids;
                $("#loading-space").removeClass(".activeLoad");
                $(".spinner-border").remove();

                $("#display-docs").addClass("container");

                for(let i = 0; i < documents.length; i++) {
                    $("#display-docs").append(`<div class="doc-container"><b>${i+1}.</b> (ID: ${ranked_docs_ids[i]}) </br>${documents[i]}</div>`);
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

$("#submit-query").click(() => {
    sendQuery();
});