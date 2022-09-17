const addBtn=document.querySelector('#add-btn');
const popupBtn=document.querySelector('.popup');
const closeBtn=document.querySelector('.close-btn');
const flashcardList=document.querySelector('.flashcard-list');
const submitBtn=document.querySelector('.submit');
const formInputs=document.querySelector('.form-inputs');
const questionInput=document.querySelector('.question');
const answerInput=document.querySelector('.answer');
const requiredField=document.querySelector('.required-field');



let arrQues=[];
let arrAns=[];
let arrCard=[];
let i=-1;
let editValue=-1;
let isDelete=0;

let popQues;
let isEdit=false;

addBtn.addEventListener('click',()=>{
    popupBtn.classList.add('active');
    formInputs.reset();
    isEdit=false;
});

closeBtn.addEventListener('click',()=>{
    popupBtn.classList.remove('active');
    formInputs.reset();
});

const createFlashCard=()=>{
    i++;
    arrQues.push(questionInput.value);
    arrAns.push(answerInput.value);
   
    const flashCard=document.createElement('div');
    flashCard.innerHTML=`
    <div class='scene'>
      <div class='card'>
        <div class='card__face card__face--front'>
        <h1 class='questionh1'>${questionInput.value}</h1>
        <a href='javascript:void(0)' class='details' onclick='flipBack(${i})'>Show/Hide Answer</a>
        <button class='btn-small edit' onclick='myEdit(${i})'>Edit</button>
        <button class='btn-small delete' onclick='myDelete(${i})'>Delete</button>
        </div>
        <div class='card__face card__face--back' onclick='flipFront(${i})'>
        <h2 class='answerh2'>${answerInput.value}</h2>
        </div>
      </div>
    <div>
    `;
    flashCard.classList.add('flash-style');
    flashcardList.append(flashCard);
    arrCard.push(flashCard);
    
};

const flipBack=(j)=>{
   
    arrCard.forEach((card)=>{
        let otherCards=card.querySelector('.card');
        otherCards.classList.remove('is-flipped');
    });

    const cardSelect=arrCard[j].querySelector('.card');
    cardSelect.classList.add('is-flipped');

    };

const flipFront=(j)=>{
    
    const cardSelect=arrCard[j].querySelector('.card');
    cardSelect.classList.remove('is-flipped');
};

submitBtn.addEventListener('click',(e)=>{
    e.preventDefault();

    if(questionInput.value==''||answerInput.value==''){
        requiredField.classList.add('active');
    }else{
        requiredField.classList.remove('active');
        
            if(isEdit==true){
                
                arrCard[editValue].querySelector('.questionh1').innerText=`${questionInput.value}`;
                arrCard[editValue].querySelector('.answerh2').innerText=`${answerInput.value}`;
                arrQues[editValue]=questionInput.value;
                arrAns[editValue]=answerInput.value;
                console.log(arrQues,arrAns);
                formInputs.reset();
                isEdit=false;
                
            }else if(isEdit==false){
                let isCreate=true;
                arrQues.forEach((qu)=>{
                    if(questionInput.value===qu){
                        formInputs.classList.add('active');
                         popQues=document.createElement('div');
                         popQues.innerHTML=`
                         <div class='yes-no-ques'>
                            <p>This Question already exists! <br>Would you like to edit the answer?</p>
                            <div class=yes-no>
                            <button class='btn-small yes-btn' onclick='isRepeat(${arrQues.indexOf(qu)})'>Yes</button>
                            <button class='btn-small no-btn' onclick='closeModal()'>No</button>
                            </div>
                        </div>
                        `;
                        
                        popQues.classList.add('popques-style');
                        
                        popupBtn.append(popQues);
                         isCreate=false;
                    }
                });
                       if(isCreate==true){ 
                        createFlashCard();
                        formInputs.reset();
                       }
                

            }
        }   
    });

const closeModal=()=>{
        popQues.remove();
        formInputs.classList.remove('active');
        popupBtn.classList.add('active');
        formInputs.reset();

    }
    
const myEdit=(j)=>{
    
    isEdit=true;
   console.log(j);
   requiredField.classList.remove('active');
    popupBtn.classList.add('active');
    questionInput.value=arrQues[j];
    answerInput.value=arrAns[j];
    editValue=j;
    
};

const isRepeat=(k)=>{
    isEdit=true;
   console.log(k);
   requiredField.classList.remove('active');
   formInputs.classList.remove('active');
   popQues.remove();
    popupBtn.classList.add('active');
   
    questionInput.value=arrQues[k];
    answerInput.value=arrAns[k];
    editValue=k;
};



const inputChange=()=>{
    requiredField.classList.remove('active');
    arrCard.forEach((card)=>{
        let otherCards=card.querySelector('.card');
        otherCards.classList.remove('is-flipped');
    });

};

const myDelete=(d)=>{
    
    arrCard[d].querySelector('.scene').parentElement.remove();
    delete arrQues[d];
    delete arrAns[d];
    console.log(arrQues,arrAns);

}