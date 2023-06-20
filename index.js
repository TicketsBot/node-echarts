import * as echarts from 'echarts';
import { createCanvas } from 'canvas';
import * as fs from 'fs';

/**
 * @param config = {
        width: 500 // Image width, type is number.
        height: 500 // Image height, type is number.
        option: {}, // Echarts configuration, type is Object.
        //If the path  is not set, return the Buffer of image.
        path:  '', // Path is filepath of the image which will be created.
    }
 *
 */
export default function(config) {
    const ctx = createCanvas(128, 128);
    if (config.font) {
        ctx.font = config.font;
    }

    echarts.setPlatformAPI({ createCanvas });

    config.option.animation = false;

    const chart = echarts.init(createCanvas(parseInt(config.width, 10), parseInt(config.height, 10)));
    chart.setOption(config.option);
    if (config.path) {
        try {
            fs.writeFileSync(config.path, chart.getDom().toBuffer());
            chart.dispose();
            console.log("Create Img:" + config.path)
        } catch (err) {
            console.error("Error: Write File failed" + err.message)
        }  
    } else {
        const buffer = chart.getDom().toBuffer();
        try {
            chart.dispose();
        } catch(e) {}
        
        return buffer;
    }
}