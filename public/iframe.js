(function(w){

    const FORM_SCAFFOLD = [["name","Name","text"],["card_details","Card Details","text"],["expiry","Expiry","text"],["cvv","CVV","password"],["zip_code","Zip Code","text"]]

    const generateScafold = () => {
        let initStr = ""
        FORM_SCAFFOLD.map((item,index)=>{
            initStr = initStr.concat("<div class='if_in_app_row'><label for='if_in_app_"+index+"'>"+item[1]+"</label><input id='if_in_app_"+index+"' type='"+item[2]+"'></div>")
        })

        return initStr
    }
    
    const validateData = (cb) => {
        let validated = true
        const inputObj = {}

        FORM_SCAFFOLD.map((item,index) => {
            const elem = document.querySelector('#if_in_app_'+index)
            if(elem.value.length > 0){
                inputObj[item[0]] = elem.value
            }else{
                elem.style.boxShadow = "1px 1px 3px 0px #FF33334a"
                validated = false
            }
        })
        if(validated){
            const if_in_app_rows =  document.querySelectorAll('.if_in_app_row')
            if_in_app_rows.forEach(function(row){
                row.querySelector('input').style.boxShadow = "1px 1px 3px 0px #3333334a";
            })
            cb(inputObj)
        }else{
            cb(false)
        }
        
    }

    const body = document.querySelector('body')
    const htmlString = "<div id='if_in_app_content'>"+generateScafold()+"</div>"
    body.insertAdjacentHTML('beforeend', htmlString)

    const inlineIframe = document.querySelector('#if_in_app_content')

    inlineIframe.style.cssText = "display:flex; flex-direction: column; width: 300; align-items: baseline; color:#464646; font-family: 'Inter', Arial, Helvetica sans-serif; margin:0; padding:40px; box-shadow:0px 0px 4px 1px #3333; position: fixed; top: 0; left: 0; width: 800px; background: #464646; color: #EEE; height: 800px; ";

    const if_in_app_rows =  document.querySelectorAll('.if_in_app_row')
    if_in_app_rows.forEach(function(row){
        row.style.cssText = "height: 40px; display:flex; width: 100%;  justify-content: space-between;  align-items:center";
        row.querySelector('input').style.cssText = "width:180px; border:none; box-shadow:1px 1px 3px 0px #3333334a; padding:5px 8px";

    })

    w.addEventListener("message",function(event){
        
        if(event.data.event === "saveCardDetails"){
            validateData(function(data){
                if(data){              
                    document.querySelector('#if_in_app_content').style.boxShadow = "0px 0px 4px 1px #3333";
                    fetch('/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin':'*'
                        },
                        body: JSON.stringify({data: data}),
                    })
                    .then(response => response.json())
                    .then(data => {
                        document.querySelector('#if_in_app_content').style.boxShadow = "0px 0px 4px 1px #3F33";
                    })
                    .catch((error) => {
                        document.querySelector('#if_in_app_content').style.boxShadow = "0px 0px 4px 1px #F333";
                    });

                }else{

                }
            })
        }
    })
}(window))