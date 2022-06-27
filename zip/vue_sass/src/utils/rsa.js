import { JSEncrypt } from 'encryptlong';
//rsa加密
export const checkRSA = (obj) => {
    //设置公钥
    let pubKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDTViBmtHD+ifOOPYCrOc3z70oTond2d/nkIHi9tVSGeUjCWWU+jcfvNeQxS2MYJ7B3LVC6RialFyB5iXyp3UP/uV/n1ANpe5C3IcFuuGLMcRER2jRBFGWaqiN9wGRIKuEJfsrEZMZSgj6mQjxSGNyYk1Ky6BfDlpKtR8lDmADu8wIDAQAB`;
    //创建JSencrypt实例
    let encryStr = new JSEncrypt();
    //获取公钥
    encryStr.setPublicKey(pubKey);
    //返回数据
    let data = encryStr.encryptLong(encodeURI(JSON.stringify(obj), 'utf-8'));
    return data;
};

