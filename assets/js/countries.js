---
---
(function () {
  // Canonical country name -> ISO 3166-1 alpha-2 code lookup. Used both to
  // render a flag emoji next to each list entry and to match countries
  // against the globe's polygon data (via each polygon's ISO_A2 property).
  var COUNTRY_TO_ISO2 = {
    'afghanistan': 'AF', 'albania': 'AL', 'algeria': 'DZ', 'andorra': 'AD',
    'angola': 'AO', 'antigua and barbuda': 'AG', 'argentina': 'AR', 'armenia': 'AM',
    'australia': 'AU', 'austria': 'AT', 'azerbaijan': 'AZ', 'bahamas': 'BS',
    'bahrain': 'BH', 'bangladesh': 'BD', 'barbados': 'BB', 'belarus': 'BY',
    'belgium': 'BE', 'belize': 'BZ', 'benin': 'BJ', 'bhutan': 'BT',
    'bolivia': 'BO', 'bosnia and herzegovina': 'BA', 'botswana': 'BW', 'brazil': 'BR',
    'brunei': 'BN', 'bulgaria': 'BG', 'burkina faso': 'BF', 'burundi': 'BI',
    'cabo verde': 'CV', 'cape verde': 'CV', 'cambodia': 'KH', 'cameroon': 'CM',
    'canada': 'CA', 'central african republic': 'CF', 'chad': 'TD', 'chile': 'CL',
    'china': 'CN', 'colombia': 'CO', 'comoros': 'KM', 'republic of the congo': 'CG',
    'congo-brazzaville': 'CG', 'democratic republic of the congo': 'CD', 'drc': 'CD',
    'dr congo': 'CD', 'congo-kinshasa': 'CD', 'costa rica': 'CR', 'croatia': 'HR',
    'cuba': 'CU', 'cyprus': 'CY', 'czech republic': 'CZ', 'czechia': 'CZ',
    'denmark': 'DK', 'djibouti': 'DJ', 'dominica': 'DM', 'dominican republic': 'DO',
    'ecuador': 'EC', 'egypt': 'EG', 'el salvador': 'SV', 'equatorial guinea': 'GQ',
    'eritrea': 'ER', 'estonia': 'EE', 'eswatini': 'SZ', 'swaziland': 'SZ',
    'ethiopia': 'ET', 'fiji': 'FJ', 'finland': 'FI', 'france': 'FR',
    'gabon': 'GA', 'gambia': 'GM', 'georgia': 'GE', 'germany': 'DE',
    'ghana': 'GH', 'greece': 'GR', 'greenland': 'GL', 'grenada': 'GD',
    'guatemala': 'GT', 'guinea': 'GN', 'guinea-bissau': 'GW', 'guyana': 'GY',
    'haiti': 'HT', 'honduras': 'HN', 'hong kong': 'HK', 'hungary': 'HU',
    'iceland': 'IS', 'india': 'IN', 'indonesia': 'ID', 'iran': 'IR',
    'iraq': 'IQ', 'ireland': 'IE', 'israel': 'IL', 'italy': 'IT',
    'ivory coast': 'CI', "côte d'ivoire": 'CI', "cote d'ivoire": 'CI', 'jamaica': 'JM',
    'japan': 'JP', 'jordan': 'JO', 'kazakhstan': 'KZ', 'kenya': 'KE',
    'kiribati': 'KI', 'kosovo': 'XK', 'kuwait': 'KW', 'kyrgyzstan': 'KG',
    'laos': 'LA', 'latvia': 'LV', 'lebanon': 'LB', 'lesotho': 'LS',
    'liberia': 'LR', 'libya': 'LY', 'liechtenstein': 'LI', 'lithuania': 'LT',
    'luxembourg': 'LU', 'macau': 'MO', 'macedonia': 'MK', 'north macedonia': 'MK',
    'madagascar': 'MG', 'malawi': 'MW', 'malaysia': 'MY', 'maldives': 'MV',
    'mali': 'ML', 'malta': 'MT', 'marshall islands': 'MH', 'mauritania': 'MR',
    'mauritius': 'MU', 'mexico': 'MX', 'micronesia': 'FM', 'moldova': 'MD',
    'monaco': 'MC', 'mongolia': 'MN', 'montenegro': 'ME', 'morocco': 'MA',
    'mozambique': 'MZ', 'myanmar': 'MM', 'burma': 'MM', 'namibia': 'NA',
    'nauru': 'NR', 'nepal': 'NP', 'netherlands': 'NL', 'holland': 'NL',
    'new zealand': 'NZ', 'nicaragua': 'NI', 'niger': 'NE', 'nigeria': 'NG',
    'north korea': 'KP', 'norway': 'NO', 'oman': 'OM', 'pakistan': 'PK',
    'palau': 'PW', 'palestine': 'PS', 'panama': 'PA', 'papua new guinea': 'PG',
    'paraguay': 'PY', 'peru': 'PE', 'philippines': 'PH', 'poland': 'PL',
    'portugal': 'PT', 'puerto rico': 'PR', 'qatar': 'QA', 'romania': 'RO',
    'russia': 'RU', 'rwanda': 'RW', 'saint kitts and nevis': 'KN', 'saint lucia': 'LC',
    'saint vincent and the grenadines': 'VC', 'samoa': 'WS', 'san marino': 'SM',
    'sao tome and principe': 'ST', 'saudi arabia': 'SA', 'senegal': 'SN', 'serbia': 'RS',
    'seychelles': 'SC', 'sierra leone': 'SL', 'singapore': 'SG', 'slovakia': 'SK',
    'slovenia': 'SI', 'solomon islands': 'SB', 'somalia': 'SO', 'somaliland': 'SO',
    'south africa': 'ZA', 'south korea': 'KR', 'south sudan': 'SS', 'spain': 'ES',
    'sri lanka': 'LK', 'sudan': 'SD', 'suriname': 'SR', 'sweden': 'SE',
    'switzerland': 'CH', 'syria': 'SY', 'taiwan': 'TW', 'tajikistan': 'TJ',
    'tanzania': 'TZ', 'thailand': 'TH', 'timor-leste': 'TL', 'east timor': 'TL',
    'togo': 'TG', 'tonga': 'TO', 'trinidad and tobago': 'TT', 'tunisia': 'TN',
    'turkey': 'TR', 'turkmenistan': 'TM', 'tuvalu': 'TV', 'uganda': 'UG',
    'ukraine': 'UA', 'united arab emirates': 'AE', 'united kingdom': 'GB', 'uk': 'GB',
    'great britain': 'GB', 'england': 'GB', 'united states': 'US', 'usa': 'US',
    'us': 'US', 'uruguay': 'UY', 'uzbekistan': 'UZ', 'vanuatu': 'VU',
    'vatican city': 'VA', 'vatican': 'VA', 'venezuela': 'VE', 'vietnam': 'VN',
    'yemen': 'YE', 'zambia': 'ZM', 'zimbabwe': 'ZW',
  };

  // The geojson used below has a known bug (inherited from Natural Earth)
  // where a few countries' ISO_A2 property is "-99" instead of a real code.
  var ISO2_FIX_BY_ADMIN = { 'France': 'FR', 'Norway': 'NO', 'Somaliland': 'SO' };

  function isoFor(name) {
    return COUNTRY_TO_ISO2[name.trim().toLowerCase()] || null;
  }

  function flagEmoji(iso2) {
    if (!iso2) return '';
    return String.fromCodePoint.apply(null, iso2.split('').map(function (c) {
      return 0x1f1e6 + c.charCodeAt(0) - 65;
    }));
  }

  // Prefix each list entry with its flag emoji.
  document.querySelectorAll('.countries-column li[data-country]').forEach(function (li) {
    var flag = flagEmoji(isoFor(li.dataset.country));
    if (flag) li.textContent = flag + ' ' + li.textContent;
  });

  var visitedCodes = new Set(
    {{ site.data.countries.visited | jsonify }}.map(isoFor).filter(Boolean)
  );

  var globeEl = document.getElementById('globeViz');
  var world = Globe()(globeEl)
    .backgroundColor('rgba(0,0,0,0)')
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
    .width(globeEl.clientWidth)
    .height(globeEl.clientHeight);

  window.addEventListener('resize', function () {
    world.width(globeEl.clientWidth).height(globeEl.clientHeight);
  });

  fetch('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
    .then(function (res) { return res.json(); })
    .then(function (countries) {
      world
        .polygonsData(countries.features)
        .polygonCapColor(function (feature) {
          var code = ISO2_FIX_BY_ADMIN[feature.properties.ADMIN] || feature.properties.ISO_A2;
          return visitedCodes.has(code) ? '#2ecc71' : 'rgba(255,255,255,0.15)';
        })
        .polygonSideColor(function () { return 'rgba(46,204,113,0.15)'; })
        .polygonStrokeColor(function () { return '#111'; })
        .polygonLabel(function (feature) { return feature.properties.ADMIN; })
        .polygonAltitude(0.01);
    });
})();
