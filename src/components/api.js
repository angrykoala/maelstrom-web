var Api = {
    //url:"127.0.0.1",
    //port:"8080",
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
    }
};
module.exports = Api;
window.Map = Api;
