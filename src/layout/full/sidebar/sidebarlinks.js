export default [
    {
        url: '/Template',
        name: '신규 프로젝트',
        icon: "mdi mdi-plus",
        index: 1.1,
    },
    {
        url: "/ProgressProject",
        name: "진행중 프로젝트",
        icon: "mdi mdi-book-open-page-variant",
        index: 2.1,
        child: []
    },
    {
        url: "/",
        name: "완료된 프로젝트",
        icon: "mdi mdi-folder",
        index: 2.2,
        child: []
    },
    {
        url: "/profile",
        name: "프로필 설정",
        icon: "mdi mdi-settings",
        index: 2.3
    }
]