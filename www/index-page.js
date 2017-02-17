import React from 'react';
import ReactDOM from 'react-dom';
import Showroom from 'jcatalog-showroom';
import '../external_modules/jcatalog-bootstrap/dist/less/jcatalog-bootstrap-bundle.less';
import '../external_modules/jcatalog-bootstrap/dist/less/jcatalog-bootstrap-extensions-bundle.less';

let element = document.getElementById('main');
let showroom = React.createElement(Showroom, {
  loaderOptions: {
    componentsInfo: require('.jcatalog-showroom/componentsInfo'),
    packagesInfo: require('.jcatalog-showroom/packageInfo')
  }
});

ReactDOM.render(showroom, element);
