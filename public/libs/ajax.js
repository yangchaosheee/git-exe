function formate(data) {
    var str = '';
    for (var key in data) {
      str += key + '=' + data[key] + '&'
    };
    return str.replace(/&$/, '');
  }

  function ajax(opt) {
    var defaults = {
      method: 'get',
      url: '',
      data: {},
      async: true
    }
    var opts = Object.assign({}, defaults, opt);
    var xml = new XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
    return new Promise(function (resolve, reject) {
      xml.onreadystatechange = function () {
        if (xml.readyState === 4) {
          if (xml.status === 200) {
            resolve(xml.response);
          } else {
            reject(xml.status);
          }
        }
      };
      if (opts.method === "get") {
        xml.open("get", opts.url + "?" + formate(opts.data), opts.async);
        xml.send(null);
      } else if (opts.method === "post") {
        xml.open("post", opts.url, opts.async);
        xml.responseType = "json";
        xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xml.send(formate(opts.data));
      }
    });
  };