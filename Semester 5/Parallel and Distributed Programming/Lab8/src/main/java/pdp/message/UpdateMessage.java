package pdp.message;

import java.io.Serializable;

public class UpdateMessage extends BaseMessage implements Serializable {
    public String var;
    public int val;

    public UpdateMessage(String var, int val) {
        this.var = var;
        this.val = val;
    }
}
