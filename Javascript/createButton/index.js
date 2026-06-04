  const button1=document.getElementById('btn');

button1.addEventListener('click',()=>{
    let value=Number(button1.innerHTML);
    button1.innerHTML=value+1;
})