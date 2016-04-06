User={
    url: "http://localhost:8081",
    getToken:function(){
        return localStorage.token;
    },
    logged:function(){
        if(localStorage.token) return true;
        else return false;
    },
    setToken:function(token){
        localStorage.token=token;
    },
    login:function(data,done){
        var setToken=this.setToken;
        $.ajax({
            url: this.url+"/login",
            type: "POST",
            data: data,
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                setToken(data.token);
                done();
            },
            error: function(res) {
                done(res.responseJSON.error);
            }
        });
    },
    signup: function(data,done){
        var setToken=this.setToken;
        $.ajax({
            url: this.url+"/signup",
            type: "POST",
            data: data,
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                setToken(data.token);
                done();
            },
            error: function(res) {
                done(res.responseJSON.error);
            }
        });
        
        
    },
    logout:function(){
        localStorage.removeItem("token");
        this.token=undefined;
    }
    
    
};
