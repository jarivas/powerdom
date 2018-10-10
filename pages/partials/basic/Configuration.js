class Configuration extends PartialTemplate {

    setUp() {
        const data = {
            website: 'First title of the site',
            apiUrl: 'The url',
            mainElementSelector: 'main',
            pages: [
                {
                    title: 'The title tag will be changed to this',
                    className: 'class name and name of the files .js and .html',
                    navigation: 'true to be displayed on navigation and footer',
                    default: 'true if is the first page'
                }
            ]
        };

        const content = `<pre><code>${JSON.stringify(data, null, 4)}<code><pre>`;

        Configuration.prototype.example.setContent(content);
    }

}