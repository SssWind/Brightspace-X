function initTheme() {

    var cssText = '';
    cssText += ':root{--darklight-nav-primary-color:' + getCustomThemeOption('navPrimaryColor') + '}';
    cssText += '#d2l_body, .d2l-body {background:' + getCustomThemeOption('overridePageBackgroundColor') + '!important;}';
    browser.runtime.sendMessage({
        action: 'insertCSS',
        data: {code: cssText}
    });

    // widget header dropdown
    var dropdownCSS = baseURL + 'theme/theme_' + options.GLB_ThemeID + '/shadow_widget_header_dropdown.css';
    var dropdowns = document.querySelectorAll('.d2l-homepage-header-menu-wrapper d2l-dropdown d2l-button-icon');
    dropdowns.forEach(function (el) {
        injectCSS(dropdownCSS, $(el.shadowRoot), 'file');
        injectCSS(dropdownCSS, $(el.shadowRoot.querySelector('button d2l-icon').shadowRoot), 'file');
    });

    // full width
    if (getCustomThemeOption('fullWidthLayout')) {
        body.addClass('darklight-fullwidth');
    }

    // wait for navbar
    var d2lNavigation = document.querySelector('d2l-navigation');
    if (d2lNavigation !== null) {
        if (d2lNavigation.shadowRoot !== null) {
            themeOnNavbarReady(d2lNavigation);
        } else {
            var navCounter = 0;
            var navInterval = setInterval(function () {
                if (d2lNavigation.shadowRoot !== null || navCounter > 20) {
                    clearInterval(navInterval);
                    themeOnNavbarReady(d2lNavigation);
                }
                navCounter++;
            }, 200);
        }
    }
}

function themeOnNavbarReady(d2lNavigation) {
    d2lNavigation.setAttribute('data-navbar-init', '');
    // css
    injectCSSShadow(baseURL + 'theme/theme_' + options.GLB_ThemeID + '/shadow_navbar.css',
        $(d2lNavigation), 'file', true);
    // full width
    if (getCustomThemeOption('fullWidthLayout')) {
        injectCSS('.d2l-navigation-centerer{max-width:none!important}',
            $(d2lNavigation.querySelector('d2l-navigation-main-header').shadowRoot), 'text');
        injectCSS('.d2l-navigation-centerer{max-width:none!important}',
            $(d2lNavigation.querySelector('d2l-navigation-main-footer').shadowRoot), 'text');
    }
    // logo
    var logoFile = getCustomThemeOption('customLogoURL');
    if (logoFile !== '[default]' && logoFile.length > 0) replaceLogo(logoFile);
}

initTheme();