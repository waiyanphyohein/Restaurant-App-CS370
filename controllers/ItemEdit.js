exports.get_MenuItem = function(req,res,next){
    return models.MenuItem.update({
        email: req.body.lead_email        
    },
    {
        where:{
            id : req.params.lead_id
        }
    }).then((result) => {
         res.redirect('/lead/'+req.params.lead_id);
    });
};