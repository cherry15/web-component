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
    var elements = buildItems(arr),
      i = 0,
      container = document.querySelectorAll(".main.content")[0];
    for(i = 0; i < elements.length; i++) {
        container.appendChild(elements[i]);
    }
}

function buildItems(items) {
    var i = 0,
      els = [];
    
    for(i = 0; i < items.length; i++) {
        var obj = document.createElement("div");
        obj.setAttribute("class", "fp");
        var img = document.createElement("img");
        img.setAttribute("src", items[i].imageUrl);
        img.setAttribute("alt", items[i].title);
        img.setAttribute("class", ("fp-" + i));
        obj.appendChild(img);
        var info = document.createElement("div");
        info.setAttribute("class", "info");
        var h2 = document.createElement("h2");
        h2.innerHTML = items[i].title;
        info.appendChild(h2);
        var hr = document.createElement("hr");
        info.appendChild(hr);
        var p = document.createElement("p");
        p.innerHTML = items[i].description;
        info.appendChild(p);
        var link = document.createElement("a");
        link.setAttribute("href", ("/tutorials/" + items[i].id ));
        link.setAttribute("title", items[i].title);
        info.appendChild(link);
        obj.appendChild(info);
        
        els[i] = obj;
    }
    return(els);
}


