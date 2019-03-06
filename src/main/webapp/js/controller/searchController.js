app.controller("searchController",function ($scope,$location,searchService) {

    $scope.search=function () {
        $scope.searchMap.pageNo=parseInt($scope.searchMap.pageNo);
        $scope.searchMap.pageSize=parseInt($scope.searchMap.pageSize);
        console.log($scope.searchMap);
        searchService.searchitem($scope.searchMap).success(
            function (data) {
                // alert("测试点");
            $scope.resultMap=data;
                buildPageLabel();//调用分页方法
        });
    }

    $scope.searchMap={'keywords':'','category':'','brand':'','spec':{},'price':'','pageNo':'1','pageSize':'10','sort':'','sortField':''};//创建搜索对象
    //给搜索对象增加元素
    $scope.addSearchItem=function (key,value) {
        if(key=='category'||key=='brand'||key=='price'){
            $scope.searchMap[key]=value;
        }else{
            $scope.searchMap.spec[key]=value;
        }
        $scope.search();
    }
    //给搜索对象移除元素
    $scope.removeSearchItem=function (key) {
        if(key=='category'||key=='brand'||key=='price'){
            $scope.searchMap[key]='';
        }else{
           delete $scope.searchMap.spec[key];
        }
        $scope.search();
    }
    //创建分页
    buildPageLabel=function () {

        $scope.pageLabel=[];

        var startPage=1;
        var maxPage=$scope.resultMap.totalPage;
        var lastPage=maxPage;

        $scope.firstDot=true
        $scope.endDot=true
        // $scope.firstDot=false
        // $scope.endDot=false

         if(maxPage>5){
             if($scope.searchMap.pageNo<=3){
                 lastPage=5;
                 $scope.firstDot=false;
             }else if($scope.searchMap.pageNo>=maxPage-2){
                 startPage=maxPage-4;
                 $scope.endDot=false;
             }else{
                 startPage=$scope.searchMap.pageNo-2;
                 lastPage=$scope.searchMap.pageNo+2;

             }
         }else{
             $scope.firstDot=false
             $scope.endDot=false
         }

         for(var i=startPage;i<=lastPage;i++){
             $scope.pageLabel.push(i);

         }

    }

    $scope.queryByPage=function (pageNo) {
        if(pageNo<1||pageNo>$scope.resultMap.totalPage){
            return;
        }
        $scope.searchMap.pageNo=pageNo;
        $scope.search();
        $scope.jumpPage='';
    }
    $scope.jumpPage='';

    $scope.sortSearch=function (sortField, sort) {
        $scope.searchMap.sort=sort;
        $scope.searchMap.sortField=sortField;
        $scope.search();
    }

    $scope.keywordIsBrand=function () {
     for(var i=0;i<$scope.resultMap.brandList.length;i++){
         if($scope.searchMap.keywords.indexOf($scope.resultMap.brandList[i].text)!=-1){
             // if(searchMap.keywords.indexOf(resultMap.brandList[i].text)!=-1){
            return true;
         }
     }
     return false;
    }

    $scope.loadKeywords=function () {

        $scope.searchMap.keywords=$location.search()['keywords'];
       // alert("$scope.searchMap.keywords是："+$scope.searchMap.keywords)

        if($scope.searchMap.keywords !=nul) {
            $scope.search();
        }
    }

});