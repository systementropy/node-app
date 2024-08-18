(function(w){

    const FORM_SCAFFOLD = [
        ["name","Name","text", 10],
        ["card_details","Card Details","text", 16],
        ["expiry","Expiry","text", 5],
        ["cvv","CVV","number", 4],
        ["zip_code","Zip Code","text", 10]
    ]

    const acceptedCreditCards = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
        amex: /^3[47][0-9]{13}$/,
        discover: /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
        diners_club: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/
      };

    const generateScafold = () => {
        let initStr = ""
        FORM_SCAFFOLD.map((item,index)=>{
            initStr = initStr.concat("<div class='if_app_row'><label for='if_app_"+index+"'>"+item[1]+"</label><input id='if_app_"+index+"' type='"+item[2]+"' maxlength='"+item[3]+"''></div>")
        })
        return initStr
    }

    const validateIndividualFeilds = (type, data) => {
        
        switch (type) {
            case "name":
                return /^[a-zA-Z ]*$/.test(data)
                break;
            case "card_details":
                const value = data.replace(/\D/g, '');
                let sum = 0;
                let shouldDouble = false;
                for (let i = value.length - 1; i >= 0; i--) {
                    let digit = parseInt(value.charAt(i));

                    if (shouldDouble) {
                        if ((digit *= 2) > 9) digit -= 9;
                    }

                    sum += digit;
                    shouldDouble = !shouldDouble;
                }
                var valid = (sum % 10) == 0;
                var accepted = false;
                Object.keys(acceptedCreditCards).forEach(function(key) {
                    var regex = acceptedCreditCards[key];
                    if (regex.test(value)) {
                    accepted = true;
                    }
                });
                
                return valid && accepted;
                break;
            case "expiry":
                return /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(data)
                break;
            case "cvv":
                return (data.length === (3 || 4))? true : false
                break;
            case "zip_code":
                return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(data)
                break;
            default:
                return true;
        }
    }
    
    const validateData = (cb) => {
        let validated = true
        const inputObj = {}

        FORM_SCAFFOLD.map((item,index)=>{
            const elem = document.querySelector('#if_app_'+index)
            if(elem.value.length > 0){
                const validatedFeilds = validateIndividualFeilds(item[0], elem.value)
                validatedFeilds? inputObj[item[0]] = elem.value : validated = false
            }else{
                elem.style.boxShadow = "1px 1px 3px 0px #FF33334a"
                validated = false
            }
        })
        if(validated){
            const if_app_rows =  document.querySelectorAll('.if_app_row')
            if_app_rows.forEach(function(row){
                row.querySelector('input').style.boxShadow = "1px 1px 3px 0px #3333334a";
            })
            cb(inputObj)
        }else{
            cb(false)
        }
        
    }

    const body = document.querySelector('body')
    const htmlString = "<div id='if_app_content'>"+generateScafold()+"</div>"
    body.insertAdjacentHTML('beforeend', htmlString)

    document.querySelector('#if_app_content').style.cssText = "display:flex; flex-direction: column; width: 300; align-items: baseline; color:#464646;  font-family: 'Inter', Arial, Helvetica sans-serif; margin:0; padding:40px; box-shadow:0px 0px 4px 1px #3333; ";

    const if_app_rows =  document.querySelectorAll('.if_app_row')
    if_app_rows.forEach(function(row){
        row.style.cssText = "height: 40px; display:flex; width: 100%;  justify-content: space-between;  align-items:center";
        row.querySelector('input').style.cssText = "width:180px; border:none; box-shadow:1px 1px 3px 0px #3333334a; padding:5px 8px";

    })

    w.addEventListener("message",function(event){
        
        if(event.data.event === "saveCardDetails"){
            validateData(function(data){
                if(data){              
                    document.querySelector('#if_app_content').style.boxShadow = "0px 0px 4px 1px #3333";
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
                        document.querySelector('#if_app_content').style.boxShadow = "0px 0px 4px 1px #3F33";
                    })
                    .catch((error) => {
                        document.querySelector('#if_app_content').style.boxShadow = "0px 0px 4px 1px #F333";
                    });

                }else{
                }
            })
        }
    })
    
}(window))