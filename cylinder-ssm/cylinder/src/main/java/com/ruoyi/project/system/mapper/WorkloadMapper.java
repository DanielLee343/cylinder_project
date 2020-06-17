package com.ruoyi.project.system.mapper;

import com.ruoyi.project.system.domain.RefillerWorkload;
import com.ruoyi.project.system.domain.Workload;

import java.util.List;

/**
 * @author daniel
 */
public interface WorkloadMapper {
    /**
     * 获取entry工作量
     *
     * @param workload 工作量
     * @return 结果
     */
    public List<Workload> selectWorkloadEntries(Workload workload);

    /**
     * 获取单个entry工作量信息
     *
     * @param userId 员工id
     * @return workload 结果
     */
    public List<Workload> selectWorkloadEntryById(Integer userId);

    /**
     * 获取deliverers工作量
     *
     * @param workload 工作量
     * @return 结果
     */
    public List<Workload> selectWorkloadDeliverers(Workload workload);

    /**
     * 获取单个运输工的工作量
     *
     * @param userId 员工id
     * @return 结果
     */
    public List<Workload> selectWorkloadDelivererById(Integer userId);

    /**
     * 新增refiller工作量
     *
     * @param refillerWorkload 对象
     * @return 结果
     */
    public int insertRefillerWorkload(RefillerWorkload refillerWorkload);

    /**
     * 查询所有充装工工作量
     *
     * @param workload 员工号
     * @return 结果List
     */
    public List<Workload> selectWorkloadRefillers(Workload workload);

    /**
     * 通过员工号查该录入工工作量
     *
     * @param userId 员工号
     * @return 结果
     */
    public List<Workload> selectWorkloadRefillerById(Integer userId);
}
