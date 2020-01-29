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
        if(typeSelect.value === 'application/json'){
            res.json().then((data)=>{
                console.log(data);
                message.innerHTML = data.Message;
                
            });
        }
        else{
            res.text().then((data)=>{
                //console.log(data.toString().substr(1,data.toString().length-1));
                //let str = data.toString().substr(1,data.toString().length-1);
                console.log(data);
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(data,'text/xml');
                console.log(xmlDoc);
                message.innerHTML = xmlDoc.querySelector('message').textContent;
            });
        }
        //let xmlRes = new XMLDocument();
    }
    );
};

function test(){
    let parser = new DOMParser();
    let doc = parser.parseFromString("<message>This is an XML success response</message>",'text/xml');
    console.log(doc);
}