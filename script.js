function createMyElement(tag, text="", attr="", attr_val="") {
  var element = document.createElement(tag);
  if(text!==""){
    element.innerText = text;
  }
  if(attr!==""){
    element.setAttribute(attr, attr_val);
  }
  return element;
}

var container = createMyElement('div', '', 'class', 'container');
document.body.append(container);
theaders = ['ID', 'Name', 'Email'];
var currPage = 1;
var data;
var numOfRows = 10;

function createTable() {
  var table = createMyElement('table', '', 'class', 'table table-striped');
  var thead = createMyElement('thead');
  var tr = createMyElement('tr');
  for(var i=0; i<theaders.length; i++) {
    var th = createMyElement('th', theaders[i]);
    tr.append(th);
  }
  thead.append(tr);

  table.append(thead);
  container.append(table);
}

function createButtons(count) {
  var div = createMyElement('div');
  for(var i=0; i<count; i++) {
    var button = createMyElement('button', i+1, 'class', 'btn btn-outline-primary');
    div.append(button);
  }
  var firstButton = createMyElement('button', 'First', 'class', 'btn btn-outline-primary');
  var lastButton = createMyElement('button', 'Last', 'class', 'btn btn-outline-primary');
  var prevButton = createMyElement('button', 'Previous', 'class', 'btn btn-outline-primary');
  var nextButton = createMyElement('button', 'Next', 'class', 'btn btn-outline-primary');
  div.append(firstButton, lastButton, prevButton, nextButton);
  container.append(div);
}

function createTableBody(page, data) {
  var tbody = createMyElement('tbody');
  for(var i=0; i<numOfRows; i++) {
    var index = (page-1)*numOfRows+i;
    var value = data[index];
    if(value!==null && value!==undefined){
      var tr = createMyElement('tr');
      for(var j=0; j<theaders.length; j++) {
        var td = createMyElement('td', value[theaders[j].toLowerCase()]);
        tr.append(td);
      }
      tbody.append(tr);
    }
  }
  var table = document.querySelector('table');
  var oldtbody = document.querySelector('tbody');
  if(oldtbody!==null && oldtbody!==undefined){
    table.removeChild(oldtbody);
  }
  table.append(tbody);
}

function isNumber(val){
  return Number(val) == val;
}

function buttonClick(e) {
  var value = e.target.innerText;
  var first = 1;
  var last = data.length/numOfRows;
  console.log("last"+last);
  if(isNumber(value)){
    currPage = parseInt(value);
  }
  if(value.toLowerCase()==='first'){
    currPage = first;
  }
  if(value.toLowerCase()==='last') {
    currPage = last;
  }
  if(value.toLowerCase()==='previous') {
    if(currPage>first) 
      currPage--;
  }
  if(value.toLowerCase()==='next') {
    if(currPage<last) 
      currPage++;
  }
  console.log(currPage);
  createTableBody(currPage, data);
}

var xhr = new XMLHttpRequest();
var url = "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json";
xhr.open("GET", url, true);
xhr.send();

xhr.onload = function() {
  data = JSON.parse(this.response);
  // console.log(data);
  if(data.length>0) { 
    createTable();
    createTableBody(currPage, data);
    createButtons(data.length/numOfRows);
    var buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.addEventListener('click', (e) => { buttonClick(e) });
    })
  }
}





