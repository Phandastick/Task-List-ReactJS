import { readFile } from 'fs';
import { parse } from 'csv';

const getDefaultLists = async function(){
	let list;

	const data = readFile('./public/mockdb/defaultLists.csv', 'utf8'); // Await the Promise
	const records = data.split('\n')
	return list
};

export default { getDefaultLists }