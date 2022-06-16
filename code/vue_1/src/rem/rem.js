(function () {
    function remFun () {
        let baseSize = 100;
        let designWidth = 750;
        let currentWidth = window.innerWidth;
        let computedWidth = (currentWidth / designWidth) * baseSize;
        document.querySelector('html').style.fontSize = computedWidth + 'px';
    };
    //监听窗口大小变化
    window.addEventListener('resize', remFun, false);
    //监听文档加载变化
    document.addEventListener('DOMContentLoaded', remFun, false);
})();
