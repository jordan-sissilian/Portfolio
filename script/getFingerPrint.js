function getFingerprint() {
    var fingerprint = "";

    fingerprint += navigator.userAgent;
    fingerprint += navigator.language;
    fingerprint += new Date().getTimezoneOffset();
    fingerprint += screen.width + "x" + screen.height;
    fingerprint += new Date().getUTCDay();

    fingerprint += typeof InstallTrigger !== 'undefined';
    fingerprint += typeof window.ActiveXObject !== 'undefined';
    fingerprint += 'ontouchstart' in document.documentElement;

    var hash = 0, i, chr;
    for (i = 0; i < fingerprint.length; i++) {
        chr = fingerprint.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
    }
    fingerprint = hash.toString(16)

    return (fingerprint);
}

const fingerPrint = getFingerprint();
export default fingerPrint;