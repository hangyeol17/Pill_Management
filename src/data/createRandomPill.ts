import type {Pill} from './Pill';
import * as F from './faker';
import ocrOutput from '../OCR/output.json';

//prettier-ignore
export const createRandomPill = (): Pill => {
  return {
    // pre_id: F.randomId(),
    image: F.randomImage(),
    name: JSON.stringify(ocrOutput.images[0].fields[0].inferText.split('\n')[0].split(' ')[0]).replace(/\"/gi, ''),
    // manufacturer: F.randomName(),
    // time: new Date(),

    // medication: {
    //   morning: F.randomBoolean(),
    //   lunch: F.randomBoolean(),
    //   dinner: F.randomBoolean(),
    //   day: new Date(),
    // },
  };
};
