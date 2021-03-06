const models = require('../models');

exports.get_landing = function(req, res, next) {
    res.render('landing', { title: 'Express',user: req.user});
}; 

exports.submit_lead = function(req, res, next) {
    console.log("Lead Email: ",req.body.lead_email);
    return models.Lead.create({
        email : req.body.lead_email
    }).then((lead) => {
        res.redirect('/');      
    }).catch((err) => {
       console.log("LEAD EMAIL NOT SUCCESSFUL SAVED."+err);
    });
    
}; 

exports.show_leads = function(req, res, next){
    return models.Lead.findAll().then(leads =>{ 
        res.render('lead/leads', {title : 'EXPRESS',leads: leads,user: req.user});
    });
};

exports.show_lead = function(req, res, next){
    return models.Lead.findOne({
        where: {
            id: req.params.lead_id
        }
    }).then((lead) => {
        console.log("Lead: "+lead);
        res.render('lead/lead',{lead: lead,user: req.user});
    });
};

exports.show_edit_lead = function(req, res, next){
    return models.Lead.findOne({
        where: {
            id: req.params.lead_id
        }
    }).then((lead) => {
        res.render('lead/edit_lead',{lead: lead});
    });
};

exports.edit_lead = function(req, res, next){    
    return models.Lead.update({
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

exports.delete_lead = function(req, res, next){    
    return models.Lead.destroy({
        where: {
            id: req.params.lead_id
        }
    }).then((result) => {
         console.log(result);
         res.redirect('/leads');
    });
};

exports.delete_lead_json = function(req, res, next){    
    return models.Lead.destroy({
        where: {
            id: req.params.lead_id
        }
    }).then((result) => {
         console.log(result);
         res.send({msg: "Success"});
    });
};