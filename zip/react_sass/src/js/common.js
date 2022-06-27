/**
 * 区域转换
 */
export const regionChinese = (value) => {
    value = value.split(',');
    value = value.map(item => {
        if (item === 'region-sz') {
            item = '深圳';
        } else if (item === 'region-nc-tj') {
            item = '天津';
        } else if (item === 'region-ec-jh') {
            item = '金华';
        } else if (item === 'region-sc-zs') {
            item = '中山';
        } else if (item === 'region-cc-xy') {
            item = '襄阳';
        } else if (item === 'region-sc-gz') {
            item = '广州';
        };
        return item;
    });
    value = value.join(' ');
    return value;
};

/** 
 * 区域转换--转code
*/
export const regionCode = (item) => {
    if (item === '深圳') {
        item = 'region-sz';
    } else if (item === '天津') {
        item = 'region-nc-tj';
    } else if (item === '金华') {
        item = 'region-ec-jh';
    } else if (item === '中山') {
        item = 'region-sc-zs';
    } else if (item === '襄阳') {
        item = 'region-cc-xy';
    } else if (item === '广州') {
        item = 'region-sc-gz';
    };
    return item;
};


/**
 * 时间转换
 */
export const timeChange = (value) => {
    if (value === null) return '';
    value = new Date(value);
    //年
    let year = value.getFullYear();
    //月
    let month = value.getMonth();
    month = month + 1;
    month = month >= 10 ? month : `0${month}`;
    //日
    let date = value.getDate();
    date = date >= 10 ? date : `0${date}`;
    //时
    let hours = value.getHours();
    hours = hours >= 10 ? hours : `0${hours}`;
    //分
    let minutes = value.getMinutes();
    minutes = minutes >= 10 ? minutes : `0${minutes}`;
    //秒
    let seconds = value.getSeconds();
    seconds = seconds >= 10 ? seconds : `0${seconds}`;
    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

/**
 * 添加antd-table组件需要的key
 */
export const tableColumnKey = (item, attr, value) => {
    Object.defineProperty(item, attr, {
        writable: true,
        configurable: true,
        enumerable: true,
        value
    });
};

/** 应用状态转换 */
export const publishChange = (value) => {
    if (value === 0) {
        value = '待发布';
    } else if (value === 1) {
        value = '发布中';
    } else if (value === 2) {
        value = '已发布';
    };
    return value;
};

/** 应用大小转换 */
export const sizeChange = (value) => {
    value = value / 1024 / 1024;
    value = value.toFixed(2);
    return value;
};

/** 会话状态转换 */
export const sessionStatus = (value) => {
    if (value === 1) {
        value = '空闲';
    } else if (value === 2) {
        value = '占用';
    };
    return value;
};

/** 设备状态转换 */
export const cloudStatus = (value) => {
    value = value.toLowerCase();
    switch (value) {
        case 'running':
            value = '运行中';
            break;
        case 'booting':
            value = '启动中';
            break;
        case 'creating':
            value = '创建中';
            break;
        case 'deleting':
            value = '删除中';
            break;
        case 'error':
            value = '错误';
            break;
        case 'paused':
            value = '暂停';
            break;
        case 'poweroffing':
            value = '关机中';
            break;
        case 'releasing':
            value = '释放中';
            break;
        case 'restarting':
            value = '重启中';
            break;
        case 'shutoff':
            value = '关机';
            break;
        case 'starting':
            value = '开机中';
            break;
        case 'suspending':
            value = '暂停中';
            break;
        default:
            break;
    };
    return value;
};

/** 时分秒转换 */
export const timeStatus = (value) => {
    let t;
    if (value > -1) {
        let hour = Math.floor(value / 3600);
        let min = Math.floor(value / 60) % 60;
        let sec = value % 60;
        if (hour < 10) {
            t = '0' + hour + "时";
        } else {
            t = hour + "时";
        };

        if (min < 10) { t += "0"; }
        t += min + "分";
        if (sec < 10) { t += "0"; }
        t += sec + '秒';
    };
    return t;
}
