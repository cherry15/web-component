var xmlhttp = new XMLHttpRequest(),
  url = "data/tutorials.json";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
        myFunction(myArr);
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
    var items = buildItems(arr);
    document.querySelectorAll(".stuff")[0].innerHTML = items;
}

function buildItems(items) {
    var i = 0,
      str = '';
    for(var i = 0; i < items.length; i++) {
        str += '<div class="fp">';
        str += '<img src="' + items[i].imageUrl + '" alt="' + items[i].title + '" class="fp-' + i + '">';
        str += '<div class="info">';
        str += '<h2>' + items[i].title + '</h2>';
        str += '<hr>';
        str += '<p>' + items[i].description + '</p>';
        str += '<a href="/tutorials/' + items[i].id + '" title="' + items[i].title + '"></a>';
        str += '</div>';
        str += '</div>';
    }
    return(str);
}


