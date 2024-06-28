import { Header } from "/src/pages/mirang1024/header/Header.js";


const header = new Header()
const root = document.querySelector("#root")
root.innerHtml = header.render()
console.log(root);