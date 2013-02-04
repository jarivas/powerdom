var Principal = {
    prototype : Object.create(Component.prototype),

    _className : "Principal",

    //idNode : templateName
    nodes : {
        "banner" : "banner",
        "featured" : "featured",
        "content" : "content",
        "blogroll" : "blogroll",
        "social" : "social",
        "contentinfo" : "contentinfo"
    },
    
    getDataNode_banner : function(){
        
    }
}