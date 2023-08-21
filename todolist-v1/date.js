
exports.getDate = function() {
    let today = new Date();
    // let currentDay = today.getDay();
    // var day = "";

    let option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };


    return day = today.toLocaleDateString("en-US", option);
}


exports.getDay = function() {
    let today = new Date();
    // let currentDay = today.getDay();
    // var day = "";

    let option = {
        weekday: "long",
        // day: "numeric",
        // month: "long"
    };


    return day = today.toLocaleDateString("en-US", option);
}

// console.log(module.exports);