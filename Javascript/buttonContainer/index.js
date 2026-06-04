const arr=[  
    button1=document.getElementById('btn1'),
    button2=document.getElementById('btn2'),
    button3=document.getElementById('btn3'),
    button6=document.getElementById('btn6'),
    button9=document.getElementById('btn9'),
    button8=document.getElementById('btn8'),
    button7=document.getElementById('btn7'),
    button4=document.getElementById('btn4')
    ];
const num=[1,2,3,6,9,8,7,4];
let press=0;
const b=document.getElementById('btn5');
b.addEventListener('click',()=>{
    press+=1;
    let idx=press%8;
    let val=0;
    for(let i=idx;i<8;i++)
        {
            arr[i].innerHTML=num[val];
            val+=1;
        }
    for(let i=0;i<idx;i++)
        {
            arr[i].innerHTML=num[val];
            val+=1;
        }
})

