import fs from "fs";
import fetch from "node-fetch";
import dotenv from 'dotenv';
dotenv.config()

const base_vault_url = process.env.VAULT_URL
const base_token_url = process.env.TOKEN_URL

const getFetch =  (url,at) => {
    return new Promise((res,rej) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer "+at
            }
        })
        .then(resp => resp.json())
        .then(data => {
            res(data)
        }).catch(err => {
            rej(err)
        })
    })
}

const getKeys =  (at) => {
    return new Promise((res,rej)=>{
        const url = base_vault_url+'secrets?api-version=7.3'
        const fetchKeysPromise = getFetch(url, at)
        fetchKeysPromise.then(data => {
            res(data)
        }).catch(err => {
            rej(data)
        })
    })
}

const getEachKey =  (at, url) => {
    return new Promise ((res,rej) => {
        const key_url = `${url}?api-version=7.3`
        fetch(key_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer "+at
            }
        }).then(resp => resp.json())
        .then(data => res(data["value"]))
        .catch(err => {
            rej(err)
        })
    }) 
    
}
const sanitizeKey = (key) => {
    key = key.toUpperCase().replaceAll('-','_')
    return key
}
const keyCreate =  () => {
    return new Promise((res,rej) => {
        createToken().then(access_token => {
            getKeys(access_token).then(data => {
                const keys = data["value"]
                const keyPromise = keys.map(async (k,i)=> {
                    return new Promise((res, rej) => {
                        getEachKey(access_token, k["id"]).then(resp => {
                            let key = k["id"].split("/")
                            key = key[key.length-1]
                            const appendSecret = `\n${sanitizeKey(key)}=${resp}`
                            fs.appendFile('./.env', appendSecret, function (err) {
                                if (err) {
                                    rej(err)
                                }else{
                                    res(appendSecret)
                                };
                            });
                        })
                    })
                })
                res(Promise.all(keyPromise));
            }).catch(err => {
                rej(err)
            })
        }).catch(err => {
            rej(err)
        })
    })
}

const createToken =  () => {
    return new Promise((res, rej) =>{
        const url = base_token_url+'token?api-version=2018-02-01&resource=https://vault.azure.net'
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Metadata': true
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            return data["access_token"]
        })
        .then(access_token => {
            res(access_token)
        })
        .catch((error) => {
            rej({message: error.message})
        });
    })
    
}
keyCreate().then(data => data).catch(err => err)

