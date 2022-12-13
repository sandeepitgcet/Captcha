let images=[];
let url=`https://picsum.photos/200/300?random=1`;
let flag=false;
let state=1;
let reset=document.getElementById("reset");
let verify=document.getElementById("btn");
let isOneSelected=false;
let isBothSelected=false;
let firstImage='';
let secondImage='';
getImages();
randomSort();
showImages();

function imageCick(event){
    let img=event.target;
    if(state==1){
        state=2;
        isOneSelected=true;
        firstImage=img.getAttribute("data-ns-test");
        img.onclick=()=>{};
        showResetButton();
    }else if(state==2){
        state=3;
        secondImage=img.getAttribute("data-ns-test");
        if(isOneSelected){
            isBothSelected=true;
            showVerifyButton();
        }else{
            secondImage='';
            state=2;
        }

        
    }else if(state==3){
        state=4;
    }
}

function showVerifyButton(){
    let btn=document.createElement("button");
    btn.setAttribute("id","btn");
    btn.innerHTML="Verify";
    btn.onclick=function(){
        showResult();
        document.querySelector("#buttons").innerHTML='';
        state=4;
    }
    document.querySelector("#buttons").appendChild(btn);
}

function showResetButton(){
    let btn=document.createElement("button");
    btn.setAttribute("id","reset");
    btn.innerHTML="Reset";
    btn.onclick=function(){
        state=1;
        hideAll();
        isOneSelected=false;
        document.querySelectorAll("img").forEach((img)=>{
            img.style.pointerEvents="auto";
        });
    };
    document.querySelector("#buttons").appendChild(btn);
    
}

function hideAll(){
    document.getElementById("res").innerHTML='';
    document.getElementById("buttons").innerHTML='';
}

function getImages(){
    let r=Math.floor(Math.random()*5);
    let cpyImg=document.createElement("img");
    for(let i=0;i<5;i++){
        if(r==i){
            cpyImg.setAttribute("data-ns-test",`img${r+1}`);
            cpyImg.onclick=(event)=>{
                imageCick(event);
            };
        }
        let img=document.createElement("img");
        img.setAttribute("data-ns-test",`img${i+1}`);
        img.onclick=(event)=>{
            imageCick(event);
        };
        fetch(url).then(response=>{
            let x=response.url;
            img.setAttribute("src",x);
            if(i==r){
                cpyImg.setAttribute("src",x);
                
                //console.log(i,"cpyIng added");
            }
            return response;
        }).catch(e=>{
            console.log(e);
        })
        images.push(img);
        images.push(cpyImg);
    }
}

function randomSort(){
    images.sort(()=> Math.random()-0.5);
}

function showImages(){
    let imgs=document.querySelector(".images");
    for(let i=0;i<images.length;i++){
        imgs.appendChild(images[i]);
    }
    //console.log(images.length);
}

function showResult(){
    let res= document.getElementById("res");
    let para=document.createElement("p");
    para.setAttribute("id","para");
    if(isBothSelected==true && firstImage==secondImage){
        para.innerHTML="You are a human. Congratulations!";
    }else{
        para.innerHTML="We can't verify you as a human. You selected the non-identical tiles."
    }
    res.appendChild(para);
    document.querySelectorAll("img").forEach((img)=>{
        img.onclick=()=>{};
    });
}