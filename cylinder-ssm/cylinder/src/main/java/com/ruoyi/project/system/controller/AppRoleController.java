package com.ruoyi.project.system.controller;

import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.project.system.service.ISysRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/getRoleId")
public class AppRoleController extends BaseController {

    @Autowired
    private ISysRoleService sysRoleService;

    @GetMapping(value = "/{userId}")
    public AjaxResult getUserRoleName(@PathVariable("userId") Integer userId) {
        return AjaxResult.success(sysRoleService.getUserRoleName(userId));
    }

}
