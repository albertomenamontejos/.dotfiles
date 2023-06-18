if (!com)
    var com = {};
if (!com.pointBlank)
    com.pointBlank = {};
com.pointBlank.config = {
    classPrefix: 'linkMinerSerp_',
    googleSerpOptions: [
        {type: 'http', key: 'inOutLinks', cls: 'in', text: 'In',img:'star.png', csvColumnTitle: 'Number of In Links'},
        {type: 'http', key: 'inOutLinks', cls: 'out', text: 'Out',img:'star.png', csvColumnTitle: 'Number of Out Links'},
        {type: 'mozseo', key: 'mzPageAuthorityGs', cls: 'mzpa', img:'m.png', text: 'PA', csvColumnTitle: 'Moz Page Authority'},
        {type: 'mozseo', key: 'mzDomainAuthorityGs', cls: 'mzda',img:'m.png', text: 'DA', csvColumnTitle: 'Moz Domain Authority'},

        {type: 'mozseo', key: 'mzBacklinkGs', cls: 'mztl', img:'m.png', text: 'Page', csvColumnTitle: 'Moz Total Links'},
        {type: 'mozseo', key: 'mzRefDomainGs', cls: 'mzrd',img:'m.png', text: 'Domain', csvColumnTitle: 'Moz Root Domains'},

        {type: 'majestic', key: 'mBacklinkGs', cls: 'mtl', img:'star.png', text: 'Page', csvColumnTitle: 'Majestic Total Links'},
        {type: 'majestic', key: 'mRefDomainGs', cls: 'mrd',img:'star.png', text: 'Domain', csvColumnTitle: 'Majestic Root Domains'},
        {type: 'majestic', key: 'mTrustflowGs', cls: 'mtf',img:'star.png', text: 'TF', csvColumnTitle: 'Majestic Trustflow'},
        {type: 'majestic', key: 'mCitationflowGs', cls: 'mcf',img:'star.png', text: 'CF', csvColumnTitle: 'Majestic Citationflow'},
        {type: 'ahrefs', key: 'aBacklinkGs', cls: 'atl',  img:'hand.png', text: 'Page', csvColumnTitle: 'Ahrefs Total Links'},
        {type: 'ahrefs', key: 'aRefDomainGs', cls: 'ard', img:'hand.png',text: 'Domain', csvColumnTitle: 'Ahrefs Root Domains'},
        {type: 'ahrefs', key: 'aUrlRatingGs', cls: 'aur', img:'hand.png', text: 'UR', csvColumnTitle: 'Ahrefs URL Rating'},
        {type: 'social', key: 'facebookGs', cls: 'fb', img:'chat.png', text: 'Likes', csvColumnTitle: 'Facebook'},
        // {type: 'social', key: 'twitterGs', cls: 'tw',  img:'chat.png',text: 'Tweets', csvColumnTitle: 'Twitter'},
        {type: 'social', key: 'pinterestGs', cls: 'pin',  img:'chat.png', text: 'Pins', csvColumnTitle: 'Pinterest'},
        {type: 'social', key: 'googlePlusGs', cls: 'gp',  img:'chat.png',text: "+1's", csvColumnTitle: 'Google Plus'}
    ]
    //,
    //upOptions: {
    //    http: [
    //        {type: 'http', key: 'inOutLinks', cls: 'in', text: 'IN'},
    //        {type: 'http', key: 'inOutLinks', cls: 'in', text: 'IN'}
    //    ],
    //    social: [
    //        {type: 'social', key: 'facebookGs', cls: 'fb', text: 'FB'},
    //        {type: 'social', key: 'twitterGs', cls: 'tw', text: 'TW'},
    //        {type: 'social', key: 'pinterestGs', cls: 'pin', text: 'PI'},
    //        {type: 'social', key: 'googlePlusGs', cls: 'gp', text: 'GP'}
    //    ],
    //    ahrefs:[
    //        {type: 'ahrefs', key: 'aBacklinkGs', cls: 'atl', text: 'ATL'},
    //        {type: 'ahrefs', key: 'aRefDomainGs', cls: 'ard', text: 'ARD'},
    //        {type: 'ahrefs', key: 'aUrlRatingGs', cls: 'aur', text: 'AUR'}
    //    ],
    //    majestic:[
    //        {type: 'majestic', key: 'mBacklinkGs', cls: 'mtl', text: 'MTL'},
    //        {type: 'majestic', key: 'mRefDomainGs', cls: 'mrd', text: 'MRD'},
    //        {type: 'majestic', key: 'mTrustflowGs', cls: 'mtf', text: 'MTF'},
    //        {type: 'majestic', key: 'mCitationflowGs', cls: 'mcf', text: 'MCF'}
    //    ]
    //}
}

