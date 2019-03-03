//搜索服务层
app.service("searchService",function($http){

    this.searchitem=function (searchMap) {
        // alert("测试点1");
        return $http.post("itemsearch/search.do",searchMap);
    };
});