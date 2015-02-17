var xmlhttp = new XMLHttpRequest(),
  url = "data/tutorials.json";

xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
        makeThings(myArr);
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

function makeThings(arr) {
    var elements = buildItems(arr),
      i = 0,
      container = document.querySelectorAll(".main.content")[0];
    for (i = 0; i < elements.length; i++) {
        container.appendChild(elements[i]);
    }
}

function oddEvenClass(num) {
    if ((num % 2) === 0) {
        return 'even';
    } else {
        return 'odd';
    }
}

function getIndex(className) {
    return className.split("-")[1];
}

function showInfo(event) {
    var index = getIndex(event.target.className),
      info = document.querySelectorAll('.info')[index];
    info.classList.remove('hide');
}

function hideInfo(event) {
    var index = getIndex(event.target.className),
      info = document.querySelectorAll('.info')[index];
    info.classList.add('hide');
}

function addListener(el, ev, fn) {
    (el.addEventListener) ? el.addEventListener(ev, fn, false) : el.attachEvent(ev, fn);
}

function buildItems(items) {
    var i = 0,
      els = [],
      hideClass = 'hide';

    for (i = 0; i < items.length; i++) {
        var obj = document.createElement("div");
        obj.setAttribute("class", "fp");
        obj.classList.add("fp-" + i);
        var img = document.createElement("img");
        img.setAttribute("src", items[i].imageUrl);
        img.setAttribute("alt", items[i].title);
        obj.appendChild(img);
        var info = document.createElement("div");
        info.setAttribute("class", "info");
        info.classList.add(oddEvenClass(i));
        info.classList.add(hideClass);
        var h2 = document.createElement("h2");
        h2.innerHTML = items[i].title;
        info.appendChild(h2);
        var hr = document.createElement("hr");
        info.appendChild(hr);
        var p = document.createElement("p");
        p.innerHTML = items[i].description;
        info.appendChild(p);
        var link = document.createElement("a");
        link.setAttribute("href", ("/tutorials/" + items[i].id));
        link.setAttribute("title", items[i].title);
        info.appendChild(link);
        obj.appendChild(info);
        addListener(obj, "mouseenter", showInfo);
        addListener(obj, "mouseleave", hideInfo);
        els[i] = obj;
    }
    return(els);
}


