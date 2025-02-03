package pdp.message;

import java.io.Serializable;

public class SubscribeMessage extends BaseMessage implements Serializable  {
    public String var;
    public int rank;

    public SubscribeMessage(String var, int rank) {
        this.var = var;
        this.rank = rank;
    }
}
