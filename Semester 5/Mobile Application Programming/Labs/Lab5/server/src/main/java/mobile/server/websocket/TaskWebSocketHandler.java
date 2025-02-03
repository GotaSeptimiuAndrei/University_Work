package mobile.server.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TaskWebSocketHandler extends TextWebSocketHandler {

    private static final Logger logger = LoggerFactory.getLogger(TaskWebSocketHandler.class);

    private final Set<WebSocketSession> clients = Collections.newSetFromMap(new ConcurrentHashMap<>());
    private final TaskConsumer taskConsumer = new TaskConsumer();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        clients.add(session);
        taskConsumer.connect();
        logger.info("WebSocket connection established: {}", session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        logger.info("Received message: {}", payload);
        taskConsumer.onReceive(payload);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) {
        clients.remove(session);
        taskConsumer.disconnect();
        logger.info("WebSocket connection closed: {}", session.getId());
    }

    public void notifyTaskChange(String message) {
        logger.info("Broadcasting task change: {}", message);
        clients.forEach(client -> {
            try {
                client.sendMessage(new TextMessage(
                        String.format("{\"type\":\"tasks_changed\",\"message\":\"%s\"}", message)
                ));
            } catch (Exception e) {
                logger.error("Error sending message to client: {}", e.getMessage());
            }
        });
    }
}

