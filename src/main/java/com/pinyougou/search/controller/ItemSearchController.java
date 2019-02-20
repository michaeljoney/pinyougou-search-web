package com.pinyougou.search.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.search.service.ItemSearchService;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/********
 * author:Aligan
 * date2018/10/6 15:36
 * description:Aligan
 * version:1.0
 ******/

@RestController
@RequestMapping("/itemsearch")
public class ItemSearchController {

    @Reference(timeout = 10000)
    private ItemSearchService itemSearchService;


    @RequestMapping("/search")
    public Map<String,Object> search(@RequestBody Map spevMap){
        return itemSearchService.search(spevMap);
    }

}
