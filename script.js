
// function run(){
//     let htmlCode = document.getElementById("html-code");
//     let cssCode = document.getElementById("css-code");
//     let jsCode = document.getElementById("js-code");
//     let output = document.getElementById("output");


//     output.contentDocument.body.innerHTML = htmlCode.value +"<style>"+ cssCode.value +"</style>";
//     output.contentWindow.eval(jsCode.value);
//     // output.contentDocument.body.innerHTML = jsCode.value;
//    console.log(output);
   
// }

var html = document.getElementById('html-code');
var css = document.getElementById('css-code');
var js = document.getElementById('js-code');
var code = document.getElementById('output').contentWindow.document;
function compile() {
  const PREFIX = 'livecode-';
  const data = ['html', 'css', 'js'].map((key) => {
    const prefixedKey = PREFIX + key;
    const jsonValue = localStorage.getItem(prefixedKey);

    if (jsonValue != null) return JSON.parse(jsonValue);
  });
  setInitial(data);
  document.body.onkeyup = function () {
    localStorage.setItem('livecode-html', JSON.stringify(html.value));
    localStorage.setItem('livecode-css', JSON.stringify(css.value));
    localStorage.setItem('livecode-js', JSON.stringify(js.value));
    code.open();
    code.writeln(
      html.value +
        '<style>' +
        css.value +
        '</style>' +
        '<script>' +
        js.value +
        '</script>'
    );
    code.close();
  };
}

function setInitial(data) {
  let htmlContent = data[0] || '<h1>Welcome to the Live Code Editor!</h1>';
  let cssContent =
    data[1] ||
    `body {
    background-color: #222;
    }
    h1 {
      color: #fff;
      text-align: center;
      margin-top: 10%;
    }`;
  let jsContent = data[2] || '';
  css.value = cssContent;
  js.value = jsContent;
  html.value = htmlContent;
  code.open();
  code.writeln(
    htmlContent +
      '<style>' +
      cssContent +
      '</style>' +
      '<script>' +
      jsContent +
      '</script>'
  );
  code.close();
}

compile();

