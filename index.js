var fs = require('fs');   
var options = process.argv.slice(2); 
var command = options[0]; 
switch (command) {
  case 'help':     
  default:
    showHelp();
    break;
  case 'list':    
    listTodos();
    break;
  case 'add':
    addNew() ;   
    break;
  case 'remove':
    remove(options[1]);   
    break;
  case 'reset':
    reset();   
    break;
}

function splitStringByNewline(string) {
  return string.split('\n').filter(function(element) {
    element = element.trim();
    return element.length > 0;
  });
}
function showHelp(){
    fs.readFile('help.txt', function (err, data) { 
  if (err) throw err;
   console.log(data.toString());
});}

function addNew(){
    fs.appendFile('todo.txt', '\n'+options.slice(1).join(' ') , function (err) {
  if (err) throw err;
  console.log('Adding new task has been successful!');
});
}


function remove(index){  
   index = parseInt(index)-1;
    if(index+1 < 1){
      console.log('there is no index'+(index+1));
    }else{
      
    fs.readFile('todo.txt', function (err, data) { 
  if (err) throw err;
    var mydata=data.toString().split('\n'); 
    var newData=[];
    var i=1;
    for(i in mydata){
      if(index == i){
        continue;
      }
      newData.push(mydata[i]+'\n');
    }
    fs.writeFile('todo.txt', newData.toString().replace(/[, ]+/g, "").trim() , function (err) {
  if (err) throw err;
  console.log('the task has been deleted!');
  
});
}); }
  
}

function reset(){
    fs.writeFile('todo.txt', '' , function (err) {
  if (err) throw err;
  console.log('the list has been delete it!');
});
}


function listTodos() {
  openFile('todo.txt', function(error, data) {
    if (error) {
      if (error.code === 'ENOENT') {
        return console.log('Nothing to do! (or your dog ate your todo list)');
      } else {
        return console.log('Error: Something went wrong', error);
      }
    }

    var todos = splitStringByNewline(data);

    if (todos.length === 0) {
      return console.log('Nothing to do!')
    }

    console.log('Your todo list:');
    todos.forEach(function(element, index) {
      index = (index + 1).toString();
      console.log(index, element);
    });

    if (todos.length > 5) {
      console.log('You have too much to do!');
    }
  });


function openFile(fileName, callback) {
  fs.readFile(__dirname + '/' + fileName, 'utf8', function(error, data) {
    callback(error, data)
  });
}
}
