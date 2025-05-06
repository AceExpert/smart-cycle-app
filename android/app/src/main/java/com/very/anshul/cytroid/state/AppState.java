package com.very.anshul.cytroid.state;

import android.content.Context;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

public class AppState {
    public JSONObject data = new JSONObject();
    String filename = null;
    String filebackup = null;
    Context ctx;

    public AppState(Context context, String filen, String backupName) {
        filename = filen;
        filebackup = backupName;
        ctx = context;

        try {
            FileInputStream inputStream = ctx.openFileInput(filename);
            byte[] b = inputStream.readAllBytes();
            data = new JSONObject(new String(b, StandardCharsets.UTF_8));
            inputStream.close();
        } catch (FileNotFoundException e) {
            boolean ifPresent = false;
            for(String files : ctx.fileList()) {
                if(Objects.equals(files, filename)) ifPresent = true;
            }
            if(!ifPresent) {
                try {
                    FileOutputStream outputStream = ctx.openFileOutput(filename, Context.MODE_PRIVATE);
                    outputStream.write("{}".getBytes());
                    outputStream.close();
                } catch (FileNotFoundException ex) {

                } catch (IOException ex) {

                }
            }
        } catch (IOException e) {

        } catch (JSONException e) {

        }

        if(data.length() == 0) {
            recoverFromBackup();
        }
    }

    public void saveState() {
        try {
            FileOutputStream outputStream = ctx.openFileOutput(filebackup, Context.MODE_PRIVATE);
            FileInputStream inputStream = ctx.openFileInput(filename);

            while (true) {
                int b = inputStream.read();
                if(b == -1) break;
                outputStream.write(b);
            }
            inputStream.close();
            outputStream.close();

            outputStream = ctx.openFileOutput(filename, Context.MODE_PRIVATE);

            outputStream.write(data.toString().getBytes());

            outputStream.close();
        } catch (FileNotFoundException e) {

        } catch (IOException e) {

        }
    }

    public void recoverFromBackup() {
        try {
            FileInputStream backupInput = ctx.openFileInput(filebackup);
            FileOutputStream recoverOutput = ctx.openFileOutput(filename, Context.MODE_PRIVATE);

            try {
                byte[] b = backupInput.readAllBytes();
                data = new JSONObject(new String(b, StandardCharsets.UTF_8));
                recoverOutput.write(b);

                recoverOutput.close();
                backupInput.close();
            } catch (IOException e) {

            } catch (JSONException e) {

            }
        } catch (FileNotFoundException e) {

        }
    }
}
