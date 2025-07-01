/**
 * Browser Detection Script
 * Adds browser-specific classes to the HTML element for targeted CSS fixes
 */

(function() {
    function detectBrowser() {
        const html = document.documentElement;
        let browserClass = '';
        
        // Detect IE
        const isIE = /*@cc_on!@*/false || !!document.documentMode;
        if (isIE) {
            browserClass = 'ie';
            const version = detectIEVersion();
            if (version) {
                browserClass += ' ie' + version;
            }
        }
        
        // Detect Edge (pre-Chromium)
        const isEdge = !isIE && !!window.StyleMedia;
        if (isEdge) {
            browserClass = 'edge';
        }
        
        // Detect Chrome
        const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
        if (isChrome) {
            browserClass = 'chrome';
        }
        
        // Detect Firefox
        const isFirefox = typeof InstallTrigger !== 'undefined';
        if (isFirefox) {
            browserClass = 'firefox';
        }
        
        // Detect Safari
        const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
        if (isSafari) {
            browserClass = 'safari';
        }
        
        // Detect Opera
        const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        if (isOpera) {
            browserClass = 'opera';
        }
        
        // Add browser class to HTML element
        if (browserClass) {
            html.className += ' ' + browserClass;
        }
        
        // Add OS class
        const platform = navigator.platform.toLowerCase();
        if (platform.indexOf('win') !== -1) {
            html.className += ' windows';
        } else if (platform.indexOf('mac') !== -1) {
            html.className += ' mac';
        } else if (platform.indexOf('linux') !== -1) {
            html.className += ' linux';
        }
        
        // Add mobile/desktop class
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            html.className += ' mobile';
        } else {
            html.className += ' desktop';
        }
    }
    
    function detectIEVersion() {
        const ua = window.navigator.userAgent;
        
        // Test for IE 10
        if (ua.indexOf('MSIE 10.0') !== -1) {
            return 10;
        }
        
        // Test for IE 11
        if (ua.indexOf('Trident/7.0') !== -1) {
            return 11;
        }
        
        // Test for IE 9
        if (ua.indexOf('MSIE 9.0') !== -1) {
            return 9;
        }
        
        // Test for IE 8
        if (ua.indexOf('MSIE 8.0') !== -1) {
            return 8;
        }
        
        return null;
    }
    
    // Run the detection as early as possible
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', detectBrowser);
    } else {
        detectBrowser();
    }
})();