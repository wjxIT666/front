(function () {
    function remFun () {
        let baseSize = 100;
        let designWidth = 1280;
        let currentWidth = window.innerWidth;
        let computedSize = (currentWidth / designWidth) * baseSize;
        document.querySelector('html').style.fontSize = computedSize + 'px';
    };
    //监听窗口大小变化
    window.addEventListener('resize', remFun);
    //监听文档加载变化
    document.addEventListener('DOMContentLoaded', remFun);
})();
