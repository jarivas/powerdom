window.config = {
    website: 'Manual',
    apiUrl: 'http://api.url',
    mainElementSelector: '.page-content',
    pages: [
        {
            title: 'Home',
            className: 'Home',
            navigation: true,
            default: true
        },
        {
            title: 'Getting started',
            className: 'Basic',
            navigation: true,
            responsive: '(max-width: 839px)|BasicResponsive'
        },
        {
            title: 'Static Components',
            className: 'Static',
            navigation: true,
            responsive: '(max-width: 839px)|StaticResponsive'
        },
        {
            title: 'Pages',
            className: 'Pages',
            navigation: true
        },
        {
            title: 'Partials',
            className: 'Partials',
            navigation: true
        },
        {
            title: 'Templated Components',
            className: 'TemplatedComponents',
            navigation: true
        }
    ]
};