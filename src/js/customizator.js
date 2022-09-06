export default class Customizator {
  constructor() {
    this.btnBlock = document.createElement("div");
    this.colorPicker = document.createElement("input");
    this.clear = document.createElement('div');
    this.scale = localStorage.getItem('scale') || 1;
    this.color = localStorage.getItem('color') || '#ffffff';

    this.btnBlock.addEventListener("click", (e) => this.onScaleChange(e));
    this.colorPicker.addEventListener("input", (e) => this.onColorChange(e));
    this.clear.addEventListener('click', () => this.reset());
  }

  onScaleChange(e) {
    const body = document.querySelector("body");
    if (e) {
      this.scale = +e.target.value.replace(/x/g, "");
    }

    const recursy = (element) => {
      element.childNodes.forEach((node) => {
        if (
          node.nodeName === "#text" &&
          node.nodeValue.replace(/\s+/g, "").length > 0
        ) {
          if (!node.parentNode.getAttribute("data-fz")) {
            let value = window.getComputedStyle(node.parentNode, null).fontSize;
            node.parentNode.setAttribute("data-fz", +value.replace(/px/g, ""));
            node.parentNode.style.fontSize =
              node.parentNode.getAttribute("data-fz") * this.scale + "px";
          } else {
            node.parentNode.style.fontSize =
              node.parentNode.getAttribute("data-fz") * this.scale + "px";
          }
        } else {
          recursy(node);
        }
      });
    }
    recursy(body);
    localStorage.setItem('scale', this.scale);
  }
  onColorChange(e) {
    const body = document.querySelector("body");
    body.style.backgroundColor = e.target.value;
    localStorage.setItem('color', e.target.value);
  }

  setBgColor(){
    const body = document.querySelector("body");
    body.style.backgroundColor = this.color;
    this.colorPicker.value = this.color;
  }
  injectStyle(){
    const style = document.createElement('style');
    style.innerHTML = `
    .panel {
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: fixed;
      top: 10px;
      right: 0;
      border: 1px solid rgba(0,0,0, .2);
      box-shadow: 0 0 20px rgba(0,0,0, .5);
      width: 300px;
      height: 60px;
      background-color: #fff;

  }

    .scale {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100px;
        height: 40px;
    }
    .scale_btn {
      display: block;
      width: 40px;
      height: 40px;
      border: 1px solid rgba(0,0,0, .2);
      border-radius: 4px;
      font-size: 18px;
  }

    .color {
        width: 40px;
        height: 40px;
  }
    .clear{
        font-size: 20px;
        cursor: pointer;
    }`;
  
  document.querySelector('head').appendChild(style);
  }

  reset(){
    localStorage.clear();
    this.scale = 1;
    this.color = '#ffffff';
    this.setBgColor();
    this.onScaleChange();
  }
  render() {
    this.setBgColor();
    this.injectStyle();
    this.onScaleChange();
    let scaleInputS = document.createElement("input"),
        scaleInputM = document.createElement("input"),
        panel = document.createElement("div");

    panel.append(this.btnBlock, this.colorPicker, this.clear);
    this.clear.innerHTML = '&times;';
    this.clear.classList.add('clear');

    scaleInputS.classList.add("scale_btn");
    scaleInputM.classList.add("scale_btn");

    scaleInputS.setAttribute("value", "1x");
    scaleInputM.setAttribute("value", "1.5x");

    this.btnBlock.classList.add("scale");
    this.colorPicker.classList.add("color");

    scaleInputS.setAttribute("type", "button");
    scaleInputM.setAttribute("type", "button");

    this.colorPicker.setAttribute("type", "color");
    this.colorPicker.setAttribute("value", "#ffffff");

    this.btnBlock.append(scaleInputS, scaleInputM);

    panel.classList.add("panel");

    document.querySelector("body").append(panel);
  }
}

const width = +prompt('Width'),
      height = +prompt('Height');

function matrix(width, height) {
  let matr = new Array(height).fill().map(() => new Array(width).fill(''));

  let counter = 1;
  let startCol = 0;
  let endCol = width - 1;
  let startRow = 0;
  let endRow = height - 1;

  while(startCol <= endCol && startRow <= endRow){
    for (let i = startCol; i <= endCol; i++) {
      matr[startRow][i] = counter;
      counter++;
    }
    startRow++;

    for (let j = startRow; j <= endRow; j++) {
      matr[j][endCol] = counter;
      counter++;  
    }
    endCol--;

    for (let i = endCol; i >= startCol; i--) {
      matr[endRow][i] = counter;
      counter++; 
    }
    endRow--;

    for (let i = endRow; i >= startRow; i--) {
      matr[i][startCol] = counter;
      counter++; 
    }
    startCol++;
  }
  return matr;
}
console.log(matrix(width,  height));



const arr = [
 {ratingRevievs: "264 отзыва", price: {oldUan: "4 333 грн", newUan: "3 799 грн"}, name: "Motorola MOTO G4 (XT1622) Black"},
 {ratingRevievs: "1355 отзывов", price: "4 999 грн", name: "Samsung Galaxy J7 J700H/DS Black + карта памяти 16гб + чехол + защитное стекло!"},
 {ratingRevievs: "426 отзывов", price: "5 199 грн", name: "Samsung Galaxy J5 (2016) J510H/DS Black + защитное стекло + чехол!"},
   {ratingRevievs: "403 отзыва", price: "4 349 грн", name: "Xiaomi Redmi Note 4X 3/32GB Black"}, {ratingRevievs: "488 отзывов", price: "6 199 грн", name: "Samsung Galaxy J7 (2016) J710F/DS Gold + защитное стекло + чехол!"}, {ratingRevievs: "198 отзывов", price: {oldUan: "3 495 грн", newUan: "2 995 грн"}, name: "Lenovo K5 (A6020a40) Silver"}, {ratingRevievs: "352 отзыва", price: {oldUan: "9 799 грн", newUan: "7 999 грн"}, name: "Apple iPhone 5s 16GB Space Gray"}, {ratingRevievs: "59 отзывов", price: "5 999 грн", name: "Nokia 5 Dual Sim Tempered Blue"}, {ratingRevievs: "119 отзывов", price: "11 999 грн", name: "Samsung Galaxy A5 2017 Duos SM-A520 Black + карта памяти 128гб!"}, {ratingRevievs: "1106 отзывов", price: "3 999 грн", name: "Samsung Galaxy J5 J500H/DS Black + чехол + защитное стекло!"}, {ratingRevievs: "380 отзывов", price: "2 199 грн", name: "Huawei Y3 II Tiffany (White-Blue) + чехол + защитное стекло!"}, {ratingRevievs: "86 отзывов", price: {oldUan: "24 999 грн", newUan: "22 999 грн"}, name: "Samsung Galaxy S8 64GB Midnight Black + карта памяти 64гб + оригинальный чехол!"}, {ratingRevievs: "177 отзывов", price: "6 499 грн", name: "Huawei P8 Lite 2017 White + УМБ Huawei AP08Q + защитное стекло + чехол!"}, {ratingRevievs: "347 отзывов", price: "4 299 грн", name: "Xiaomi Redmi 4X 3/32GB Black (Международная версия)"}, {ratingRevievs: "709 отзывов", price: "2 799 грн", name: "Samsung Galaxy J1 2016 SM-J120H Black + защитное стекло + чехол!"}, {ratingRevievs: "527 отзывов", price: "3 999 грн", name: "Huawei Y6 Pro Gold + чехол + защитное стекло!"}, {ratingRevievs: "66 отзывов", price: "16 499 грн", name: "Apple iPhone 6s 32GB Gold"}, {ratingRevievs: "14 отзывов", price: "11 499 грн", name: "Apple iPhone 6 32GB Space Gray"}, {ratingRevievs: "70 отзывов", price: {oldUan: "7 399 грн", newUan: "5 999 грн"}, name: "Asus ZenFone 2 32GB (ZE551ML) Black"}, {ratingRevievs: "45 отзывов", price: "4 299 грн", name: "Nokia 3 Dual Sim Silver White + сертификаты 500 грн!"}, {ratingRevievs: "376 отзывов", price: "3 899 грн", name: "Meizu M3 Note 32GB Grey (Международная версия)"}, {ratingRevievs: "111 отзывов", price: {oldUan: "9 999 грн", newUan: "7 999 грн"}, name: "Sony Xperia X Dual (F5122) White"}, {ratingRevievs: "40 отзывов", price: "2 222 грн", name: "Lenovo Vibe C (A2020) Black + УМБ PowerPlant 5200 mAh в подарок!"}, {ratingRevievs: "93 отзыва", price: "18 999 грн", name: "Apple iPhone 7 32GB Black"}, {ratingRevievs: "33 отзыва", price: "16 999 грн", name: "Huawei P10 4/32GB Black + сертификат 2500грн + чехол Huawei Smart View Cover!"}, {ratingRevievs: "71 отзыв", price: {oldUan: "2 399 грн", newUan: "1 999 грн"}, name: "LG K5 X220ds Gold"}, {ratingRevievs: "39 отзывов", price: "2 995 грн", name: "Lenovo C2 Power (K10a40) Black"}, {ratingRevievs: "156 отзывов", price: "2 599 грн", name: "Nous NS 5006 Gold"}, {ratingRevievs: "40 отзывов", price: "19 689 грн", name: "LG G6 Mystic White"}, {ratingRevievs: "24 отзыва", price: "5 995 грн", name: "Motorola MOTO G5 (XT1676) Grey"}, {ratingRevievs: "7 отзывов", price: {oldUan: "10 999 грн", newUan: "9 999 грн"}, name: "HTC One X10 Dual Sim Silver"}, {ratingRevievs: "18 отзывов", price: {oldUan: "5 999 грн", newUan: "4 999 грн"}, name: "Sony Xperia L1 Dual Black"}]

    const copy = JSON.parse(JSON.stringify(arr));
    const copy2 = JSON.parse(JSON.stringify(arr));

    copy.forEach(item =>{
      item.ratingRevievs = +item.ratingRevievs.replace(/\D/ig, '');
    });

    copy2.forEach(item =>{
      item.price = typeof item.price === 'object' ? +item.price.newUan.replace(/\D/ig, '') : +item.price.replace(/\D/ig, '');
    });

    const rating =  copy.sort((a, b)=>{
      return a.ratingRevievs > b.ratingRevievs ? 1 : -1;
      });

    const price = copy2.sort((a, b)=>{
      return a.price > b.price ? 1 : -1;
      });
    
   document.querySelector('.feed').addEventListener('click', () =>{
    document.querySelector('.cont').innerHTML ='';
    rating.forEach(item =>{
      document.querySelector('.cont').innerHTML += `
      <div>${item.name}</div>
      <div>${item.ratingRevievs}</div>
      `
    });
  });
  
   document.querySelector('.price').addEventListener('click', () =>{
    document.querySelector('.cont').innerHTML ='';
    price.forEach(item =>{
      document.querySelector('.cont').innerHTML += `
      <div>${item.name}</div>
      <div>${item.price} грн</div>
      `
    });
    
  });


  