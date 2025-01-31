import test from 'ava'
import echarts from './index.js'
import {option} from './demo/area.js'
import { readFileSync, unlinkSync } from 'fs'

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const testImage = readFileSync('./demo/area.png')

test('save file', async (t) => {
  const path = __dirname + '/area.png'

  echarts({
    path,
    width: 1000,
    height: 500,
    option
  })

  const file = readFileSync(path)

  t.is(file.length, testImage.length)

  unlinkSync(path)
})

test('return buffer instead of write file', async (t) => {
  const data = await echarts({
    width: 1000,
    height: 500,
    option
  })

  t.is(data.length, testImage.length)
})
