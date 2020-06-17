package com.ruoyi.framework.interceptor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(urlPatterns = {"/"})
public class CorsFilter implements Filter {
    protected static final Logger logger = LoggerFactory.getLogger(CorsFilter.class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        String origin = req.getHeader("Origin");
        if (origin == null) origin = req.getHeader("host");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Max-Age", "10");
        res.setHeader("Access-Control-Allow-Headers", "Origin,x-requested-with,Content-Type,Accept,Authorization,credentials,X-XSRF-TOKEN,Sec-Fetch-Dest,Referer");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        if ("OPTIONS".equals(req.getMethod().toUpperCase())) {
            res.setHeader("Content-Type", "application/json;charset=UTF-8");
            res.getWriter().write("[OPTIONS]");
            return;
        }
        chain.doFilter(request, response);
    }
}