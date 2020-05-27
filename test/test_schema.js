const assert = require('chai').assert;
const snakecase = require('snakecase-keys');

const schema = require('../src/index');
const Form = schema.Form;
const FormItem = schema.FormItem;
const Response = schema.Response;

const parser = require('../src/parser');
const config = require('../src/config');

describe('Test schema', function () {
    before(function () {
        config.setStaticDir('test/statics');
    });

    describe('Menu', function () {
        describe('Menu.fromTag', function () {
            it('should return a navigable Menu', function () {
                const html = '' +
                    '<section header="Some header" footer="Some footer" name="some-name" auto-select>' +
                    '   <video src="/videoPath" alt="alt video name"></video>' +
                    '   <ul>' +
                    '       <li text-search="route1 route 1">' +
                    '           <a href="/route1" method="POST">Route 1</a>' +
                    '       </li>' +
                    '       <li text-search="route2 route 2">' +
                    '           <a href="/route2">Route 2</a>' +
                    '       </li>' +
                    '       <li>Separator</li>' +
                    '       <li>' +
                    '           <a href="/form/new/">New todo' +
                    '               <img src="https://placekitten.com/600/600" alt="alt text 2" />' +
                    '           </a>' +
                    '       <li>' +
                    '           <login on-success="/successPath1" on-failure="/failurePath1" />' +
                    '       </li>' +
                    '       <li>' +
                    '           <logout on-success="/logoutSuccessPath1" on-failure="/logoutFailurePath1" />' +
                    '       </li>' +
                    '       <li text-search="route 3 route3">' +
                    '           <a href="/route3">Route 3</a>' +
                    '       </li>' +
                    '       <li>' +
                    '           <card></card>' +
                    '       </li>' +
                    '   </ul>' +
                    '   <login on-success="/successPath" on-failure="/failurePath" />' +
                    '   <logout on-success="/logoutSuccessPath2" on-failure="/logoutFailurePath2" />' +
                    '   <card/>' +
                    '</section>';
                const rootTag = parser.loadHtml(undefined, html);
                const response = Response.fromTag(rootTag);

                const expected = {
                    content_type: 'menu',
                    content: {
                        type: 'menu',
                        body: [
                            {
                                type: 'content',
                                description: null,
                                text_search: null,
                                method: null,
                                on_login_failure: null,
                                on_login_success: null,
                                on_logout_failure: null,
                                on_logout_success: null,
                                path: null,
                                src: '/videoPath',
                                alt: 'alt video name',
                                card: null
                            },
                            {
                                type: 'option',
                                description: 'Route 1',
                                text_search: 'route1 route 1',
                                method: 'POST',
                                on_login_failure: null,
                                on_login_success: null,
                                on_logout_failure: null,
                                on_logout_success: null,
                                path: '/route1',
                                src: null,
                                alt: null,
                                card: null
                            },
                            {
                                type: 'option',
                                description: 'Route 2',
                                text_search: 'route2 route 2',
                                method: 'GET',
                                on_login_failure: null,
                                on_login_success: null,
                                on_logout_failure: null,
                                on_logout_success: null,
                                path: '/route2',
                                src: null,
                                alt: null,
                                card: null
                            },
                            {
                                type: 'content',
                                description: 'Separator',
                                text_search: null,
                                method: null,
                                on_login_failure: null,
                                on_login_success: null,
                                on_logout_failure: null,
                                on_logout_success: null,
                                path: null,
                                src: null,
                                alt: null,
                                card: null
                            },
                            {
                                type: 'option',
                                description: 'New todo',
                                text_search: null,
                                method: 'GET',
                                on_login_failure: null,
                                on_login_success: null,
                                on_logout_failure: null,
                                on_logout_success: null,
                                path: '/form/new/',
                                src: 'https://placekitten.com/600/600',
                                alt: 'alt text 2',
                                card: null
                            },
                            {
                                type: 'login',
                                description: null,
                                text_search: null,
                                method: null,
                                on_login_failure: '/failurePath1',
                                on_login_success: '/successPath1',
                                on_logout_failure: null,
                                on_logout_success: null,
                                path: null,
                                src: null,
                                alt: null,
                                card: null
                            },
                            {
                                type: 'logout',
                                description: null,
                                text_search: null,
                                method: null,
                                on_login_failure: null,
                                on_login_success: null,
                                on_logout_failure: '/logoutFailurePath1',
                                on_logout_success: '/logoutSuccessPath1',
                                path: null,
                                src: null,
                                alt: null,
                                card: null
                            },
                            {
                                type: 'option',
                                description: 'Route 3',
                                text_search: 'route 3 route3',
                                method: 'GET',
                                on_login_failure: null,
                                on_login_success: null,
                                on_logout_failure: null,
                                on_logout_success: null,
                                path: '/route3',
                                src: null,
                                alt: null,
                                card: null
                            },
                            {
                                type: 'content',
                                description: null,
                                text_search: null,
                                method: null,
                                on_login_failure: null,
                                on_login_success: null,
                                on_logout_failure: null,
                                on_logout_success: null,
                                path: null,
                                src: null,
                                alt: null,
                                card: {
                                    header: null,
                                    src: null,
                                    title: null,
                                    subtitle: null,
                                    description: null,
                                    actions: null
                                }
                            },
                            {
                                type: 'login',
                                description: null,
                                text_search: null,
                                method: null,
                                on_login_failure: '/failurePath',
                                on_login_success: '/successPath',
                                on_logout_failure: null,
                                on_logout_success: null,
                                path: null,
                                src: null,
                                alt: null,
                                card: null
                            },
                            {
                                type: 'logout',
                                description: null,
                                text_search: null,
                                method: null,
                                on_login_failure: null,
                                on_login_success: null,
                                on_logout_failure: '/logoutFailurePath2',
                                on_logout_success: '/logoutSuccessPath2',
                                path: null,
                                src: null,
                                alt: null,
                                card: null
                            },
                            {
                                type: 'content',
                                description: null,
                                text_search: null,
                                method: null,
                                on_login_failure: null,
                                on_login_success: null,
                                on_logout_failure: null,
                                on_logout_success: null,
                                path: null,
                                src: null,
                                alt: null,
                                card: {
                                    header: null,
                                    src: null,
                                    title: null,
                                    subtitle: null,
                                    description: null,
                                    actions: null
                                }
                            }
                        ],
                        header: 'Some header',
                        footer: 'Some footer',
                        meta: {
                            auto_select: true
                        },
                        snackbar: null
                    }
                };
                assert.strictEqual(JSON.stringify(response), JSON.stringify(expected));
            });

            it('should recognize header/footer as attrs and as children', function () {
                let html = '' +
                    '<section header="header attr" footer="footer attr">' +
                    '   <p></p>' +
                    '</section>';
                let rootTag = parser.loadHtml(undefined, html);
                let response = Response.fromTag(rootTag);
                let expected = {
                    content_type: 'menu',
                    content: {
                        type: 'menu',
                        body: [],
                        header: 'header attr',
                        footer: 'footer attr',
                        meta: {
                            auto_select: false
                        },
                        snackbar: null
                    }
                };
                assert.strictEqual(JSON.stringify(response), JSON.stringify(expected));

                html = '' +
                    '<section>' +
                    '   <header>header child</header>' +
                    '   <footer>footer child</footer>' +
                    '</section>';
                rootTag = parser.loadHtml(undefined, html);
                response = Response.fromTag(rootTag);
                expected = {
                    content_type: 'menu',
                    content: {
                        type: 'menu',
                        body: [],
                        header: 'header child',
                        footer: 'footer child',
                        meta: {
                            auto_select: false
                        },
                        snackbar: null
                    }
                };
                assert.strictEqual(JSON.stringify(response), JSON.stringify(expected));
            });

            it('should ignore attr header/footer if they are present in children', function () {
                const html = '' +
                    '<section header="header attr" footer="footer attr">' +
                    '   <header>header child</header>' +
                    '</section>';
                const rootTag = parser.loadHtml(undefined, html);
                const response = Response.fromTag(rootTag);
                const expected = {
                    content_type: 'menu',
                    content: {
                        type: 'menu',
                        body: [],
                        header: 'header child',
                        footer: 'footer attr',
                        meta: {
                            auto_select: false
                        },
                        snackbar: null
                    }
                };
                assert.strictEqual(JSON.stringify(response), JSON.stringify(expected));
            });
        });

        describe('Menu Snackbar.fromTag', function () {
            it('should recognize a snackbar in a menu', function () {
                const html = '' +
                    '<section>' +
                    '   <Snackbar message="error message" name="action" path="/path" auto-hide-duration=1000 method="post"/>' +
                    '</section>';
                const rootTag = parser.loadHtml(undefined, html);
                const response = Response.fromTag(rootTag);
                const expected = {
                    content_type: 'menu',
                    content: {
                        type: 'menu',
                        body: [],
                        header: null,
                        footer: null,
                        meta: {
                            auto_select: false
                        },
                        snackbar: {
                            message: 'error message',
                            severity: 'info',
                            name: 'action',
                            path: '/path',
                            method: 'post',
                            meta: {
                                auto_hide_duration: 1000
                            }
                        }
                    }
                };
                assert.strictEqual(JSON.stringify(response), JSON.stringify(expected));
            });

            it('should throw error in case of subsequent snackbar tags in a menu', function () {
                const html = '' +
                    '<section>' +
                    '   <Snackbar message="error message" severity="warn" auto-hide-duration=8000/>' +
                    '   <Snackbar message="another error message" />' +
                    '</section>';
                const rootTag = parser.loadHtml(undefined, html);
                function iThrow () {
                    return Response.fromTag(rootTag);
                }
                assert.throws(iThrow, Error, 'Only one <snackbar> tag is allowed in a <menu> or <form>');
            });
        });

        describe('Card.fromTag', function () {
            it('should render a populated card as a section child in an html menu', function () {
                const html = '' +
                    '<section name="name">' +
                    '   <card action="/card/1234" method="post">' +
                    '       <cardheader title="card title" subtitle="some subtitle">' +
                    '           <cardavatar src="https://image.png" name="chris horn"/>' +
                    '       </cardheader>' +
                    '       <cardmedia src="https://some.mp4"/>' +
                    '       <cardcontent title="content title" subtitle="content subtitle" content="some content"/>' +
                    '       <cardactions>' +
                    '           <cardaction name="Read more" method="get" path="/path/read/more"/>' +
                    '           <cardaction name="Some action" method="post" path="/path/some/action"/>' +
                    '       </cardactions>' +
                    '   </card>' +
                    '</section>';
                const rootTag = parser.loadHtml(undefined, html);
                const response = Response.fromTag(rootTag);
                const expected = {
                    content_type: 'menu',
                    content: {
                        type: 'menu',
                        body: [
                            {
                                type: 'option',
                                description: null,
                                text_search: null,
                                method: 'post',
                                on_login_failure: null,
                                on_login_success: null,
                                on_logout_failure: null,
                                on_logout_success: null,
                                path: '/card/1234',
                                src: null,
                                alt: null,
                                card: {
                                    header: {
                                        title: 'card title',
                                        subtitle: 'some subtitle',
                                        avatar: {
                                            src: 'https://image.png',
                                            name: 'chris horn'
                                        }
                                    },
                                    src: 'https://some.mp4',
                                    title: 'content title',
                                    subtitle: 'content subtitle',
                                    description: 'some content',
                                    actions: [{
                                        name: 'Read more',
                                        path: '/path/read/more',
                                        method: 'get'
                                    }, {
                                        name: 'Some action',
                                        path: '/path/some/action',
                                        method: 'post'
                                    }]
                                }
                            }
                        ],
                        header: null,
                        footer: null,
                        meta: {
                            auto_select: false
                        },
                        snackbar: null
                    }
                };
                assert.strictEqual(JSON.stringify(response), JSON.stringify(expected));
            });

            it('should throw an error when cardheader has invalid children', function () {
                const html = '' +
                    '<section name="name">' +
                    '   <card action="/card/1234" method="get">' +
                    '       <cardheader title="card title" subtitle="some subtitle">' +
                    '           <p/>' +
                    '       </cardheader>' +
                    '       <cardmedia src="https://some.mp4"/>' +
                    '       <cardcontent title="content title" subtitle="content subtitle" content="some content"/>' +
                    '       <cardactions>' +
                    '           <p/>' +
                    '       </cardactions>' +
                    '   </card>' +
                    '</section>';
                const rootTag = parser.loadHtml(undefined, html);

                function iThrow () {
                    return Response.fromTag(rootTag);
                }

                assert.throws(iThrow, Error, '<cardheader> can only have one <cardavatar> child');
            });

            it('should throw an error when cardactions is empty', function () {
                const html = '' +
                    '<section name="name">' +
                    '   <card action="/card/1234" method="get">' +
                    '       <cardheader title="card title" subtitle="some subtitle">' +
                    '           <cardavatar src="https://image.png" name="chris horn"/>' +
                    '       </cardheader>' +
                    '       <cardmedia src="https://some.mp4"/>' +
                    '       <cardcontent title="content title" subtitle="content subtitle" content="some content"/>' +
                    '       <cardactions>' +
                    '           <p/>' +
                    '       </cardactions>' +
                    '   </card>' +
                    '</section>';
                const rootTag = parser.loadHtml(undefined, html);

                function iThrow () {
                    return Response.fromTag(rootTag);
                }

                assert.throws(iThrow, Error, 'Unexpected tag in <cardactions>, expecting <cardaction>');
            });
        });

        describe('Menu pug', function () {
            it('should render the correct response form pug section file', function () {
                const data = {
                    NewsInfos: {
                        preBody: 'This is prebody',
                        title: 'This is title',
                        date: 'This is the date',
                        article: 'This is the article'
                    }
                };
                const rootTag = parser.loadTemplate('section_example_2.pug', data);
                const response = Response.fromTag(rootTag);
                const expected = {
                    content_type: 'menu',
                    content: {
                        type: 'menu',
                        body: [
                            {
                                type: 'content',
                                description: 'This is prebody',
                                text_search: null,
                                method: null,
                                on_login_failure: null,
                                on_login_success: null,
                                on_logout_failure: null,
                                on_logout_success: null,
                                path: null,
                                src: null,
                                alt: null,
                                card: null
                            },
                            {
                                type: 'content',
                                description: 'Title: This is title',
                                text_search: null,
                                method: null,
                                on_login_failure: null,
                                on_login_success: null,
                                on_logout_failure: null,
                                on_logout_success: null,
                                path: null,
                                src: null,
                                alt: null,
                                card: null
                            },
                            {
                                type: 'content',
                                description: 'Date: This is the date',
                                text_search: null,
                                method: null,
                                on_login_failure: null,
                                on_login_success: null,
                                on_logout_failure: null,
                                on_logout_success: null,
                                path: null,
                                src: null,
                                alt: null,
                                card: null
                            },
                            {
                                type: 'content',
                                description: 'Article: This is the article',
                                text_search: null,
                                method: null,
                                on_login_failure: null,
                                on_login_success: null,
                                on_logout_failure: null,
                                on_logout_success: null,
                                path: null,
                                src: null,
                                alt: null,
                                card: null
                            }
                        ],
                        header: null,
                        footer: null,
                        meta: {
                            auto_select: true
                        },
                        snackbar: null
                    }
                };
                assert.strictEqual(JSON.stringify(response), JSON.stringify(expected));
            });
        });
    });

    describe('Form', function () {
        describe('Form.fromTag', function () {
            it('should return a Form() object from html form', function () {
                const html = '' +
                    '<form action="/route">' +
                    '   <section name="name">' +
                    '       <p>This is paragraph</p>' +
                    '       <p></p>' +
                    '       <input type="text"/>' +
                    '       <p></p>' +
                    '   </section>' +
                    '</form>';
                const formTag = parser.loadHtml(undefined, html);
                const form = Form.fromTag(formTag);
                assert.strictEqual(form instanceof Form, true);
            });

            it('should return expected Response from html file form', function () {
                const rootTag = parser.loadHtml('formBig.html', undefined);
                const response = Response.fromTag(rootTag);
                const expected = {
                    content_type: 'form',
                    content: {
                        type: 'form',
                        body: [
                            {
                                type: 'float',
                                name: 'step1',
                                description: 'What is your height?',
                                header: 'SETUP HEIGHT',
                                footer: 'Reply with text',
                                body: null,
                                value: null,
                                chunking_footer: null,
                                confirmation_label: null,
                                min_length: null,
                                min_length_error: null,
                                max_length: null,
                                max_length_error: null,
                                min_value: 0.5,
                                min_value_error: 'Are you a baby?',
                                max_value: 2.5,
                                max_value_error: 'Too high',
                                on_login_success: null,
                                on_login_failure: null,
                                on_logout_success: null,
                                on_logout_failure: null,
                                step: null,
                                meta: {
                                    auto_select: false,
                                    multi_select: false,
                                    numbered: false
                                },
                                method: null,
                                required: true,
                                default: null,
                                pattern: null,
                                status_exclude: false,
                                status_prepend: false,
                                url: null,
                                validate_type_error: null,
                                validate_type_error_footer: null,
                                validate_url: null
                            },
                            {
                                type: 'form-menu',
                                name: 'step2',
                                description: null,
                                header: 'SETUP CITY',
                                footer: 'Reply A-D',
                                body: [
                                    {
                                        type: 'content',
                                        description: 'Choose your city:',
                                        value: null,
                                        text_search: null
                                    },
                                    {
                                        type: 'option',
                                        description: 'UK',
                                        value: null,
                                        text_search: null
                                    },
                                    {
                                        type: 'option',
                                        description: 'London',
                                        value: 'london',
                                        text_search: null
                                    },
                                    {
                                        type: 'option',
                                        description: 'Manchester',
                                        value: 'manchester',
                                        text_search: null
                                    },
                                    {
                                        type: 'option',
                                        description: 'FR',
                                        value: null,
                                        text_search: null
                                    },
                                    {
                                        type: 'option',
                                        description: 'Paris',
                                        value: 'paris',
                                        text_search: null
                                    },
                                    {
                                        type: 'option',
                                        description: 'Nice',
                                        value: 'nice',
                                        text_search: null
                                    }
                                ],
                                value: null,
                                chunking_footer: null,
                                confirmation_label: null,
                                min_length: null,
                                min_length_error: null,
                                max_length: null,
                                max_length_error: null,
                                min_value: null,
                                min_value_error: null,
                                max_value: null,
                                max_value_error: null,
                                on_login_success: null,
                                on_login_failure: null,
                                on_logout_success: null,
                                on_logout_failure: null,
                                step: null,
                                meta: {
                                    auto_select: true,
                                    multi_select: false,
                                    numbered: true
                                },
                                method: null,
                                required: true,
                                default: null,
                                pattern: null,
                                status_exclude: false,
                                status_prepend: false,
                                url: null,
                                validate_type_error: null,
                                validate_type_error_footer: null,
                                validate_url: null
                            },
                            {
                                type: 'login',
                                name: 'login',
                                description: null,
                                header: null,
                                footer: null,
                                body: null,
                                value: null,
                                chunking_footer: null,
                                confirmation_label: null,
                                min_length: null,
                                min_length_error: null,
                                max_length: null,
                                max_length_error: null,
                                min_value: null,
                                min_value_error: null,
                                max_value: null,
                                max_value_error: null,
                                on_login_success: '/successPath',
                                on_login_failure: '/failurePath',
                                on_logout_success: null,
                                on_logout_failure: null,
                                step: null,
                                meta: {
                                    auto_select: false,
                                    multi_select: false,
                                    numbered: false
                                },
                                method: null,
                                required: false,
                                default: null,
                                pattern: null,
                                status_exclude: false,
                                status_prepend: false,
                                url: null,
                                validate_type_error: null,
                                validate_type_error_footer: null,
                                validate_url: null
                            },
                            {
                                type: 'logout',
                                name: 'logout',
                                description: null,
                                header: null,
                                footer: null,
                                body: null,
                                value: null,
                                chunking_footer: null,
                                confirmation_label: null,
                                min_length: null,
                                min_length_error: null,
                                max_length: null,
                                max_length_error: null,
                                min_value: null,
                                min_value_error: null,
                                max_value: null,
                                max_value_error: null,
                                on_login_success: null,
                                on_login_failure: null,
                                on_logout_success: '/logoutSuccessPath',
                                on_logout_failure: '/logoutFailurePath',
                                step: null,
                                meta: {
                                    auto_select: false,
                                    multi_select: false,
                                    numbered: false
                                },
                                method: null,
                                required: false,
                                default: null,
                                pattern: null,
                                status_exclude: false,
                                status_prepend: false,
                                url: null,
                                validate_type_error: null,
                                validate_type_error_footer: null,
                                validate_url: null
                            }
                        ],
                        method: 'POST',
                        path: '/route',
                        header: 'Form header',
                        footer: 'Form footer',
                        meta: {
                            completion_status_show: false,
                            completion_status_in_header: true,
                            skip_confirmation: false
                        },
                        snackbar: null
                    }
                };

                assert.strictEqual(JSON.stringify(response), JSON.stringify(expected));
            });

            it('should return expected Response from pug file form', function () {
                const rootTag = parser.loadTemplate('formBig.pug');
                const response = Response.fromTag(rootTag);
                const expected = {
                    content_type: 'form',
                    content: {
                        type: 'form',
                        body: [{
                            type: 'form-menu',
                            name: 'field5',
                            description: null,
                            header: 'Multi-select',
                            footer: null,
                            body: [{
                                type: 'content',
                                description: 'Multi-select',
                                value: null,
                                text_search: null
                            }, {
                                type: 'option',
                                description: 'Contact form',
                                value: 'contact',
                                text_search: null
                            }, { type: 'option', description: 'Frequently asked questions', value: 'faq', text_search: null }, { type: 'option', description: 'Books appointments', value: 'appointments', text_search: null }, { type: 'option', description: 'Events management', value: 'event', text_search: null }, { type: 'option', description: 'Something else', value: 'other', text_search: null }, { type: 'option', description: 'Contact form1', value: 'contact1', text_search: null }, { type: 'option', description: 'Frequently asked questions1', value: 'faq1', text_search: null }, { type: 'option', description: 'Books appointments1', value: 'appointments1', text_search: null }, { type: 'option', description: 'Events management1', value: 'event1', text_search: null }, { type: 'option', description: 'Something else1', value: 'other1', text_search: null }, { type: 'option', description: 'Contact form2', value: 'contact2', text_search: null }, { type: 'option', description: 'Frequently asked questions2', value: 'faq2', text_search: null }, { type: 'option', description: 'Books appointments2', value: 'appointments2', text_search: null }, { type: 'option', description: 'Events management2', value: 'event2', text_search: null }, { type: 'option', description: 'Something else2', value: 'other2', text_search: null }, { type: 'option', description: 'Contact form3', value: 'contact3', text_search: null }, { type: 'option', description: 'Frequently asked questions3', value: 'faq3', text_search: null }, { type: 'option', description: 'Books appointments3', value: 'appointments3', text_search: null }, { type: 'option', description: 'Events management3', value: 'event3', text_search: null }, { type: 'option', description: 'Something else3', value: 'other3', text_search: null }],
                            value: null,
                            chunking_footer: null,
                            confirmation_label: null,
                            min_length: null,
                            min_length_error: null,
                            max_length: null,
                            max_length_error: null,
                            min_value: null,
                            min_value_error: null,
                            max_value: null,
                            max_value_error: null,
                            on_login_success: null,
                            on_login_failure: null,
                            on_logout_success: null,
                            on_logout_failure: null,
                            step: null,
                            meta: {
                                auto_select: false,
                                multi_select: true,
                                numbered: false
                            },
                            method: null,
                            required: true,
                            default: 'faq',
                            pattern: null,
                            status_exclude: false,
                            status_prepend: false,
                            url: null,
                            validate_type_error: null,
                            validate_type_error_footer: null,
                            validate_url: null
                        }, {
                            type: 'string',
                            name: 'field1',
                            description: 'Provide text',
                            header: 'Text',
                            footer: 'Reply with text',
                            body: null,
                            value: null,
                            chunking_footer: null,
                            confirmation_label: null,
                            min_length: null,
                            min_length_error: null,
                            max_length: null,
                            max_length_error: null,
                            min_value: null,
                            min_value_error: null,
                            max_value: null,
                            max_value_error: null,
                            on_login_success: null,
                            on_login_failure: null,
                            on_logout_success: null,
                            on_logout_failure: null,
                            step: null,
                            meta: {
                                auto_select: false,
                                multi_select: false,
                                numbered: false
                            },
                            method: null,
                            required: true,
                            default: null,
                            pattern: null,
                            status_exclude: false,
                            status_prepend: false,
                            url: null,
                            validate_type_error: null,
                            validate_type_error_footer: null,
                            validate_url: null
                        }, {
                            type: 'textarea',
                            name: 'field2',
                            description: 'Provide textarea',
                            header: 'Text',
                            footer: 'Reply with text',
                            body: null,
                            value: null,
                            chunking_footer: null,
                            confirmation_label: null,
                            min_length: null,
                            min_length_error: null,
                            max_length: null,
                            max_length_error: null,
                            min_value: null,
                            min_value_error: null,
                            max_value: null,
                            max_value_error: null,
                            on_login_success: null,
                            on_login_failure: null,
                            on_logout_success: null,
                            on_logout_failure: null,
                            step: null,
                            meta: {
                                auto_select: false,
                                multi_select: false,
                                numbered: false
                            },
                            method: null,
                            required: true,
                            default: null,
                            pattern: null,
                            status_exclude: false,
                            status_prepend: false,
                            url: null,
                            validate_type_error: null,
                            validate_type_error_footer: null,
                            validate_url: null
                        }, {
                            type: 'range',
                            name: 'field3',
                            description: 'Provide a range',
                            header: 'Range',
                            footer: 'Reply with range',
                            body: null,
                            value: null,
                            chunking_footer: null,
                            confirmation_label: null,
                            min_length: null,
                            min_length_error: null,
                            max_length: null,
                            max_length_error: null,
                            min_value: -1000,
                            min_value_error: null,
                            max_value: 900000,
                            max_value_error: null,
                            on_login_success: null,
                            on_login_failure: null,
                            on_logout_success: null,
                            on_logout_failure: null,
                            step: 1000,
                            meta: {
                                auto_select: false,
                                multi_select: false,
                                numbered: false
                            },
                            method: null,
                            required: true,
                            default: null,
                            pattern: null,
                            status_exclude: false,
                            status_prepend: false,
                            url: null,
                            validate_type_error: null,
                            validate_type_error_footer: null,
                            validate_url: null
                        }, {
                            type: 'date',
                            name: 'field4',
                            description: 'Provide date',
                            header: 'Date',
                            footer: 'Reply with date',
                            body: null,
                            value: null,
                            chunking_footer: null,
                            confirmation_label: null,
                            min_length: null,
                            min_length_error: null,
                            max_length: null,
                            max_length_error: null,
                            min_value: null,
                            min_value_error: null,
                            max_value: null,
                            max_value_error: null,
                            on_login_success: null,
                            on_login_failure: null,
                            on_logout_success: null,
                            on_logout_failure: null,
                            step: null,
                            meta: { auto_select: false, multi_select: false, numbered: false },
                            method: null,
                            required: true,
                            default: null,
                            pattern: null,
                            status_exclude: false,
                            status_prepend: false,
                            url: null,
                            validate_type_error: null,
                            validate_type_error_footer: null,
                            validate_url: null
                        }, {
                            type: 'form-menu',
                            name: 'field6',
                            description: null,
                            header: 'Single-select',
                            footer: null,
                            body: [{ type: 'content', description: 'Single-select', value: null, text_search: null }, { type: 'option', description: 'Contact form', value: 'contact', text_search: null }, { type: 'option', description: 'Frequently asked questions', value: 'faq', text_search: null }, { type: 'option', description: 'Books appointments', value: 'appointments', text_search: null }, { type: 'option', description: 'Events management', value: 'event', text_search: null }, { type: 'option', description: 'Something else', value: 'other', text_search: null }],
                            value: null,
                            chunking_footer: null,
                            confirmation_label: null,
                            min_length: null,
                            min_length_error: null,
                            max_length: null,
                            max_length_error: null,
                            min_value: null,
                            min_value_error: null,
                            max_value: null,
                            max_value_error: null,
                            on_login_success: null,
                            on_login_failure: null,
                            on_logout_success: null,
                            on_logout_failure: null,
                            step: null,
                            meta: { auto_select: false, multi_select: false, numbered: false },
                            method: null,
                            required: true,
                            default: 'faq',
                            pattern: null,
                            status_exclude: false,
                            status_prepend: false,
                            url: null,
                            validate_type_error: null,
                            validate_type_error_footer: null,
                            validate_url: null
                        }, { type: 'phone', name: 'field7', description: 'Provide phone number', header: 'Phone', footer: null, body: null, value: null, chunking_footer: null, confirmation_label: null, min_length: null, min_length_error: null, max_length: null, max_length_error: null, min_value: null, min_value_error: null, max_value: null, max_value_error: null, on_login_success: null, on_login_failure: null, on_logout_success: null, on_logout_failure: null, step: null, meta: { auto_select: false, multi_select: false, numbered: false }, method: null, required: true, default: null, pattern: null, status_exclude: false, status_prepend: false, url: null, validate_type_error: null, validate_type_error_footer: null, validate_url: null }, { type: 'email', name: 'field8', description: 'Provide email address', header: 'Email', footer: null, body: null, value: null, chunking_footer: null, confirmation_label: null, min_length: null, min_length_error: null, max_length: null, max_length_error: null, min_value: null, min_value_error: null, max_value: null, max_value_error: null, on_login_success: null, on_login_failure: null, on_logout_success: null, on_logout_failure: null, step: null, meta: { auto_select: false, multi_select: false, numbered: false }, method: null, required: true, default: null, pattern: null, status_exclude: false, status_prepend: false, url: null, validate_type_error: null, validate_type_error_footer: null, validate_url: null }, { type: 'url', name: 'field9', description: 'Provide web site', header: 'Url', footer: null, body: null, value: null, chunking_footer: null, confirmation_label: null, min_length: null, min_length_error: null, max_length: null, max_length_error: null, min_value: null, min_value_error: null, max_value: null, max_value_error: null, on_login_success: null, on_login_failure: null, on_logout_success: null, on_logout_failure: null, step: null, meta: { auto_select: false, multi_select: false, numbered: false }, method: null, required: true, default: null, pattern: null, status_exclude: false, status_prepend: false, url: null, validate_type_error: null, validate_type_error_footer: null, validate_url: null }],
                        method: 'post',
                        path: '/todoAdd',
                        header: null,
                        footer: null,
                        meta: {
                            completion_status_show: false,
                            completion_status_in_header: false,
                            skip_confirmation: false
                        },
                        snackbar: {
                            message: 'error',
                            severity: 'info',
                            name: 'ok',
                            path: '/',
                            method: 'GET',
                            meta: { auto_hide_duration: 7000 }
                        }
                    }
                };

                assert.strictEqual(JSON.stringify(response), JSON.stringify(expected));
            });

            it('should recognize a snackbar in a form section', function () {
                const html = '' +
                    '<form action="/route">' +
                    '   <Snackbar message="error message" />' +
                    '   <section name="step1">' +
                    '       <input type="text"/>' +
                    '   </section>' +
                    '</form>';
                const formTag = parser.loadHtml(undefined, html);
                const formItem = Form.fromTag(formTag);
                const expected = {
                    type: 'form',
                    body: [
                        {
                            type: 'string',
                            name: 'step1',
                            description: null,
                            header: null,
                            footer: null,
                            body: null,
                            value: null,
                            chunking_footer: null,
                            confirmation_label: null,
                            min_length: null,
                            min_length_error: null,
                            max_length: null,
                            max_length_error: null,
                            min_value: null,
                            min_value_error: null,
                            max_value: null,
                            max_value_error: null,
                            on_login_success: null,
                            on_login_failure: null,
                            on_logout_success: null,
                            on_logout_failure: null,
                            step: null,
                            meta: {
                                auto_select: false,
                                multi_select: false,
                                numbered: false
                            },
                            method: null,
                            required: false,
                            default: null,
                            pattern: null,
                            status_exclude: false,
                            status_prepend: false,
                            url: null,
                            validate_type_error: null,
                            validate_type_error_footer: null,
                            validate_url: null
                        }
                    ],
                    method: 'POST',
                    path: '/route',
                    header: null,
                    footer: null,
                    meta: {
                        completion_status_show: false,
                        completion_status_in_header: false,
                        skip_confirmation: false
                    },
                    snackbar: {
                        message: 'error message',
                        severity: 'info',
                        name: null,
                        path: null,
                        method: null,
                        meta: {
                            auto_hide_duration: null
                        }
                    }
                };
                assert.equal(JSON.stringify(snakecase(formItem)), JSON.stringify(expected));
            });

            it('should throw error in case of subsequent snackbar tags in a form', function () {
                const html = '' +
                    '<form action="/route">' +
                    '   <Snackbar message="error message" severity="warn" auto-hide-duration=8000/>' +
                    '   <Snackbar message="another error message" />' +
                    '   <section name="step1">' +
                    '       <input type="text"/>' +
                    '   </section>' +
                    '</form>';
                const formTag = parser.loadHtml(undefined, html);
                function iThrow () {
                    return Form.fromTag(formTag);
                }
                assert.throws(iThrow, Error, 'Only one <snackbar> tag is allowed in a <menu> or <form>');
            });
        });
    });

    describe('FormItem', function () {
        describe('FormItem.fromTag', function () {
            it('should raise error for invalid type in fromTag()', function () {
                const html = '' +
                    '<section name="name">' +
                    '   <input type="blabla"/>' +
                    '</section>';
                const sectionTag = parser.loadHtml(undefined, html);

                function iThrow () {
                    return FormItem.fromTag(sectionTag);
                }

                assert.throws(iThrow, Error, '<input/> type "blabla" is not supported');
            });

            it('should be type string if the input has no type', function () {
                const html = '' +
                    '<section name="name">' +
                    '   <input />' +
                    '</section>';
                const sectionTag = parser.loadHtml(undefined, html);
                const formItem = FormItem.fromTag(sectionTag);
                const expected = {
                    type: 'string',
                    name: 'name',
                    description: null,
                    header: null,
                    footer: null,
                    body: null,
                    value: null,
                    chunking_footer: null,
                    confirmation_label: null,
                    min_length: null,
                    min_length_error: null,
                    max_length: null,
                    max_length_error: null,
                    min_value: null,
                    min_value_error: null,
                    max_value: null,
                    max_value_error: null,
                    on_login_success: null,
                    on_login_failure: null,
                    on_logout_success: null,
                    on_logout_failure: null,
                    step: null,
                    meta: {
                        auto_select: false,
                        multi_select: false,
                        numbered: false
                    },
                    method: null,
                    required: false,
                    default: null,
                    pattern: null,
                    status_exclude: false,
                    status_prepend: false,
                    url: null,
                    validate_type_error: null,
                    validate_type_error_footer: null,
                    validate_url: null
                };
                assert.equal(JSON.stringify(snakecase(formItem)), JSON.stringify(expected));
            });

            it('should correctly parse int and float from number', function () {
                let html = '' +
                    '<section name="something">' +
                    '   <input type="number" step="1"/>' +
                    '</section>';
                let sectionTag = parser.loadHtml(undefined, html);
                let formItem = FormItem.fromTag(sectionTag);

                assert.equal(formItem.type, 'int');

                html = '' +
                    '<section name="something">' +
                    '   <input type="number"/>' +
                    '</section>';
                sectionTag = parser.loadHtml(undefined, html);
                formItem = FormItem.fromTag(sectionTag);

                assert.equal(formItem.type, 'float');
            });

            it('should handle null and zero values for numeric fields', function () {
                const html = '' +
                    '<section name="step1" required>' +
                    '    <input type="number" name="test" min="0" value="0" step=0 minlength=0 max=null/>' +
                    '</section>';
                const sectionTag = parser.loadHtml(undefined, html);

                const response = FormItem.fromTag(sectionTag);
                const expected = {
                    type: 'float',
                    name: 'step1',
                    description: null,
                    header: null,
                    footer: null,
                    body: null,
                    value: '0',
                    chunkingFooter: null,
                    confirmationLabel: null,
                    minLength: 0,
                    minLengthError: null,
                    maxLength: null,
                    maxLengthError: null,
                    minValue: 0,
                    minValueError: null,
                    maxValue: null,
                    maxValueError: null,
                    onLoginSuccess: null,
                    onLoginFailure: null,
                    onLogoutSuccess: null,
                    onLogoutFailure: null,
                    step: 0,
                    meta: {
                        autoSelect: false,
                        multiSelect: false,
                        numbered: false
                    },
                    method: null,
                    required: true,
                    default: null,
                    pattern: null,
                    statusExclude: false,
                    statusPrepend: false,
                    url: null,
                    validateTypeError: null,
                    validateTypeErrorFooter: null,
                    validateUrl: null
                };

                assert.strictEqual(JSON.stringify(response), JSON.stringify(expected));
            });

            it('should throw error for type="hidden" and no value', function () {
                const html = '' +
                    '<section name="name">' +
                    '   <input type="hidden"/>' +
                    '</section>';
                const sectionTag = parser.loadHtml(undefined, html);

                function iThrow () {
                    return FormItem.fromTag(sectionTag);
                }

                assert.throws(iThrow, Error, 'value attribute is required for input type="hidden"');
            });

            it('should correctly parse complex section tag', function () {
                const html = '' +
                    '<section name="first-step"' +
                    '         header="The header"' +
                    '         footer="The footer"' +
                    '         chunking-footer="Chunking footer"' +
                    '         confirmation-label="Conf label"' +
                    '         method="PATCH"' +
                    '         status-exclude' +
                    '         url="https://url.url"' +
                    '         validate-type-error="The validate type err"' +
                    '         validate-type-error-footer="The val type err footer"' +
                    '         validate-url="The val url"' +
                    '         auto-select' +
                    '         numbered' +
                    '         required ' +
                    '         default="useless-default-because-it-is-required">' +
                    '   <input type="email"' +
                    '          pattern="somepattern"' +
                    '          minlength="3"' +
                    '          minlength-error="The minlen error"' +
                    '          maxlength="100"' +
                    '          maxlength-error="The maxlen error" />' +
                    '</section>';
                const sectionTag = parser.loadHtml(undefined, html);
                const formItem = FormItem.fromTag(sectionTag);
                const expected = {
                    type: 'regex',
                    name: 'first-step',
                    description: null,
                    header: 'The header',
                    footer: 'The footer',
                    body: null,
                    value: null,
                    chunking_footer: 'Chunking footer',
                    confirmation_label: 'Conf label',
                    min_length: 3,
                    min_length_error: 'The minlen error',
                    max_length: 100,
                    max_length_error: 'The maxlen error',
                    min_value: null,
                    min_value_error: null,
                    max_value: null,
                    max_value_error: null,
                    on_login_success: null,
                    on_login_failure: null,
                    on_logout_success: null,
                    on_logout_failure: null,
                    step: null,
                    meta: {
                        auto_select: true,
                        multi_select: false,
                        numbered: true
                    },
                    method: 'PATCH',
                    required: true,
                    default: 'useless-default-because-it-is-required',
                    pattern: 'somepattern',
                    status_exclude: true,
                    status_prepend: false,
                    url: 'https://url.url',
                    validate_type_error: 'The validate type err',
                    validate_type_error_footer: 'The val type err footer',
                    validate_url: 'The val url'
                };

                assert.equal(JSON.stringify(snakecase(formItem)), JSON.stringify(expected));
            });
        });

        describe('FormItem.constructor', function () {
            it('should raise error for invalid type in constructor', function () {
                function iThrow () {
                    return new FormItem({ type: 'blabla' });
                }

                assert.throws(iThrow, Error, 'FormItem type="blabla" is not supported. Supported types: date,datetime,email,form-menu,float,hidden,int,location,login,logout,range,regex,string,tel,phone,url,textarea');
            });
        });
    });

    describe('Response', function () {
        it('should return the correct Response object', function () {
            const html = '<form header="Form header" skip-confirmation method="PATCH" action="/route">' +
                '<section name="step1" numbered required auto-select>' +
                '   <p></p>' +
                '   <ul>' +
                '       <li value="first" text-search="Context for first item">First item</li>' +
                '       <li value="second">Second item</li>' +
                '   </ul>' +
                '   <p></p>' +
                '</section>' +
                '<section name="step2" method="POST" confirmation-label="confirmation label" default="22">' +
                '   <label>A question</label>' +
                '   <p></p>' +
                '   <input type="number" step="0.1" />' +
                '   <p></p>' +
                '   <input type="location" />' +
                '</section>' +
                '</form>';

            const formTag = parser.loadHtml(undefined, html);
            const response = Response.fromTag(formTag);
            const expected = {
                content_type: 'form',
                content: {
                    type: 'form',
                    body: [
                        {
                            type: 'form-menu',
                            name: 'step1',
                            description: null,
                            header: null,
                            footer: null,
                            body: [
                                {
                                    type: 'option',
                                    description: 'First item',
                                    value: 'first',
                                    text_search: 'Context for first item'
                                },
                                {
                                    type: 'option',
                                    description: 'Second item',
                                    value: 'second',
                                    text_search: null
                                }
                            ],
                            value: null,
                            chunking_footer: null,
                            confirmation_label: null,
                            min_length: null,
                            min_length_error: null,
                            max_length: null,
                            max_length_error: null,
                            min_value: null,
                            min_value_error: null,
                            max_value: null,
                            max_value_error: null,
                            on_login_success: null,
                            on_login_failure: null,
                            on_logout_success: null,
                            on_logout_failure: null,
                            step: null,
                            meta: {
                                auto_select: true,
                                multi_select: false,
                                numbered: true
                            },
                            method: null,
                            required: true,
                            default: null,
                            pattern: null,
                            status_exclude: false,
                            status_prepend: false,
                            url: null,
                            validate_type_error: null,
                            validate_type_error_footer: null,
                            validate_url: null
                        },
                        {
                            type: 'int',
                            name: 'step2',
                            description: 'A question',
                            header: null,
                            footer: null,
                            body: null,
                            value: null,
                            chunking_footer: null,
                            confirmation_label: 'confirmation label',
                            min_length: null,
                            min_length_error: null,
                            max_length: null,
                            max_length_error: null,
                            min_value: null,
                            min_value_error: null,
                            max_value: null,
                            max_value_error: null,
                            on_login_success: null,
                            on_login_failure: null,
                            on_logout_success: null,
                            on_logout_failure: null,
                            step: 0.1,
                            meta: {
                                auto_select: false,
                                multi_select: false,
                                numbered: false
                            },
                            method: 'POST',
                            required: false,
                            default: '22',
                            pattern: null,
                            status_exclude: false,
                            status_prepend: false,
                            url: null,
                            validate_type_error: null,
                            validate_type_error_footer: null,
                            validate_url: null
                        }
                    ],
                    method: 'PATCH',
                    path: '/route',
                    header: 'Form header',
                    footer: null,
                    meta: {
                        completion_status_show: false,
                        completion_status_in_header: false,
                        skip_confirmation: true
                    },
                    snackbar: null
                }
            };
            assert.strictEqual(response instanceof Response, true);
            assert.strictEqual(JSON.stringify(response), JSON.stringify(snakecase(expected)));
        });
    });
});
