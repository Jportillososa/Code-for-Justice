const info = document.querySelector('#info');
const info2 = document.querySelector('#info2');
const info3 = document.querySelector('#info3');
const info4 = document.querySelector('#info4');


//p1
info.style.display = "none";
let isShow = false;
function showInfo(){

    if(isShow){
    info.style.display = "none";
    isShow = false;
    }
    else{
        info.style.display= "block";
        isShow = true;
    }
    
}
// p2
info2.style.display = "none";
let isShow2 = false;
function showInfo2(){

    if(isShow2){
    info2.style.display = "none";
    isShow2 = false;
    }
    else{
        info2.style.display= "block";
        isShow2 = true;
    }
    
}
//p3
info3.style.display = "none";
let isShow3 = false;
function showInfo3(){

    if(isShow3){
    info3.style.display = "none";
    isShow3 = false;
    }
    else{
        info3.style.display= "block";
        isShow3 = true;
    }
    
}
//4
info4.style.display = "none";
let isShow4 = false;
function showInfo4(){

    if(isShow4){
    info4.style.display = "none";
    isShow4 = false;
    }
    else{
        info4.style.display= "block";
        isShow4 = true;
    }
    
}






