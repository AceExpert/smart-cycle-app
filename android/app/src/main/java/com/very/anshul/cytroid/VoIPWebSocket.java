package com.very.anshul.cytroid;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.LinkedList;
import java.util.NoSuchElementException;
import java.util.concurrent.TimeUnit;

import javax.net.SocketFactory;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.WebSocket;
import okhttp3.WebSocketListener;
import okio.ByteString;

public class VoIPWebSocket extends WebSocketListener {

    public String socketUrl = null;
    public WebSocket ws = null;
    public String userID = null;
    public String wsToken = "eHheQM9vCGSqjIuhZYiz3DgoZp31HMXOOMFmmBoUw7gXoFlQfnN69MH";

    OkHttpClient httpClient = null;

    LinkedList<String> sendQueue = new LinkedList<>();

    Callback callbacks = null;

    public interface Callback {
        void onOpen();
        void onDisconnect();
        void onFriendOnline(String[] userID);
        void onFriendOffline(String[] userID);
        void onFriendJoin(String userID);
        void onFriendLeave(String userID);
    }

    class WSSocketFactory extends SocketFactory {

        int wsPort;

        public WSSocketFactory(int port) {
            wsPort = port;
        }

        @Override
        public Socket createSocket() throws IOException {
            Socket socket = SocketFactory.getDefault().createSocket();
            socket.bind(new InetSocketAddress(wsPort));
            return socket;
        }

        @Override
        public Socket createSocket(String host, int port) throws IOException, UnknownHostException {
            return null;
        }

        @Override
        public Socket createSocket(String host, int port, InetAddress localHost, int localPort) throws IOException, UnknownHostException {
            return null;
        }

        @Override
        public Socket createSocket(InetAddress host, int port) throws IOException {
            return null;
        }

        @Override
        public Socket createSocket(InetAddress address, int port, InetAddress localAddress, int localPort) throws IOException {
            return null;
        }
    }

    public VoIPWebSocket(String url, int localPort, String user, Callback callback) {
        socketUrl = url;
        userID = user;
        callbacks = callback;

        httpClient = new OkHttpClient.Builder()
                .socketFactory(new WSSocketFactory(localPort))
                .connectTimeout(30000, TimeUnit.MILLISECONDS)
                .readTimeout(0, TimeUnit.MILLISECONDS).build();
    }

    public void connect() {
        Request request = new Request.Builder().url(socketUrl).build();
        httpClient.newWebSocket(request, VoIPWebSocket.this);
    }

    public void sendMessage(String msg) {
        if (!(ws != null && ws.send(msg))) {
            sendQueue.add(msg);
        }
    }

    @Override
    public void onOpen(@NonNull WebSocket webSocket, @NonNull Response response) {
        super.onOpen(webSocket, response);
        Log.i("ws", "opened");
        ws = webSocket;
        ws.send("{\"type\":0, \"auth\":\"" + wsToken + "\", \"id\":\""+userID+"\"}");
        callbacks.onOpen();
        try {
            String msg = sendQueue.pop();
            sendMessage(msg);
        } catch (NoSuchElementException ignored) {};
    }

    @Override
    public void onMessage(@NonNull WebSocket webSocket, @NonNull String text) {
        super.onMessage(webSocket, text);
        try {
            JSONObject data = new JSONObject(text);
            if(data.optInt("type") == 1) {
                if(data.optInt("cycling") == 1) {
                    callbacks.onFriendOnline(toStringArray(data.getJSONArray("friends")));
                } else if(data.optInt("cycling") == 0) {
                    callbacks.onFriendOffline(toStringArray(data.getJSONArray("friends")));
                }
            } else if (data.optInt("type") == 2) {
                if(data.optInt("status") == 1) {
                    callbacks.onFriendJoin(data.optString("id"));
                } else if(data.optInt("status") == 0) {
                    callbacks.onFriendLeave(data.optString("id"));
                }
            }
        } catch (JSONException e) {
        }
    }

    @Override
    public void onClosed(@NonNull WebSocket webSocket, int code, @NonNull String reason) {
        super.onClosed(webSocket, code, reason);
        ws = null;
        callbacks.onDisconnect();
        connect();
    }

    @Override
    public void onFailure(@NonNull WebSocket webSocket, @NonNull Throwable t, @Nullable Response response) {
        super.onFailure(webSocket, t, response);
        callbacks.onDisconnect();
        connect();
    }

    public String[] toStringArray(JSONArray jsonArray) {
        String[] array = new String[jsonArray.length()];
        for(int i = 0; i < jsonArray.length(); i++) {
            array[i] = jsonArray.optString(i);
        };
        return array;
    }
}
