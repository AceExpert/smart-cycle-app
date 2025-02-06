package com.very.anshul.cytroid;

import static java.lang.Math.abs;

import android.graphics.Bitmap;
import android.util.Log;

import java.util.ArrayList;
import java.util.Arrays;

public class MapDirection extends ImageProcessor {

    public MapDirection(float[][] image) {
        super(Constants.arrow, image);
    };

    public MapDirection(Bitmap bitmap) {
        super(Constants.arrow, bitmap);
    };

    public int getFinalDirection() {
        int direction = Direction.UNKNOWN;
        float p = 1000;

        float pts = getFinalDirectionPts(false, false);
        //Log.i("direct f", String.valueOf(pts));
        if(pts < p && pts < .41) {
            p = pts;
            direction = Direction.FORWARD;
        }

        pts = getFinalDirectionPts(false, true);

        if(pts < p && pts < .41) {
            p = pts;
            direction = Direction.LEFT;
        };

        pts = getFinalDirectionPts(true, true);

        if(pts < p && pts < .41) {
            p = pts;
            direction = Direction.RIGHT;
        };

        pts = getFinalDirectionPts(true, false);

        if(pts < p && pts < .41) {
            p = pts;
            direction = Direction.BACKWARD;
        };
        Log.i("direct", String.valueOf(p));
        return direction;
    };

    public float getFinalDirectionPts(boolean rev, boolean vertical) {
        float gfp = 1000;
        int xLim = 67;
        int yLim = 45;
        float[][] snapshot = new float[xLim][yLim];
        for(int y = 0; y < image.length; y++) {
            for(int x = 0; x < image[y].length; x++) {
                float[] pts = processImage(x, y, xLim, yLim, rev, vertical);
                float pt_avg = (pts[0] + pts[1] + pts[2]) / 3;
                if(pt_avg < gfp) {
                    gfp = pt_avg;
                    /*for (int i = 0; i < yLim; i++) {
                        for (int j = 0; j < xLim; j++) {
                            snapshot[j][i] = image[y + j][x + i];
                        }
                    }*/
                }
            }
        };
        /*String img = "";
        for(int i = 0; i < yLim; i++) {
            for(int j = 0; j < xLim; j++) {
                float alpha = snapshot[j][i];
                img +=  (alpha < 1 ? "   " : alpha) + " ";
            }
            img += "\n";
        };
        Log.i("imgW", img);
        Log.i("img", String.valueOf(gfp));*/

        return gfp;
    };

    public float[] processImage(int x, int y, int limX, int limY, boolean rev, boolean vertical) {
        int[] rpt = new int[limX - 1];
        int[] gh = new int[limX - 2];
        int bl3 = 0;
        int bl1 = 0;
        int aCore = 0;
        int lCore = 0;
        float total = 0;
        int ecount = 0;
        if (((y + limY > image.length - 1 || x + limX > image[0].length - 1) && !vertical) || ((y + limX > image.length - 1 || x + limY > image[0].length - 1) && vertical))
            return new float[]{1000, 1000, 1000};

        int i = rev ? limY - 1 : 0;

        float[] sliced = new float[limX];
        for (; (rev && i >= 0) || (!rev && i < limY);) {
            if(!vertical) {
                float[] arr = image[y + i];
                System.arraycopy(arr, x, sliced, 0, limX);
            } else {
                for (int j = 0; j < limX; j++) {
                    sliced[j] = image[y + j][x + i];
                }
            }

            if(count(sliced, 1) == 0) {
                ecount++;
            }
            if(ecount > 7) {
                return new float[]{1000, 1000, 1000};
            }
            int blks = blocks(sliced, 1);
            if((i > 0 && !rev) || (i < limY - 1 && rev))
                rpt[!rev ? (i - 1) : (limY - i - 2)] = count(sliced, 1);
            if (blks == 1 && bl3 == 0) {
                total += abs(centerOffset(sliced, 1));
                bl1++;
            } else if (blks == 3 && bl1 >= 10){
                total += abs(blockCenterOffset(sliced, 1, blks));
                bl3++;
            } else if (blks > 3 || blks == 2 || (blks == 3 && bl1 < 10)) {
                return new float[]{1000, 1000, 1000};
            };
            if(blks == 1 && bl3 > 0) {
                if(lCore > 0 && (count(sliced, 1) - lCore) != 0) {
                    aCore++;
                }
                if(aCore > 5) {
                    return new float[]{1000, 1000, 1000};
                };
                lCore = count(sliced, 1);
            };
            if(rev) i--;
            else i++;
        };

        if(bl3 < 9) return new float[]{1000, 1000, 1000};

        float posSum = 0;
        int pI = 0;
        int plast = 0;

        float negSum = 0;
        int nI = 0;
        int nlast = 0;

        for (int l = 1; l < rpt.length; l++) {
            int p = rpt[l] - rpt[l - 1];

            if(p > 0) {
                //if(i - 1 != plast && plast != 0) return new float[]{1000, 1000, 1000};
                pI++;
                posSum += p;
                plast = l;
            } else {
                //if((i - 1 != nlast && nlast != 0)) return new float[]{1000, 1000, 1000};
                nI++;
                negSum += p;
                nlast = l;
            }
        };

        float iAvg = posSum / pI;
        float dAvg = negSum / nI;

        if((pI < 15) || nI < 5) return new float[]{1000, 1000, 1000};
        //if(!((iAvg > 1 && iAvg < 4) && (dAvg < -1 && dAvg > -4.2))) return new float[]{1000, 1000, 1000};
        return new float[]{total / limY, iAvg, dAvg};
    }

    public int count(float[] arr, float elem) {
        int ctn = 0;
        for (float v : arr) {
            if (v == elem) ctn++;
        };
        return ctn;
    }

    public int find(float[] arr, float elem, int start) {
        for (int i = start; i < arr.length; i++) {
            if(arr[i] == elem) return i;
        };
        return -1;
    };

    public int continued(float[] arr, float elem, int start) {
        int ind = find(arr, elem, start);
        if(ind > -1) {
            int ctd = 1;
            while(true) {
                ind += 1;
                if(ind < arr.length && arr[ind] == elem) {
                    ctd += 1;
                }
                else break;
            }
            return ctd;
        }
        else return 0;
    }

    public boolean isCentered(float[] arr, float elem) {
        return centerOffset(arr, elem) == 0.0;
    }

    public float centerOffset(float[] arr, float elem) {
        return (float) (find(arr, elem, 0) + find(arr, elem, 0) + continued(arr, elem, 0) - 1) / 2 - (float) (arr.length - 1) / 2;
    };

    public int blocks(float[] arr, float elem) {
        int ind = find(arr, elem, 0);
        int c = 0;
        while(ind > -1) {
            c += 1;
            ind = find(arr, elem, ind + continued(arr, elem, ind));
        }
        return c;
    }

    public float blockCenterOffset(float[] arr, float elem, int blocks) {
        float[] rev = reverse(arr);
        int blk = 0;
        int ind = 0;
        int revInd = 0;
        float pts = 0;
        while(blk < (blocks - 1) / 2) {
            pts += (float) abs(find(arr, elem, ind) - find(rev, elem, revInd)) / blocks;
            pts += (float) abs(continued(arr, elem, ind) - continued(rev, elem, revInd)) / blocks;
            ind = find(arr, elem, ind) + continued(arr, elem, ind);
            revInd = find(rev, elem, revInd) + continued(rev, elem, revInd);
            blk += 1;
        }
        return pts;
    }

    @Deprecated
    public int getDirectionLegacy() {
        if(find()) return Direction.FORWARD;
        if(verticalFind()) return Direction.LEFT;
        if(flipPattern().verticalFind()) return Direction.RIGHT;
        if(flipPattern().lateralFlipPattern().find()) return Direction.BACKWARD;
        return Direction.UNKNOWN;
    };

    public static class Direction {
        static int FORWARD = 0, BACKWARD = 1, RIGHT = 2, LEFT = 3, UNKNOWN = -1;
    }
}
