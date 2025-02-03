package mobile.server.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TaskConsumer {

    private static final Logger logger = LoggerFactory.getLogger(TaskConsumer.class);

    public void connect() {
        logger.info("TaskConsumer connected");
    }

    public void disconnect() {
        logger.info("TaskConsumer disconnected");
    }

    public void onReceive(String message) {
        logger.info("TaskConsumer received message: {}", message);
    }

    public void tasksChanged(String message) {
        logger.info("Tasks changed notification: {}", message);
    }
}

