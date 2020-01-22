console.log('hi from client');

let pageSelect = document.querySelector('#page');
let typeSelect = document.querySelector('#type');
let sendBtn = document.querySelector('#send');
let passed = document.querySelector('#passed');
let message = document.querySelector('#message');

sendBtn.onclick = e => {
    fetch(`${pageSelect.value}`,{method:'GET',headers:{'accept':typeSelect.value}}).then((res)=>{
        console.log(res);
        passed.innerHTML = res.statusText;
        res.json().then((data)=>{
            console.log(data);
            if(typeSelect.value === 'application/json'){
                message.innerHTML = data.Message;
            }
        });
        let xmlRes = new XMLDocument();
    }
    );
};