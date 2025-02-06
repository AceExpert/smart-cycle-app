package com.very.anshul.cytroid;

import android.graphics.Bitmap;
import android.util.Log;

import java.util.Arrays;

public class ImageProcessor {

    PatternInfo[] pattern;
    float[][] image;

    public ImageProcessor(PatternInfo[] pat, float[][] img) {
        pattern = pat;
        image = img;
    }

    public ImageProcessor(PatternInfo[] pat, Bitmap bitmap) {
        pattern = pat;
        image = new float[bitmap.getHeight()][bitmap.getWidth()];
        for(int i = 0; i < bitmap.getHeight(); i++) {
            for(int j = 0; j < bitmap.getWidth(); j++) {
                float alpha = bitmap.getColor(j, i).alpha();
                image[i][j] =  (alpha < 1 ? 0 : alpha);
            }
        };
    }

    public boolean matchPattern(int x, int y) {
        if((y + pattern[pattern.length - 1].index > image.length - 1) || (x + pattern[0].pattern.length - 1 > image[0].length - 1)) {
            return false;
        };
        for(PatternInfo pat: pattern) {
            float[] arr = image[y + pat.index];
            float[] sliced = new float[pattern[0].pattern.length];
            System.arraycopy(arr, x, sliced, 0, pattern[0].pattern.length);
            if(Arrays.compare(sliced, pat.pattern) != 0) {
                return false;
            }
        };
        return true;
    };

    public boolean matchPatternVertical(int x, int y) {
        if(y + pattern[0].pattern.length - 1 > image.length - 1 || x + pattern[pattern.length - 1].index > image[0].length - 1)
            return false;
        for(PatternInfo pat: pattern) {
            float[] sliced = new float[pattern[0].pattern.length];

            for(int i = 0; i < pattern[0].pattern.length; i++) {
                sliced[i] = image[y + i][x + pat.index];
            };

            if(Arrays.compare(sliced, pat.pattern) != 0) return false;
        };
        return true;
    };

    public boolean find() {
        for(int y = 0; y < image.length; y++) {
            for(int x = 0; x < image[y].length; x++) {
                if(matchPattern(x, y)) return true;
            }
        }
        return false;
    };

    public boolean verticalFind() {
        for(int y = 0; y < image.length; y++) {
            for(int x = 0; x < image[y].length; x++) {
                if(matchPatternVertical(x, y)) return true;
            }
        }
        return false;
    };

    public ImageProcessor flipPattern() {
        PatternInfo[] flippedPattern = new PatternInfo[pattern.length];

        for(int i = 0; i < pattern.length; i++) {
            flippedPattern[i] = new PatternInfo(pattern[i].index, pattern[pattern.length - 1 - i].pattern.clone());
        }

        return new ImageProcessor(flippedPattern, image);
    }

    public ImageProcessor lateralFlipPattern() {
        PatternInfo[] flippedPattern = new PatternInfo[pattern.length];

        for(int i = 0; i < pattern.length; i++) {
            flippedPattern[i] = new PatternInfo(pattern[i].index, reverse(pattern[i].pattern));
        }

        return new ImageProcessor(flippedPattern, image);
    }

    public static float[] reverse(float[] array) {
        float[] reversed = new float[array.length];
        for (int i = 0; i < array.length; i++) {
            reversed[i] = array[array.length - 1 - i];
        }
        return reversed;
    };


}
