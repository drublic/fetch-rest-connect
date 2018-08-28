'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('whatwg-fetch');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fetcher = function () {
  _createClass(Fetcher, null, [{
    key: 'getMethod',
    value: function getMethod() {
      var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'GET';
      var data = arguments[1];
      var id = arguments[2];

      if (data) {
        if (id) {
          return 'PUT';
        }

        return 'POST';
      }

      return method;
    }
  }, {
    key: 'throwError',
    value: function throwError(error) {
      var responseError = void 0;
      try {
        responseError = JSON.parse(error);
      } catch (e) {
        responseError = error;
      }

      return {
        error: true,
        message: responseError
      };
    }
  }, {
    key: 'request',
    value: function request(url, options) {
      return fetch(url, options);
    }
  }]);

  function Fetcher(config) {
    _classCallCheck(this, Fetcher);

    this.apiUrl = config.apiUrl;

    var endpoints = Object.keys(config.endpoints).map(function (key) {
      return [key, config.endpoints[key]];
    });

    this.endpoints = new Map(endpoints);
  }

  _createClass(Fetcher, [{
    key: 'getUrl',
    value: function getUrl(action, id, addinitinalParameters) {
      var url = this.apiUrl;

      if (this.endpoints.has(action)) {
        url += this.endpoints.get(action) + '/';
      } else {
        throw new Error('Action "' + action + '" not defined');
      }

      if (id) {
        url += id + '/';
      }

      if ((typeof addinitinalParameters === 'undefined' ? 'undefined' : _typeof(addinitinalParameters)) === 'object') {
        var params = Object.keys(addinitinalParameters).map(function (param) {
          return param + '=' + addinitinalParameters[param];
        });

        url += '?' + params.join('&');
      }

      return url;
    }

    /* public */
  }, {
    key: 'fetch',
    value: function fetch(action, id, addinitinalParameters, data, method, headers) {
      var url = this.getUrl(action, id, addinitinalParameters);

      var headerConfig = Object.assign({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }, headers);

      var options = {
        headers: new Headers(headerConfig),
        method: method || Fetcher.getMethod(method, data, id)
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      return Fetcher.request(url, options).then(function (response) {
        if (!response.ok) {
          return Fetcher.throwError(response.statusText);
        }

        return response.json();
      }).catch(Fetcher.throwError);
    }

    /**
     * Aliases
     */
    /* public */
  }, {
    key: 'getAll',
    value: function getAll(endpoint) {
      var addinitinalParameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.fetch(endpoint, undefined, addinitinalParameters, undefined, 'GET');
    }

    /* public */
  }, {
    key: 'get',
    value: function get(endpoint, id) {
      var addinitinalParameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.fetch(endpoint, id, addinitinalParameters, undefined, 'GET');
    }

    /* public */
  }, {
    key: 'create',
    value: function create(endpoint, data) {
      var addinitinalParameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.fetch(endpoint, undefined, addinitinalParameters, data, 'PUT');
    }

    /* public */
  }, {
    key: 'update',
    value: function update(endpoint, id, data) {
      var addinitinalParameters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      return this.fetch(endpoint, id, addinitinalParameters, data, 'POST');
    }

    /* public */
  }, {
    key: 'upsert',
    value: function upsert(endpoint, id, data) {
      var addinitinalParameters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      return this.fetch(endpoint, id, addinitinalParameters, data, id ? 'POST' : 'PUT');
    }

    /* public */
  }, {
    key: 'delete',
    value: function _delete(endpoint, id) {
      var addinitinalParameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.fetch(endpoint, id, addinitinalParameters, undefined, 'DELETE');
    }
  }]);

  return Fetcher;
}();

exports.default = Fetcher;