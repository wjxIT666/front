const menuList = [
    {
        title: '日志系统',
        key: 'log',
        children: [
            {
                title: '同步日志',
                key: 'sync',
                path: '/home/log/sync'
            },
            {
                title: '日志查询',
                key: 'query',
                path: '/home/log/query'
            },
            {
                title: '日志配置',
                key: 'config',
                path: '/home/log/config'
            }
        ]
    },
    {
        title: '权限',
        key: 'admin',
        children: [
            {
                title: '角色管理',
                key: 'role',
                path: '/home/admin/role'
            },
            {
                title: '用户管理',
                key: 'user',
                path: '/home/admin/user'
            }
        ]
    },
    {
        title: '设置',
        key: 'set',
        path: '/home/set'
    }
];

export default menuList;