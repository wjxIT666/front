import { MessageInterface } from '../js/ELE_Message/message.js';
import axios from 'axios';
//时间格式化方法
export const dateChange = (row, column) => {
     // 获取单元格数据
     let data = row[column.property];
     if (data == null) {
         return null;
     };
     let dt = new Date(data);
     let year = dt.getFullYear(); //年
     let month = dt.getMonth(); //月
     month = month + 1;
     month = month >= 10 ? month : `0${month}`;
     let day = dt.getDate(); //日
     day = day >= 10 ? day : `0${day}`;
     let hours = dt.getHours(); //时
     hours = hours >= 10 ? hours : `0${hours}`;
     let minutes = dt.getMinutes(); //分
     minutes = minutes >= 10 ? minutes : `0${minutes}`;
     let seconds = dt.getSeconds(); //秒
     seconds = seconds >= 10 ? seconds : `0${seconds}`;
     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

//企业状态审核方法
export const corpStatusChange = (corpStatus) => {
    switch (corpStatus) {
        case 0:
           corpStatus = '未入驻';
           return corpStatus;
        case 1:
           corpStatus = '待审核';
           return corpStatus;
        case 2:
            corpStatus = '通过';
            return corpStatus;
        case 3:
            corpStatus = '不通过';
            return corpStatus;
    };
};

//用户状态方法
export const userStatusChange = (userStatus) => {
    switch (userStatus) {
        case 1:
            userStatus = '启用';
            return userStatus;
        case 9:
            userStatus = '冻结';
            return userStatus;
    };
};

//商务审核状态
export const businessStatusChange = (businessStatus) => {
    switch (businessStatus) {
        case 2: 
            businessStatus = '待审核';
            return businessStatus;
        case 3:
            businessStatus = '通过';
            return businessStatus;
        case 4:
            businessStatus = '不通过';
            return businessStatus;
        case 6:
            businessStatus = '已上传';
            return businessStatus;
    };
};

//运营审核状态
export const operationStatusChange = (operationStatus) => {
    switch (operationStatus) {
        case 5: 
            operationStatus = '未上传';
            return operationStatus;
        case 6:
            operationStatus = '已上传';
            return operationStatus;
    };
};

//复制方法
export const copyURL = (url) => {
    if (url === '') {
        return false;
    };
    let oInput = document.createElement('input');
    oInput.value = url;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象;
    document.execCommand("Copy"); // 执行浏览器复制命令
    MessageInterface('复制成功', 'success', 5000);
    oInput.remove();
};

//图片下载功能
export const download = (imgsrc) => {
    console.log(imgsrc);
    // const a = document.createElement('a');
    // a.href = imgsrc;
    // a.download = '';
    // a.target = '_blank';
    // a.click();
    const image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = imgsrc + "?timeStamp=" + new Date().getTime(); //解决跨域问题的关键
    image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height);
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.download = imgsrc;
            a.href = url;
            document.body.appendChild(a);
            a.click();
            a.remove();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        })
    }        
};

//CP审核状态
export const CPStatusChange = (CPStatus) => {
    switch (CPStatus) {
        case 8: 
            CPStatus = '在线';
            return CPStatus;
        case 9:
            CPStatus = '下线';
            return CPStatus;
        case 10:
            CPStatus = '未上线';
            return CPStatus;
    };
};

//地址下载功能
export const urlDownload = (url) => {
    if (url === '') {
        return false;
    };
    window.location.href = url;
};

//时间格式转换--C端数据报表
export const dateC = (date) => {
    //年
    let year = new Date(date).getFullYear();
    //月
    let month = new Date(date).getMonth();
    month = month + 1;
    month = month >= 10 ? month : `0${month}`;
    //日
    let day = new Date(date).getDate();
    day = day >= 10 ? day : `0${day}`;
    return `${year}-${month}-${day}`;
};
