

function getCellsFromString(StrCells, nbCells) {
	//StrCells contains a Python string representing a list

	let arrCell = [];
	if (StrCells.indexOf(':') > -1) {

		let listCell = StrCells.split(':'),
			start,
			end,
			step;

		if (listCell.length == 2) {
			[start, end] = listCell;
			step = 1;
		}
		else if (listCell.length == 3) {
			[start, end, step] = listCell;
		}

		start = start !== '' ? parseInt(start) : 0;
		end = end !== '' ? parseInt(end) : nbCells.length;
		step = step !== '' ? parseInt(step) : 1;

		start = start >= 0 ? start : transformNegativeIndex(start, nbCells);
		end = end >= 0 ? end : transformNegativeIndex(end, nbCells);

		let increasingOrder = ((start < end) && (step > 0));
		let decreasingOrder = ((start > end) && (step < 0));

		let i;
		if (increasingOrder) {
			for (i = start; i < end; i += step) {
				arrCell.push(i);
			}
		}
		else if (decreasingOrder) {
			for (i = start; i > end; i += step) {
				arrCell.push(i);
			}
		}
	}
	else {
		arrCell = StrCells.split(',');
		arrCell = arrCell.map(e => {
			let v = parseInt(e);
			let idx = v >=0 ? v : transformNegativeIndex(v, nbCells);
			return idx;
		});
	}
	return arrCell;
}

function transformNegativeIndex(negIndex, nbCells){
	return nbCells.length + negIndex;
}