package com.ruoyi.project.system.controller;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import com.ruoyi.common.constant.Constants;
import com.ruoyi.common.utils.security.Md5Utils;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.project.system.domain.Client;
import com.ruoyi.project.system.service.IClientService;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.framework.web.page.TableDataInfo;

import javax.annotation.Resource;

/**
 * client表Controller
 *
 * @author daniel
 * @date 2020-04-20
 */
@RestController
@RequestMapping("/client")
public class ClientController extends BaseController {
    @Resource
    private IClientService clientService;

    /**
     * 查询client表列表
     */
    //@PreAuthorize("@ss.hasPermi('system:client:list')")
    @GetMapping("/list")
    public TableDataInfo list(Client client) {
        startPage();
        List<Client> list = clientService.selectClientList(client);
        return getDataTable(list);
    }

    /**
     * 导出client表列表
     */
    //@PreAuthorize("@ss.hasPermi('system:client:export')")
    @Log(title = "client表", businessType = BusinessType.EXPORT)
    @GetMapping("/export")
    public AjaxResult export(Client client) {
        List<Client> list = clientService.selectClientList(client);
        ExcelUtil<Client> util = new ExcelUtil<Client>(Client.class);
        return util.exportExcel(list, "client");
    }

    /**
     * 获取client表详细信息
     */
    //@PreAuthorize("@ss.hasPermi('system:client:query')")
    @GetMapping(value = "/{clientId}")
    public AjaxResult getInfo(@PathVariable("clientId") Integer clientId) {
        return AjaxResult.success(clientService.selectClientById(clientId));
    }

    /**
     * client注册
     */
    //@PreAuthorize("@ss.hasPermi('system:client:add')")
    @ApiOperation("用户注册")
    @Log(title = "client表", businessType = BusinessType.INSERT)
    @PostMapping("/register")
    @ResponseBody
    public AjaxResult clientRegister(Client client) {
        return toAjax(clientService.insertClient(client));
    }

    @ApiOperation("用户登录")
    @PostMapping("/login")
    public AjaxResult clientLogin(String clientNum, String clientPwd) {
        return clientService.clientLogin(clientNum, clientPwd);
    }


    /**
     * 修改client表
     */
    //@PreAuthorize("@ss.hasPermi('system:client:edit')")
    @Log(title = "client表", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody Client client) {
        return toAjax(clientService.updateClient(client));
    }

    /**
     * 删除client表
     */
    //@PreAuthorize("@ss.hasPermi('system:client:remove')")
    @Log(title = "client表", businessType = BusinessType.DELETE)
    @DeleteMapping("/{clientIds}")
    public AjaxResult remove(@PathVariable Integer[] clientIds) {
        return toAjax(clientService.deleteClientByIds(clientIds));
    }
}
