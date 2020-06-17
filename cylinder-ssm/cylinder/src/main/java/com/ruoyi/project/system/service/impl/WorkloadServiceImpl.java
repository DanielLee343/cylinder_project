package com.ruoyi.project.system.service.impl;

import com.ruoyi.project.system.domain.RefillerWorkload;
import com.ruoyi.project.system.domain.Workload;
import com.ruoyi.project.system.mapper.WorkloadMapper;
import com.ruoyi.project.system.service.IWorkloadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkloadServiceImpl implements IWorkloadService {
    @Autowired
    private WorkloadMapper workloadMapper;

    /**
     * 获取entry工作量
     *
     * @param workload 工作量
     * @return 结果
     */
    @Override
    public List<Workload> selectWorkloadEntries(Workload workload) {
        return workloadMapper.selectWorkloadEntries(workload);
    }

    /**
     * 获取单个entry工作量信息
     *
     * @param userId 员工id
     * @return workload 结果
     */
    @Override
    public List<Workload> selectWorkloadEntryById(Integer userId) {
        return workloadMapper.selectWorkloadEntryById(userId);
    }

    /**
     * 获取deliverers工作量
     *
     * @param workload 工作量
     * @return 结果
     */
    @Override
    public List<Workload> selectWorkloadDeliverers(Workload workload) {
        return workloadMapper.selectWorkloadDeliverers(workload);
    }

    @Override
    public List<Workload> selectWorkloadDelivererById(Integer userId) {
        return workloadMapper.selectWorkloadDelivererById(userId);
    }

    /**
     * 新增refiller工作量
     *
     * @param refillerWorkload 对象
     * @return 结果
     */
    @Override
    public int insertRefillerWorkload(RefillerWorkload refillerWorkload) {
        return workloadMapper.insertRefillerWorkload(refillerWorkload);
    }

    @Override
    public List<Workload> selectWorkloadRefillers(Workload workload) {
        return workloadMapper.selectWorkloadRefillers(workload);
    }

    @Override
    public List<Workload> selectWorkloadRefillerById(Integer userId) {
        return workloadMapper.selectWorkloadRefillerById(userId);
    }
}
