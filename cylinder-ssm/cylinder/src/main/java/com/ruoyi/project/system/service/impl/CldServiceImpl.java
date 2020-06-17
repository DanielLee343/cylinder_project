package com.ruoyi.project.system.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.project.system.mapper.CldMapper;
import com.ruoyi.project.system.domain.Cld;
import com.ruoyi.project.system.service.ICldService;

/**
 * cylinder数据Service业务层处理
 *
 * @author ruoyi
 * @date 2020-04-05
 */
@Service
public class CldServiceImpl implements ICldService {
    @Autowired
    private CldMapper cldMapper;

    /**
     * 设置租用金额
     * @param cld 对象
     * @return cld
     */
    @Override
    public Cld setPrice(Cld cld){
        if ("5".equals(cld.getSpec())) {
            cld.setPrice(30);
        } else if ("10".equals(cld.getSpec())) {
            cld.setPrice(50);
        } else {
            cld.setPrice(80);
        }
        return cld;
    }

    /**
     * 查询cylinder数据
     *
     * @param id cylinder数据ID
     * @return cylinder数据
     */
    @Override
    public Cld selectCldById(Integer id) {
        return cldMapper.selectCldById(id);
    }

    /**
     * 查询cylinder数据列表 by admin
     *
     * @param cld cylinder数据
     * @return cylinder数据
     */
    @Override
    public List<Cld> selectCldList(Cld cld) {
        return cldMapper.selectCldList(cld);
    }

    /**
     * 查询cylinder数据列表 by entry
     *
     * @param cld cylinder数据
     * @return cylinder数据
     */
    @Override
    public List<Cld> selectCldListByEntry(Cld cld) {
        return cldMapper.selectCldListByEntry(cld);
    }

    /**
     * 新增cylinder数据
     *
     * @param cld cylinder数据
     * @return 结果
     */
    @Override
    public int insertCld(Cld cld) {
        Cld cld1 = setPrice(cld);
        return cldMapper.insertCld(cld1);
    }

    /**
     * 修改cylinder数据
     *
     * @param cld cylinder数据
     * @return 结果
     */
    @Override
    public int updateCld(Cld cld) {
        Cld cld1 = setPrice(cld);
        return cldMapper.updateCld(cld1);
    }

    /**
     * 批量删除cylinder数据
     *
     * @param ids 需要删除的cylinder数据ID
     * @return 结果
     */
    @Override
    public int deleteCldByIds(Integer[] ids) {
        return cldMapper.deleteCldByIds(ids);
    }

    /**
     * 删除cylinder数据信息
     *
     * @param id cylinder数据ID
     * @return 结果
     */
    @Override
    public int deleteCldById(Integer id) {
        return cldMapper.deleteCldById(id);
    }

    @Override
    public int updateBind(String stampId) {
        return cldMapper.updateBind(stampId);
    }

    @Override
    public int updateUnbind(String stampId) {
        return cldMapper.updateUnbind(stampId);
    }
}
