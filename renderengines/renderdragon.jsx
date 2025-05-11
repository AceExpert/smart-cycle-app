import { useEffect, useRef, useState } from "react"

import { View, ScrollView, Dimensions } from "react-native"

export default function DragonView({children, maxWidth = Dimensions.get('screen').width, gapX = 0, gapY = 0, ...props}) {

    let childRefs = useRef(null);
    let screenWidth = maxWidth;
    let mainLayout = useRef(null);

    useEffect(() => {
        dragonRender();
    }, []);

    useEffect(() => {
        dragonRender();
    }, [children]);

    let getChildRefs = () => {
        if(!childRefs.current) {
            childRefs.current = {};
        }

        return childRefs.current;
    }

    let getLayout = () => {
        if(!mainLayout.current) {
            mainLayout.current = []
        };

        return mainLayout.current;
    }

    let dragonRender = () => {
        let layout = getLayout();

        if(!layout.length) Object.keys(getChildRefs()).forEach(key => {
            let [child, props] = getChildRefs()[key];
            let lastEnd = layout.length? layout[layout.length - 1].xEnd + gapX : gapX;
            let aspectRatio = props.ddims.aspectRatio;
            let [width, height] = [props.ddims.width, aspectRatio? props.ddims.width / aspectRatio : 0]

            let x = lastEnd;
            let y = gapY;

            if(x + width > screenWidth) {
                x = gapX;
            }

            let i = layout.length - 1;
            let lastChild = null;
            let prevRowStart = false;
            while(i >= 0) {
                let kid = layout[i];
                let rowStartedNow = false;

                if(!prevRowStart && kid.xEnd > x) {
                    prevRowStart = true;
                    rowStartedNow = true;
                }

                if(prevRowStart) {
                    if(kid.xEnd <= x + width && kid.xEnd >= x || kid.xEnd >= x + width && kid.x <= x + width) {
                        if(kid.yEnd >= y) {
                            y = kid.yEnd + gapY;
                        }
                    };
                    if(kid.x <= x) break;
                    rowStartedNow = false;
                }

                lastChild = kid;
                i--;
            }

            //if(x == gapX) x = 0;
            if(y == gapY) y = 0;

            layout.push({width, height, x: x, y, xEnd: x + width, yEnd: y + height});
            child.setNativeProps({style: [
                {position: "absolute"},
                {width: width, height: height},
                {transform: [{translateX: x}, {translateY: y}]}
            ]})
        });
    }

    return (
        <View style={{width: "100%"}}>
            {children.map((child, ind) => {
                let aspectRatio = child.props.ddims.aspectRatio;
                let [width, height] = [child.props.ddims.width, aspectRatio? child.props.ddims.width / aspectRatio : 0]
                return (
                    <View ref={node => {
                        getChildRefs()[`child${ind}`] = [node, child.props];

                        return () => {
                            delete getChildRefs()[`child${ind}`];
                        }
                    }} key={ind} style={[{position: "absolute"}, 
                                         {width: width, height: height},
                                         {transform: [{translateX: getLayout()?.[ind]?.x ?? 0}, {translateY: getLayout()?.[ind]?.y ?? 0}]}
                                         ]}>
                        {child}
                    </View>
                )
            })}
        </View>
    )
}