import http from './Bhttp.js';

//登录接口
const loginInterface = data => {
    return http({
        method: 'POST',
        url: '/sys/user/login',
        data
    });
};

//企业管理--分页
const BCompanyPageInterface = () => {
    return http({
        method: 'GET',
        url: '/admin/corp/page'
    });
};

//企业管理--分页(携参)
const BCompanyPagesInterface = params => {
    return http({
        method: 'GET',
        url: '/admin/corp/page',
        params
    });
};

//企业管理--查看详情(通过，不通过--仅展示)
const BCompanyCheckInterface = params => {
    return http({
        method: 'GET',
        url: '/admin/corp/detail',
        params
    });
};

//企业管理--查看详情(通过，不通过--更新)
const BCompanyUpdateInterface = data => {
    return http({
        method: 'PUT',
        url: '/admin/corp/corpStatus',
        data
    });
};

//企业管理--查看详情(通过，不通过--修改)
const BCompanyAuditInterface = data => {
    return http({
        method: 'PUT',
        url: '/admin/corp/update',
        data
    });
};

//获取用户登录状态
const BUserStatusInterface = () => {
    return http({
        method: 'GET',
        url: '/sys/user/getLoginUser'
    });
};

//用户退出
const BUserExitInterface = () => {
    return http({
        method: 'GET',
        url: '/sys/user/logout'
    });
};

//用户管理--列表
const BUserPageInterface = params => {
    return http({
        method: 'GET',
        url: '/sys/user/page',
        params
    });
}; 

//用户管理--新增
const BUserAddInterface = data => {
    return http({
        method: 'POST',
        url: '/sys/user',
        data
    });
};

//用户管理--权限下拉
const BUserAddSelInterface = () => {
    return http({
        method: 'GET',
        url: '/sys/role/option'
    });
};

//用户管理--编辑
const BUserAuditInterface = data => {
    return http({
        method: 'PUT',
        url: '/sys/user',
        data
    });
};

//角色管理--列表
const BPowerPageInterface = params => {
    return http({
        method: 'GET',
        url: '/sys/role/page',
        params
    });
};

//角色管理--权限下拉
const BPowerAddSelInterface = () => {
    return http({
        method: 'GET',
        url: '/sys/role/option'
    });
};

//角色管理--新增
const BPowerAddInterface = data => {
    return http({
        method: 'POST',
        url: '/sys/role',
        data
    });
};

//角色管理--冻结/启动
const BPowerStatusChangeInterface = data => {
    return http({
        method: 'PUT',
        url: '/sys/role/update/status',
        data
    });
};

//角色管理--配置权限
const BPowerConfigInterface = data => {
    return http({
        method: 'POST',
        url: '/sys/role/grantMenu',
        data
    });
};

//云化计划进度--分页
const BProgressPageInterface = () => {
    return http({
        method: 'GET',
        url: '/admin/gp/confirm/page'
    });
};

//云化计划进度--分页携参
const BProgressPagesInterface = params => {
    return http({
        method: 'GET',
        url: '/admin/gp/confirm/page',
        params
    });
};

//云化计划进度--审核
const BProgressAuditInterface = data => {
    return http({
        method: 'POST',
        url: '/admin/gp/confirm/approve',
        data
    });
};

//云化计划管理--分页
const BManagePageInterface = () => {
    return http({
        method: 'GET',
        url: '/admin/gp/upload/page'
    });
};

//云化计划管理--分页携参
const BManagePagesInterface = params => {
    return http({
        method: 'GET',
        url: '/admin/gp/upload/page',
        params
    });
};

//云化计划管理--审核
const BManageAuditInterface = data => {
    return http({
        method: 'POST',
        url: '/admin/gp/upload/approve',
        data
    });
};

//云化计划管理--详情
const BManageInfoInterface = params => {
    return http({
        method: 'GET',
        url: '/admin/gp/upload/detail',
        params
    });
};

//云化计划管理--修改
const BManageUpdateInterface = data => {
    return http({
        method: 'POST',
        url: '/admin/gp/upload/approve/update',
        data
    });
};

//CP云游戏--列表
const BCPPageInterface = () => {
    return http({
        method: 'GET',
        url: '/admin/gp/line/page'
    });
};

//CP云游戏--列表携参
const BCPPagesInterface = params => {
    return http({
        method: 'GET',
        url: '/admin/gp/line/page',
        params
    });
};

//CP云游戏--上/下线
const BCPupInterface = data => {
    return http({
        method: 'POST',
        url: '/admin/gp/line/approve',
        data
    });
};

export default {
    loginInterface,
    BCompanyPageInterface,
    BCompanyPagesInterface,
    BCompanyCheckInterface,
    BCompanyUpdateInterface,
    BCompanyAuditInterface,
    BUserPageInterface,
    BUserAddInterface,
    BUserStatusInterface,
    BUserExitInterface,
    BUserAddSelInterface,
    BUserAuditInterface,
    BPowerPageInterface,
    BPowerAddSelInterface,
    BPowerAddInterface,
    BPowerStatusChangeInterface,
    BPowerConfigInterface,
    BProgressPageInterface,
    BProgressPagesInterface,
    BProgressAuditInterface,
    BManagePageInterface,
    BManagePagesInterface,
    BManageAuditInterface,
    BManageInfoInterface,
    BManageUpdateInterface,
    BCPPageInterface,
    BCPPagesInterface,
    BCPupInterface
};
