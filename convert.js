
const fs = require('fs');
const path = require('path');

try {
    // Read patternArrowCache.ts
    let patternArrowCacheContent = fs.readFileSync('f:/Web/wire-live-client/src/data/repositories/LevelRepository/patternArrowCache.ts', 'utf8');
    // Make it evaluatable
    patternArrowCacheContent = patternArrowCacheContent.replace('export const patternArrowCache: { [key: string]: any } =', 'patternArrowCache =');
    let patternArrowCache;
    eval(patternArrowCacheContent);

    // Read sources.ts
    let sourcesContent = fs.readFileSync('f:/Web/wire-live-client/src/data/repositories/LevelRepository/sources.ts', 'utf8');
    // Make it evaluatable, removing imports
    sourcesContent = sourcesContent.replace(`import { patternArrowCache } from './patternArrowCache';`, '');
    sourcesContent = sourcesContent.replace('export const sources: { [key: string]: any } =', 'sources =');
    let sources;
    eval(sourcesContent);

    // Read levels.ts
    let levelsContent = fs.readFileSync('f:/Web/wire-live-client/src/data/repositories/LevelRepository/levels.ts', 'utf8');
    // Make it evaluatable, removing imports
    levelsContent = levelsContent.replace(`import { LevelDTO } from './dto';`, '');
    levelsContent = levelsContent.replace(`import { sources } from './sources';`, '');
    levelsContent = levelsContent.replace('export const levels: Record<string, LevelDTO.Map> =', 'levels =');
    let levels;
    eval(levelsContent);


    // Now, levels, sources, and patternArrowCache are available as JS objects.
    const outputDir = 'f:/Web/wire-live-client/src/data/sources/level';

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const levelName in levels) {
        if (Object.hasOwnProperty.call(levels, levelName)) {
            const levelData = levels[levelName];
            
            // The 'map' property in the original levels object is a reference to sources.ts
            // which has the actual map data.
            // I will replace the reference with the actual data.
            levelData.map = sources[levelName];

            const jsonContent = JSON.stringify(levelData, null, 2);
            const filePath = path.join(outputDir, `${levelName}.json`);
            fs.writeFileSync(filePath, jsonContent);
        }
    }

    console.log(`Successfully converted ${Object.keys(levels).length} levels to JSON.`);

} catch (error) {
    console.error('An error occurred during conversion:', error);
}
