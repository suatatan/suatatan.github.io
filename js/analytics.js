// Shared Yandex Metrica counter for the site and standalone learning apps.
(function () {
    if (window.__suatMetricaInitialized) return;
    window.__suatMetricaInitialized = true;

    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js', 'ym');

    ym(98433671, 'init', {webvisor:true, clickmap:true, referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
})();

// Microsoft Clarity session replay (optional analytics, separate from Metrica).
(function () {
    if (window.__suatClaritySetup) return;
    if (!/^(www\.)?suatatan\.com$/i.test(location.hostname)) return;
    window.__suatClaritySetup = true;
    var key = 'suat_clarity_consent_v1';
    var privateApp = /^\/(?:apps\/(?!$|index\.html$|en\/?$|en\/index\.html$)|flaner(?:\/|$)|follama(?:\/|$))/i.test(location.pathname);
    // Deep links can carry private notes or prompts in their URL.
    if (privateApp && (location.search || location.hash)) return;
    if (navigator.globalPrivacyControl === true) return;
    function preference() { try { return localStorage.getItem(key); } catch (_) { return null; } }
    function start() {
        if (window.__suatClarityInitialized) return;
        window.__suatClarityInitialized = true;
        if (privateApp) document.body.setAttribute('data-clarity-mask', 'true');
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "zk44qce35h");
    }
    function setup() {
        var tr = /^tr/i.test(document.documentElement.lang || '') || /^\/(tr|egitim)(\/|$)/.test(location.pathname);
        var pref = preference();
        if (pref === 'yes') start();
        var panel = document.createElement('div');
        panel.setAttribute('data-clarity-mask', 'true');
        panel.style.cssText = 'position:fixed;bottom:14px;left:14px;z-index:2147483647;max-width:calc(100vw - 28px);font:13px/1.45 system-ui,sans-serif;color:#172033';
        var button = function(label, fn) {
            var b = document.createElement('button'); b.type = 'button'; b.textContent = label;
            b.style.cssText = 'font:inherit;padding:7px 10px;margin:3px;border:1px solid #aab6c6;border-radius:6px;background:#fff;color:#172033;cursor:pointer';
            b.onclick = fn; return b;
        };
        function choose(value) {
            try { localStorage.setItem(key, value); } catch (_) {}
            if (value === 'yes') { start(); compact(); }
            else if (window.__suatClarityInitialized) { location.reload(); }
            else compact();
        }
        function compact() {
            panel.replaceChildren(button(tr ? 'Analitik tercihleri' : 'Analytics preferences', expand));
            panel.style.background = 'transparent'; panel.style.padding = '0';
        }
        function expand() {
            panel.replaceChildren();
            panel.style.cssText += ';background:#fff;border:1px solid #d2dae5;border-radius:9px;padding:10px;width:340px;box-shadow:0 2px 12px #0002';
            var msg = document.createElement('div');
            msg.textContent = tr ? 'Siteyi geliştirmek için Microsoft Clarity ile isteğe bağlı oturum kayıtları ve kullanım analizi. Kabul etmek zorunlu değildir.' : 'Optional Microsoft Clarity session recordings and usage analytics help improve this site. Acceptance is not required.';
            panel.append(msg, button(tr ? 'Kabul et' : 'Accept', function(){choose('yes');}), button(tr ? 'Reddet' : 'Decline', function(){choose('no');}));
        }
        document.body.appendChild(panel);
        if (pref === null) expand(); else compact();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, {once:true});
    else setup();
})();
