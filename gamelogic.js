let aa=5;
let score=0;
var back=[];
function nxtquestion(){
    let a=Math.round(Math.random()*5);
    let b=Math.round(Math.random()*6);
    aa=a+b;
    let c=Math.round(Math.random(0,1));
    let d='+';
    aa=a+b;
    if (c==1){
        a=Math.round(Math.random()*9);
        b=Math.round(Math.random(0,a));
        aa=a-b;
        d='-'
    }
    document.getElementById('n1').innerHTML=a;
    document.getElementById('n2').innerHTML=b;
    document.getElementById('n3').innerHTML=d;
}

function checkans(anss){
    if (anss==aa){
        console.log("Correct");
        console.log(anss,aa);
        score=score+1;
        if (score<=6){
        back.push(`url('images/background${score}.svg')`);
        document.body.style.backgroundImage=back;}
        if (score==7){
            score=0;
            alert("Congratulation ! Ya Won !!!");
            back=[];
        }
    }
    if (anss!=aa){
        console.log("Incorrect");
        console.log(anss,aa);
        if (score!=0){
            score--;
            back.pop();
            //back.push(`url('images/background${score}.svg')`);
            document.body.style.backgroundImage=back;
        }
    }
    nxtquestion();
}
