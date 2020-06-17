package com.ruoyi.common.utils.websocket;

import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 推送消息类
 *
 * @author ruoyi
 */
public class WebSocketUtils {
    /**
     * webSocket 推送给对应用户消息
     */
    public static ResponseEntity<String> pushMessage(String uid, String message) throws IOException {
        WebSocket ws = new WebSocket();
        JSONObject jo = new JSONObject();
        jo.put("message", message);
        jo.put("To", uid);
        ws.onMessage(jo.toString());
        JSONObject re = new JSONObject();
        re.put("code", 0);
        re.put("message", "success");
        return ResponseEntity.ok(re.toString());
    }
}
