export const WB = {
    defer: function (f) {
        document.addEventListener("DOMContentLoaded", f);
    }
};
