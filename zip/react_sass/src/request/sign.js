import axios from 'axios';

function splic(data,url, Region, Nonce, Time, Host){     
    const HttpHeader = {
        "region": Region,
        "channel": 3,
        "version": "1.0.0",
        "accessId": '4JcqKpI3kTlgTBQjTvRckOZH4Hyk1M6d',
        "timestamp": Time,
        "nonce": Nonce,
        "path": url,
        "host": Host
    }
    const Params = Object.assign(HttpHeader,data);
    return Params;
}

export async function getSign(value,url,Region,Nonce,Time,Host) {
    return await axios({
        method:'get',
        url:'https://stat.kuaipantech.com/ruiyunsign/sign.php',
        params:splic(value,url,Region,Nonce,Time, Host)
    }).then(res=>{
        return res.data.sign;
    });
};