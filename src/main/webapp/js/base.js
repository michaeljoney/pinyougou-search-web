var app=angular.module("pinyougou",[]);


//引入$sce服务及调用trustAsHtml方法
app.filter("trustHtml",['$sce',function ($sce) {
    return function (data) {
        return $sce.trustAsHtml(data);
    }
}]);