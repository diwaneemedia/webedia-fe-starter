const $ = require('jquery');

export const hrl = () => {
    initHrl();
    window.app.hrl = function() {
        $('span.hrl').hrl();
    };
    window.app.hrl();
};

function rot13(a) {
    if (a.charAt(0) == '#') {
        a = a.substr(1); // on vire le ! en début de chaîne
        a = a.replace(/\°/g, '/'); // on remplace les | par des /
    } else {
        a = a.replace(/\//g, '°'); // attention c'est tout pourri en cas de non concatenation
    }

    var s = '';
    function rot13map() {
        var map = new Array();
        var s = "abcdefghijklmnopqrstuvwxyz";
        for (i = 0; i < s.length; i++)
            map[s.charAt(i)] = s.charAt((i + 13) % 26);

        for (i = 0; i < s.length; i++)
            map[s.charAt(i).toUpperCase()] = s.charAt((i + 13) % 26).toUpperCase();

        return map;
    }

    for (i = 0; i < a.length; i++) {
        var b = a.charAt(i);
        s += (b >= 'A' && b <= 'Z' || b >= 'a' && b <= 'z' ? rot13map[b] : b);
    }
    return s;
}

function decHrl(a) {
    var k = "0A12B34C56D78E9F";
    var d = '';
    for (var i = 0; i < a.length; i += 2) {
        var ch = k.indexOf(a.charAt(i));
        var cl = k.indexOf(a.charAt(i + 1));
        d += String.fromCharCode((ch * 16) + cl);
    }
    try {
        d = decodeURIComponent(d);
    } catch (e) {
    }
    return d;
}

function initHrl() {
    $.fn.hrl = function () {
        return this.each(function () {
            var $this = $(this),
                $a = $('<a>'),
                href;

            if ($this.attr('rel')) {
                href = rot13($this.attr('rel'));
                $this.removeClass("hrl").addClass("_hrl");
                $.each(this.attributes, function (i, v) {
                    if (v.name == 'rel') {
                        $a.attr('href', href);
                    } else if (v.name == 'class' || v.name == 'style' || v.name == 'id' || v.name == 'title' || v.name == 'target') {
                        $a.attr(v.name, v.value);
                    } else if (v.name == 'dataid') {
                        $a.attr('data-id', v.value);
                    } else if (v.name == 'data-rel') {
                        $a.attr('rel', v.value);
                    } else if (v.name == 'onclick') {
                        v.value = v.value.replace('#WB_HREF#', href);
                        $a.attr('onclick', v.value);
                    } else if (v.name.substr(0, 5) == 'data-') {
                        $a.attr(v.name, v.value);
                    }
                });
            }
            // nouvelle methode de decryptage des liens
            else {
                var enc = $this.attr('class').split(' ')[1];
                if (enc == undefined) enc = $this.attr('class').split(' ')[0];
                // console.log('new', $this, enc);
                $this.removeClass("hrl").addClass("_hrl");
                href = decHrl(enc);

                $.each(this.attributes, function (i, v) {
                    if (v.name == 'style' || v.name == 'id' || v.name == 'title' || v.name == 'target') {
                        $a.attr(v.name, v.value);
                    } else if (v.name == 'class') {
                        $a.attr('class', v.value.replace(enc, ''));
                    } else if (v.name == 'dataid') {
                        $a.attr('data-id', v.value);
                    } else if (v.name == 'data-rel') {
                        $a.attr('rel', v.value);
                    } else if (v.name == 'onclick') {
                        v.value = v.value.replace('#WB_HREF#', href);
                        $a.attr('onclick', v.value);
                    } else if (v.name.substr(0, 5) == 'data-') {
                        $a.attr(v.name, v.value);
                    }
                });

                $a.attr('href', href);

            }
            $a.html($this.html());
            $this.empty().replaceWith($a);
        });
    };
}
