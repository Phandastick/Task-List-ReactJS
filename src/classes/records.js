import { readFile } from 'fs';
import { parse } from 'csv';

const getDefaultLists = async function(){
        let list;

        const data = await readFile('./public/mockdb/lists.csv', 'utf8'); // Await the Promise
        const records = data.split('\n');
        r

        return list
};

export default { getDefaultLists }