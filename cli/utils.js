import { open } from 'node:fs/promises';

const printStats = (stats) => {
    console.log(`Общее количество партий: ${stats.total}`);
    console.log(`Выигранных/проигранных партий: ${stats.won} / ${stats.lost}`);
    console.log(`Процентное соотношение выигранных партий: ${(stats.won/stats.total * 100).toFixed(1)}%`);
};

const readFile = async (fileName) => {
    try {
        const fd = await open(fileName, 'r'); 
        const rawData = await fd.readFile({encoding: 'utf-8'});
        return rawData.split('\n').filter((attempt) => attempt.length !== 0);
    }
    catch (error) {
        console.log(`Возникла ошибка: ${error.message}`);
        process.exit(1);
    }

}

const prosessFile = async (fileName) => {
   const attempts = await readFile(fileName);
    const stats = {
        won: 0,
        lost: 0,
        total: attempts.length
    };
    attempts.forEach((attempt) => {
        if (attempt === 'true')
            stats.won++;
        else
            stats.lost++;
    })
    printStats(stats);
}

export { prosessFile };