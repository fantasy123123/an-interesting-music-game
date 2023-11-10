//游戏难度注释
var difficulty = localStorage.getItem('difficulty');
var difficultyDiv = document.querySelector('#difficulty');
difficultyDiv.innerHTML = '当前难度:' + difficulty;

//获取元素
const boor = document.querySelector('#boor');
const check = document.querySelector('#check');
const con = document.querySelector('#con');
const level = document.querySelector('#level');
const time = document.querySelector('#time');
const game=document.querySelector('#game')
const $boor=$('#boor');
const $level=$('#level')
const $con=$('#con')
const Num=parseInt(difficulty)+5;
const Arrow=["🡺","🡹","🡸","🡻"]


let x=0;//移动距离
let ifCheck=0;//是否按了空格
let conTimes=0;//连击次数
let ifGame=true;//按键每两次出现一次
let once=true;//提示语
let index=0;//按了多少个按键
let Arrows;//按键组

//开始提示语
setTimeout(()=>{
$('.span').hide();
document.querySelector('.span').innerHTML='准备好了吗？';
$('.span').fadeIn();}
,500)


//球移动及按键改变
function change(){
x=x+0.5;
boor.style.left=x+'px';
if(x>=245)
{
    $boor.fadeOut();   
}

if(x>=280&&ifGame===false)
{
    x=-30
    $boor.hide().fadeIn() 

//方向键
    $('#tr').empty();
    $('#tr').fadeIn();
    for(let i=0;i<Num;i++)
    {
        let random=parseInt(Math.random()*4)
        $("<td class='td'>"+Arrow[random]+"</td>").appendTo($('#tr'));
    }
    Arrows=document.querySelectorAll('.td')
    index=0;
    ifGame=true;
    keyAllRight=false;
}

if(x>=280&&ifGame===true)
{
    if(once===true)
    {
        $('.span').fadeOut();
        setTimeout(()=>{
            document.querySelector('.span').innerHTML='Go!';
            $('.span').fadeIn();
            setTimeout(()=>{
                $('.span').fadeOut();
                setTimeout(()=>{
                    document.querySelector('.span').innerHTML='';
                    $('.span').remove();
                },500)
            },1350)
        },500)

        once=false;
        Arrows=null;
    }

    //判定是否按了空格
    if(ifCheck===0)
    {
        conTimes=0;
        con.innerHTML='';
        level.innerHTML='';
    }
    ifCheck=0; 

    x=-30;
    $boor.hide().fadeIn();
    $('#tr').fadeOut();
    ifGame=false;
}

}
setInterval(change,1)

//按键判定
let keyAllRight=false;
window.addEventListener('keydown',(e)=>{
if(keyAllRight===false&&ifGame===true&&Arrows!=null&&(e.key==='ArrowRight'||e.key==='ArrowLeft'||e.key==='ArrowUp'||e.key==='ArrowDown'))
{
    if(Arrows[index].innerText==="🡺")
    {
            if(e.key==='ArrowRight')
            {
                Arrows[index].classList='active';
                index++;
                if(index===Num)
                {
                    keyAllRight=true;
                }
            }
            else
            {
                for(let i=0;i<Num;i++)
                {
                    Arrows[i].classList='td';
                }
                index=0;
            }
        return;  
    }

    if(Arrows[index].innerText==="🡹")
    {
            if(e.key==='ArrowUp')
            {
                Arrows[index].classList='active';
                index++;
                if(index===Num)
                {
                    keyAllRight=true;
                }
            }
            else
            {
                for(let i=0;i<Num;i++)
                {
                    Arrows[i].classList='td';
                }
                index=0;
            }
            return; 
    
    }

    if(Arrows[index].innerText==="🡸")
    {
            if(e.key==='ArrowLeft')
            {
                Arrows[index].classList='active';
                index++;
                if(index===Num)
                {
                    keyAllRight=true;
                }
            }
            else
            {
                for(let i=0;i<Num;i++)
                {
                    Arrows[i].classList='td';
                }
                index=0;
            }
            return; 
    }

    if(Arrows[index].innerText==="🡻")
    {
            if(e.key==='ArrowDown')
            {
                Arrows[index].classList='active';
                index++;
                if(index===Num)
                {
                    keyAllRight=true;
                }
            }
            else
            {
                for(let i=0;i<Num;i++)
                {
                    Arrows[i].classList='td';
                }
                index=0;
            }
            return; 
    }
}
})


//判定按空格时球的位置
window.addEventListener('keydown',e=>{
    if(e.keyCode===32&&ifGame===true&&once===false)
    {
        if(keyAllRight===false)
        {
            for(let i=0;i<Num;i++)
            {
                Arrows[i].classList='td';
            }
            index=0;
            return;
        }
        
        ifCheck=1;
        //perfect:225~230 nice:230~240 215~225 
        if(x>=225&&x<=230&&keyAllRight===true)
        {
            level.innerHTML='Perfect!';
            $level.show();
            conTimes++;
        }
        else if(((x>230&&x<=240)||(x>=215&&x<225))&&keyAllRight===true)
        {
            level.innerHTML='Nice!';
            $level.show();
            conTimes++;
        }
        else
        {
            level.innerHTML='Just SoSo!'
            $level.show();
            conTimes=0;
        }

        //连击次数
        if(conTimes>=3)
        {
            con.innerHTML='连击*'+conTimes;
        }
        else
        {
            con.innerHTML='';
        }
    }
})
