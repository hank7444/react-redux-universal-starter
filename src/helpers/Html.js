import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';
const cdn = '//cdnjs.cloudflare.com/ajax/libs/';


/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    localeData: PropTypes.array.isRequired,
    localeMessages: PropTypes.object.isRequired,
    assets: PropTypes.object.isRequired,
    component: PropTypes.node.isRequired,
    store: PropTypes.object.isRequired
  }

  render() {
    const {locale, localeData, localeMessages, assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';


    const data = {
      store: store.getState(),
      locale: locale,
      localeData: localeData,
      localeMessages: localeMessages
    };

    return (
      <html lang={locale}>
        <head>
          <meta charSet="utf-8"/>
          {DocumentMeta.renderAsReact()}

          <link rel="shortcut icon" href="/favicon.ico" />
          <link href={cdn + 'twitter-bootstrap/3.3.5/css/bootstrap.css'}
                media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8"/>
          <link href={cdn + 'font-awesome/4.3.0/css/font-awesome.min.css'}
                media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8"/>

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection"
                  rel="stylesheet" type="text/css"/>
          )}
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(data)};`}} charSet="UTF-8"/>
          <script src={assets.javascript.main} charSet="UTF-8"/>
        </body>
      </html>
    );
  }
}
