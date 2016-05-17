var Api = {
    timeout: 3000,
    get: function(dir, done) {
        $.ajax({
            url: dir,
            type: "GET",
            dataType: 'json',
            cache: false,
            success: function(data) {
                done(null, data);
            },
            error: function(xhr, status, err) {
                done(err);
            }
        });
    },
    post: function(dir, data, done) {
        $.ajax({
            url: dir,
            type: "POST",
            dataType: 'json',
            data: data,
            cache: false,
            success: function(data) {
                done(null, data);
            },
            error: function(xhr, status, err) {
                done(err);
            }
        });
    },
    getPoll:function(dir,done,timeout){
            var time=timeout || this.timeout;
            $.ajax({
                url: dir,
                type: "GET",
                dataType: 'json',
                cache: false,
                success: function(data) {
                    done(null,data);
                },
                error: function(xhr, status) {
                    setTimeout(function(){
                        this.getPoll(dir,done,timeout);
                    }.bind(this),time);
                }.bind(this)
            });
        }
};
module.exports = Api;
