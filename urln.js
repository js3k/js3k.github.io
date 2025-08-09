const $new = document.createElement.bind(document);
const $id = document.getElementById.bind(document);
const buttonM = `
<style>
.ht{margin:4px; padding:0.7rem;background:#efe;border-radius:4px;a{color:green;text-decoration:none;}}
.btn{background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" fill="none"/><line x1="24" y1="8" x2="24" y2="40" stroke="black" stroke-width="6"/><line x1="8" y1="24" x2="40" y2="24" stroke="black" stroke-width="6"/></svg>');
background-size:100% 100%;background-repeat:no-repeat;
width:40px;height:40px;overflow:hidden;position:fixed;
top:10px;right:3%;z-index:1;display:inline-block;transition:0.5s;
}
#btn{display:none}
#btn:checked~.btn{transform: rotate(-0.87turn);}
#btn:checked~#menu{height:100%;}
#menu{
  font-family: monospace;
  height:62px;
  transition:0.5s;
  width:100%;
  margin:0;
  padding:0;
  position:fixed;left:0;top:0px;
  }
#data{
  transition:0.5s;
  position:absolute;border-radius:4px;
  left:4px;top:3.7em;right:4px;bottom:4px;
  overflow:scroll;
}
</style>
<input id="btn" type="checkbox">
<label for="btn" class="btn"></label>
<div id="menu"><h1 class="ht"><a href="#">urln.github.io</a></h1></div>
`;
document.body.insertAdjacentHTML("beforeend", buttonM);

setTimeout(function () {
  $id("btn").checked = true;
  setTimeout(function () {
    $id("btn").checked = false;
  }, 500);
}, 500);

const content = $id("menu");
const divE = $new("div");
divE.setAttribute("id", "data");
divE.textContent = "Loading......";
content.appendChild(divE);
divE.style.fontFamily = "sans-serif";
divE.style.margin = "0";
divE.style.padding = "0";

const url = `https://api.github.com/repos/urln/urln.github.io/contents/post`;
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    const dataDiv = $id("data");
    dataDiv.innerHTML = "";
    const ul = $new("ul");
    ul.style.listStyleType = "none";
    ul.style.margin = "0";
    ul.style.padding = "0";

    data.forEach((item) => {
      const oSt = `${item.html_url}`;
      const nSt = oSt.replace(
        /https:\/\/github.com\/urln\/urln.github.io\/blob\/main\/post\//g,
        ""
      );
      const eNs = nSt.replace(/.html|.css|.js|.txt|.md|.png/g, "");
      const li = $new("li");
      li.style.backgroundColor = "#eee";
      li.style.margin = "1px 0";
      li.style.padding = "5px";
      li.style.border = "4px solid #ddd";
      li.style.borderRadius = "";
      li.innerHTML = `<a style="font-family:monospace;color:#123456" href="post/${eNs}.html">${eNs}</a> 
                            <a style="float:right;color:#456789" href="${item.download_url}">raw</a>`;
      ul.appendChild(li);
    });

    dataDiv.appendChild(ul);
  })
  .catch((error) => {
    const dataDiv = $id("data");
    dataDiv.innerHTML = "Error fetching data: " + error.message;
  });
