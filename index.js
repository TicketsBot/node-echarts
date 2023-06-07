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
    var ctx = createCanvas(128, 128);
    if (config.font) {
        ctx.font = config.font;
    }

    echarts.setPlatformAPI({ createCanvas });

    var chart, option = {
        title: {
            text: 'test'
        },
        tooltip: {},
        legend: {
            data: ['test']
        },
        xAxis: {
            data: ["a", "b", "c", "d", "f", "g"]
        },
        yAxis: {},
        series: [{
            name: 'test',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    let defaultConfig = {
      width: 500,
      height: 500,
      option,
      enableAutoDispose: true
    }

    config = Object.assign({}, defaultConfig, config)

    config.option.animation = false;
    chart = echarts.init(createCanvas(parseInt(config.width, 10), parseInt(config.height, 10)));
    chart.setOption(config.option);
    if (config.path) {
        try {
            fs.writeFileSync(config.path, chart.getDom().toBuffer());
            if(config.enableAutoDispose){
              chart.dispose();
            }
            console.log("Create Img:" + config.path)
        } catch (err) {
            console.error("Error: Write File failed" + err.message)
        }
        
    } else {
        var buffer = chart.getDom().toBuffer();
        try{
          if(config.enableAutoDispose){
            chart.dispose();
          }
        }catch(e){}
        return buffer;
    }
}