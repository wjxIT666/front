import { Loading } from 'element-ui';

export const LoadingInterface = (flag) => {
    //判断标记
    if (flag === 'req') {
        Loading.service({
            text: '加载中...',
            background: 'rgba(0, 0, 0, 0.8)'
        });
    } else if (flag === 'res') {
        Loading.service({
            text: '加载中...',
            background: 'rgba(0, 0, 0, 0.8)'
        }).close();
    };
};
