var links = [
    {
        index: 1,
        label: 'レンタルサーバ',
        image: './assets/rental_server.svg',
        href : 'https://secure.sakura.ad.jp/rs/cp/'
    },
    {
        index: 2,
        label: 'VPS',
        image: './assets/vps.svg',
        href : 'https://secure.sakura.ad.jp/vps/'
    },
    {
        index: 3,
        label: 'クラウド',
        image: './assets/cloud.svg',
        href : 'https://secure.sakura.ad.jp/cloud/iaas/'
    },
    {
        index: 4,
        label: '専用サーバ/高火力',
        image: './assets/sensaba_koukaryoku.svg',
        href : 'https://secure.sakura.ad.jp/dedicated/'
    },
    {
        index: 5,
        label: '専用サーバPHY',
        image: './assets/dedicated_server_phy.svg',
        href : 'https://secure.sakura.ad.jp/dedicated/phy/cpanel/servers'
    },
    {
        index: 6,
        label: '高火力 DOK',
        image: './assets/koukaryoku-dok.svg',
        href : 'https://secure.sakura.ad.jp/koukaryoku-container/'
    },
    {
        index: 7,
        label: 'sakura.io',
        image: './assets/sakuraio.svg',
        href : 'https://secure.sakura.ad.jp/iot/console/#/'
    },
    {
        index: 8,
        label: 'ウェブアクセラレータ',
        image: './assets/wa.svg',
        href : 'https://secure.sakura.ad.jp/webaccel/'
    },
    {
        index: 9,
        label: 'オブジェクトストレージ',
        image: './assets/objectstorage.svg',
        href : 'https://secure.sakura.ad.jp/objectstorage/'
    },
    {
        index: 10,
        label: '会員メニュー',
        image: './assets/kaiin.svg',
        href : 'https://secure.sakura.ad.jp/menu/top/'
    },
    {
        index: 11,
        label: 'さくらのドメイン',
        image: './assets/kaiin.svg',
        href : 'https://secure.sakura.ad.jp/domain/'
    },
    {
        index: 12,
        label: 'サポート',
        image: './assets/support.svg',
        href : 'https://help.sakura.ad.jp/'
    }
];

function getTextWidth(text) {
    var span = document.createElement('span');
    span.innerHTML = text;
    document.body.appendChild(span);

    setTimeout(() => {
        document.body.removeChild(span);
    }, 0);

    return span.offsetWidth || 0;
}

function main() {
    var sakuraLinks = document.getElementsByClassName('sakura-links')[0];
    Sortable.create(sakuraLinks, {
        animation: 100,
        onEnd: function (event) {
            var list = [];
            Array.from(sakuraLinks.children).forEach(function (child) {
                if (child.dataset.index) {
                    list.push(child.dataset.index);
                }
            });

            window.localStorage.setItem('userlist', list);
        }
    });

    var userList = window.localStorage.getItem('userlist');
    if (userList) {
        var l = userList.split(',').map(function (a) {
            return parseInt(a, 10);
        });
        links.sort(function (a, b) {
            return l.indexOf(a.index) > l.indexOf(b.index);
        });
    }

    // <li class="item" data-index={{link.index}}>
    //   <a class="item__link" href={{link.href}} target="_blank">
    //     <img class="link__image" src={{link.image}}>
    //     <span class="link__title">{{linklabel}}</span>
    //   </a>
    // </li>
    links.forEach(function (link) {
        var li = document.createElement('li');
        li.classList.add('item');
        li.dataset.index = link.index;

        var needsCompress = getTextWidth(link.label) > 96;

        li.addEventListener('mouseenter', function (event) {
            event.target.classList.add('item--hover');
        });
        li.addEventListener('mouseleave', function (event) {
            event.target.classList.remove('item--hover');
        });
        li.addEventListener('click', function (event) {
            event.preventDefault();
            chrome.tabs.create({active: true, url: link.href});
        })

        li.innerHTML = [
            '<a class="item__link" href="' + link.href + '">',
            '<img class="link__image" src="' + link.image + '">',
            '<span class="link__title' + (needsCompress ? ' link__title--compress' : '') + '">' + link.label + '</span>',
            '</a>'
        ].join('');

        sakuraLinks.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    main();
});
