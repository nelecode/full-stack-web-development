/**
 * Get
 * Homepage
 */

exports.homepage = async function(req, res){
    const locals = {
        title: "Nodejs notes",
        description: "free nodejs notes app"
    }
    res.render("index", locals);
}

exports.about = async function(req, res){
    const locals = {
        title: "about - Nodejs notes",
        description: "free nodejs notes app"
    }
    res.render("about", locals);
}