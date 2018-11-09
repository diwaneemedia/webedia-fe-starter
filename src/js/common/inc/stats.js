export const stats = {
    _count: function(action, content_type, content_id) {
        const referer = document.referrer ? document.referrer : "";

        const img = new Image();
        const img_src = `°wbstats°index°count?action=${action}
                 &type=${content_type}
                 &id=${content_id}
                 &referer=${encodeURIComponent(referer.substr(0, 40))}
                 &rnd=${Math.ceil(Math.random(10000) * 1000000)}`;

        img.src = img_src.replace(new RegExp("°", "g"), "/");
 },

    countComment: function(type, id) {
        this._count("comment", type, id);
    },
    countView: function(type, id) {
        this._count("view", type, id);
    }
};
